function genericController() {

    var dispatch = d3.dispatch(
        "dataUpdated", "coordsUpdated", "boundsUpdated",
        "newUpdateSelection", "newEnterSelection", "newUpdateEnterSelection",
        "newExitSelection", "markersUpdated"
    );

    /*** SETTERS AND GETTERS ***/

    var getSet = (new Utility()).getSet;

    var endPoint = this.endPoint = getSet.bind(this)();

    var label = this.label = getSet.bind(this)();
    var id = this.id = getSet.bind(this)();
    var iconPath = this.iconPath = getSet.bind(this)();
    var map = this.map = getSet.bind(this)();
    var layer = this.layer = getSet.bind(this)();
    var query = this.query = getSet.bind(this)();
    var name = this.name = getSet.bind(this)();
    var dataCallback = this.dataCallback = getSet.bind(this)(undefined);
    var showInChart = this.showInChart = getSet.bind(this)(false);
    var preFetchData = this.preFetchData = showInChart;
    var latitudeAccessor = this.latitudeAccessor =
        getSet.bind(this)(function(d) { return d.latitude; });
    var longitudeAccessor = this.longitudeAccessor =
        getSet.bind(this)(function(d) { return d.longitude; });
    var updateDataHook = this.updateDataHook = getSet.bind(this)(undefined);
    var removeData = this.removeData = getSet.bind(this)(true);
    var removalCondition = this.removalCondition = getSet.bind(this)();
    var activeUpdate = this.activeUpdate = getSet.bind(this)(false);
    var activeMarkers = this.activeMarkers = getSet.bind(this)([]);
    var dateAccessor = this.dateAccessor = getSet.bind(this)();
    var updateWithBounds = this.updateWithBounds = getSet.bind(this)(true);

    d3.rebind(this, dispatch, "on");

    var quadtree = d3.geom.quadtree()
        .x(function(d) { return longitudeAccessor()(d) })
        .y(function(d) { return latitudeAccessor()(d) });

    this.updateDataWithBounds = function(bounds) {
        if (updateDataHook()) {
            updateDataHook()(bounds, _updateDataWithBounds.bind(this));
        } else {
            _updateDataWithBounds(bounds);
        }
    }

    function _updateDataWithBounds(bounds) {
        console.info("[%s] : Updating data within bounds %o", name(), bounds);

        dispatch.on("newUpdateSelection", _updateMarkers);
        dispatch.on("newEnterSelection", _createMarkers);

        dispatch.boundsUpdated(bounds);

        if (dataCallback()) {
            // console.log("there is a data callback: ", dataCallback());
            dataCallback()(bounds, _updateData);
            return;
        }
        var getQuery = query();
        var fullQuery = getQuery().queryRect(bounds);
        var queryString = fullQuery();
        d3.json(queryString, _updateData);
    };

    dispatch.on("boundsUpdated.default", function(bounds) {
        // console.log("Received new bounds.");

        dispatch.on("newExitSelection", function(exit) {
            _removeDataIfInBounds(exit, bounds);
        })

    })

    var updateCoords = this.updateCoords = function(coords) {
        var data = dataList.selectAll("li");
        console.log("[%s] : Received new coords. Datalist: %o", name(), data.size());

        dispatch.on("newUpdateEnterSelection", function(updateEnter) {
            _filterSelectionWithCoords(updateEnter, coords);
            if (! updateWithBounds()) dispatch.on("newUpdateEnterSelection", null);
        })

        dispatch.on("boundsUpdated.withCoords", function(bounds) {
            _getSelectionFromBoundsAndCoords(bounds, coords);
            if (! updateWithBounds()) dispatch.on("boundsUpdated", null);
        });

    }

    // Get existing data, filter, quadtree, add markers
    function _getSelectionFromBoundsAndCoords(bounds, coords) {

        var existingData = dataList.selectAll("li");

        if (existingData.size() == 0) return;

        var filteredSelection = existingData.filter(function(d) {
            var latLng = L.latLng(latitudeAccessor()(d), longitudeAccessor()(d));
            if (bounds.contains(latLng)) return true;
        });
        var size = filteredSelection.size();

        if (size > 0)
            _filterSelectionWithCoords(filteredSelection, coords);
    }

    function _filterSelectionWithCoords(selection, coords) {
        // console.log("Have selection and coords. %i %i", selection.size(), coords.length);

        var data = selection.data();

        var filtered = _filterDataWithCoords(data, coords);

        var oldUpdateEnter = dispatch.on("newUpdateEnterSelection");

        dispatch.on("newUpdateEnterSelection", function(updateEnter) {
            // console.log("MARKER PHASE: New updateEnter selection. Length %i. Add markers.", updateEnter.size());
            _addMarkers(updateEnter);
            _setRouteDataCount(updateEnter.size());
            dispatch.on("newUpdateEnterSelection", oldUpdateEnter);
        });

        var oldExit = dispatch.on("newExitSelection");

        dispatch.on("newExitSelection", function(exit) {
            // console.log("MARKER PHASE: New exit selection. Length %i. Remove markers.", exit.size());
            _removeMarkers(exit);
            dispatch.on("newExitSelection", oldExit);
        })

        _updateData(filtered);

    }

    function _setRouteDataCount(count) {
        this.getRouteDataCount = function() {
            return count;
        }
    }

    var fragment, dataList;
    (function initialize() {
        fragment = new DocumentFragment();
        dataList = d3.select(fragment).append("ul");
    }());

    function _updateData(newData) {

            // console.info("[%s] : New data, length: %i", name(), newData.length);

            if (newData.length == 0) {
                // console.info("[%s] : Data length zero.", name());
                return;
            }

            var key = layer().getKey();
            var keyFunction = function(d) { return d[layer().getKey()]; };

            var update = dataList.selectAll("li").data(newData, keyFunction);
            dispatch.newUpdateSelection(update);
            var enter = update.enter().append("li");
            dispatch.newEnterSelection(enter);
            var updateEnter = update;
            dispatch.newUpdateEnterSelection(update);
            var exit = update.exit();
            dispatch.newExitSelection(exit);

    }

    function _updateMarkers(selection) {
        // console.log("New update selection. Length: %i. Update markers.", selection.size());
        selection.each(function(d) {
            var latLng = [parseFloat(latitudeAccessor()(d)), parseFloat(longitudeAccessor()(d))];
            this._marker.setLatLng(latLng);
        })
    }

    var dateDiff = (new Utility).dateDiffInDays;

    function _createMarkers(selection) {
        // console.log("DATA PHASE: New enter selection. Length: %i. Create markers.", selection.size());
        selection.each(function(d) {
            var latLng = [parseFloat(latitudeAccessor()(d)), parseFloat(longitudeAccessor()(d))];
            // console.log("layer().getIcon() %o", layer().getIcon());
            var size = map().getIconSize();
            var icon = L.icon({
                iconUrl: iconPath(),
                iconSize: [size, size],
                className: map().dataMarkerClassName()
            });
            // console.log(iconPath());
            var marker = L.marker(latLng, { icon: icon });
            var opacity = 0.8;
            if (dateAccessor()) {
                var today = d3.time.day(new Date());
                var created = d3.time.day(dateAccessor()(d));
                var difference = Math.abs(dateDiff(created, today));
                if (difference > 14) opacity = 0.3;
            }
            marker.setOpacity(opacity);
            var content = layer().getPopup().generatePopupContent(d);
            // console.log("[" + name() + "_LAYER] : Generating Popup");
            marker.bindPopup(content);
            this._marker = marker;

            var r = 20;

            var iconHtml = d3.select(new DocumentFragment())
            .append("div")
            .call(function(div) {
                div.append("svg").attr({ width: r, height: r})
                .append("circle").attr({ r: r / 2, cy: r / 2, cx: r / 2 })
                .style({ fill: "red", "fill-opacity": 0.4 })
            })
            .node().innerHTML;

            var newDataIcon = L.divIcon({
                className: 'route-waypoint-icon',
                html: iconHtml,
                iconAnchor: L.point(r/2, r/2),
                size: r
            });

            var newMarker = L.marker(latLng, { icon: newDataIcon });

            this._newMarker = newMarker;
        });
    }

    function _addMarkers(selection) {
        selection.each(function(d) {
            var newDataMarker = this._newMarker;
            if (newDataMarker) {
                layer().addMarker(newDataMarker);
                window.setTimeout(
                    function() { layer().getLayer().removeLayer(newDataMarker); },
                    1000
                )
                this._newMarker = undefined;
            }
            layer().addMarker(this._marker);
            this._active = true;
        })
        dispatch.markersUpdated();
    }

    function _removeMarkers(selection) {
        selection.each(function(d) {
            layer().getLayer().removeLayer(this._marker);
            this._active = false;
        })
        dispatch.markersUpdated();
    }

    function _removeDataIfInBounds(selection, bounds) {
        selection.each(function(d) {
            var latLng = L.latLng(latitudeAccessor()(d), longitudeAccessor()(d));
            if (bounds.contains(latLng)) {
                if (removalCondition()) {
                    if (removalCondition()(d)) {
                        console.info("[ %s ] : Removing data: %o", name(), d);
                        d3.select(this).remove();
                    }
                } else {
                    console.info("[ %s ] : Removing data: %o", name(), d);
                    d3.select(this).remove();
                }
            }
        })
    }

    function _filterDataWithCoords(data, coords) {
        if (window.filterBy === "area") return data;

        var distToSeg = (new Utility()).distanceToSegment;

        var fix = [];

        for (var i = 0; i < data.length; i++) {
            if (data[i] !== undefined && data[i] != null) {
                fix.push(data[i]);
            }
        }

        var root = quadtree(fix);

        var filtered = [];

        root.visit(function(node, x1, y1, x2, y2) {
            if (node.leaf) {
                filtered.push(node.point);
                return;
            }

            var southWest = L.latLng(y1, x1),
            southEast = L.latLng(y1, x2),
            northWest = L.latLng(y2, x1),
            northEast = L.latLng(y2, x2);

            var nodeBounds = L.latLngBounds(southWest, northEast).pad(0.7);

            var anyCoordInside = coords.some(function(coord, i, array) {
                var lineA = L.latLng(coord[0], coord[1]);

                var next = array[i + 1];
                if (! next) return false;

                var lineB = L.latLng(next[0], next[1]);
                var coordBounds = L.latLngBounds(lineA, lineB);
                if (nodeBounds.intersects(coordBounds)) return true;
            });
            if (anyCoordInside) {
                if (node.point) filtered.push(node.point);
            } else {
                return true;
            }
        })

        var threshold = 0.005;
        filtered = filtered.filter(function(d) {
            // return true; // TODO
            return coords.some(function(coord, i, array) {
                if (! array[i + 1]) return false;
                var point = L.point(parseFloat(latitudeAccessor()(d)), parseFloat(longitudeAccessor()(d)));
                var lineA = L.point(coord[0], coord[1]);
                var next = array[i + 1];
                var lineB = L.point(next[0], next[1]);
                var distance = distToSeg(point, lineA, lineB);
                if (distance < threshold) return true;
            });
        });

        return filtered;
    }

    /**** PUBLIC METHODS *****/
    this.layerIsActive = function() {
        return map().hasLayer( layer().getLayer() );
    }

    //Toggle Layer
    this.toggleLayer = function(){
        console.log("[%s] : Toggling Layer", name());
        var temp = layer().getLayer();
        if( map().hasLayer(temp) == true ){
            map().removeLayer(temp);
        }
        else map().addLayer(temp);
    };

    this.getActiveMarkersCount = function() {
        var filtered = d3.select(fragment).selectAll("li").filter(function(d) {
            return this._active;
        })
        return filtered.size();
    }

    this.getFragment = function() { return fragment; }

    this.getMarkers = function() {
        var markers = [];
        d3.select(fragment).selectAll("li").each(function(d) {
            markers.push(this._marker);
        });
        return markers;
    }

}
