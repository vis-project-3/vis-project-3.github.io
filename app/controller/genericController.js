function genericController() {

    var dispatch = d3.dispatch(
        "dataUpdated", "coordsUpdated", "boundsUpdated",
        "newUpdateSelection", "newEnterSelection", "newUpdateEnterSelection",
        "newExitSelection"
    );

    /*** SETTERS AND GETTERS ***/

    var getSet = (new Utility()).getSet;

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

    var quadtree = d3.geom.quadtree()
        .x(function(d) { return longitudeAccessor()(d) })
        .y(function(d) { return latitudeAccessor()(d) })

    this.updateDataWithBounds = function(bounds) {
        console.info("[%s] : Updating data within bounds %o", name(), bounds);

        dispatch.on("newUpdateSelection", _updateMarkers);
        dispatch.on("newEnterSelection", _createMarkers);

        dispatch.boundsUpdated(bounds);

        if (dataCallback()) {
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
            console.log("DATA PHASE: New exit selection. Length: %i. Remove data if in bounds.", exit.size());
            _removeDataIfInBounds(exit, bounds);
        })

    })

    var updateCoords = this.updateCoords = function(coords) {
        var data = dataList.selectAll("li");
        console.log("[%s] : Received new coords. Datalist: %o", name(), data.size());

        dispatch.on("newUpdateEnterSelection", function(updateEnter) {
            console.log("DATA PHASE: New updateEnter selection. Length: %i. Send to quadtree.", updateEnter.size());
            _filterSelectionWithCoords(updateEnter, coords);
        })

        dispatch.on("boundsUpdated.withCoords", function(bounds) {
            _getSelectionFromBoundsAndCoords(bounds, coords);  // FIXME: This sets everything to marker phase
        });

    }

    // Get existing data, filter, quadtree, add markers
    function _getSelectionFromBoundsAndCoords(bounds, coords) {
        // console.log("Have bounds and coords. %o %i", bounds, coords.length);
        var existingData = dataList.selectAll("li");
        // console.log("Existing data length: %i", existingData.size());
        var filteredSelection = existingData.filter(function(d) {
            var latLng = L.latLng(latitudeAccessor()(d), longitudeAccessor()(d));
            if (bounds.contains(latLng)) return true;
        });
        var size = filteredSelection.size();
        // console.log("Filtered selection length: %i", filteredSelection.size());
        if (size > 0)
            _filterSelectionWithCoords(filteredSelection, coords);
    }

    function _filterSelectionWithCoords(selection, coords) {
        // console.log("Have selection and coords. %i %i", selection.size(), coords.length);

        var data = selection.data();

        var filtered = _filterDataWithCoords(data, coords);

        // console.log("filtered length %i", filtered.length);

        // console.log("Sending filtered data back to update.");

        var oldUpdateEnter = dispatch.on("newUpdateEnterSelection");

        dispatch.on("newUpdateEnterSelection", function(updateEnter) {
            // console.log("MARKER PHASE: New updateEnter selection. Length %i. Add markers.", updateEnter.size());
            _addMarkers(updateEnter);
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

    var fragment, dataList;
    (function initialize() {
        fragment = new DocumentFragment();
        dataList = d3.select(fragment).append("ul");
    }());

    function _updateData(newData) {

            console.info("[%s] : New data, length: %i", name(), newData.length);

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
        console.log("New update selection. Length: %i. Update markers.", selection.size());
    }

    function _createMarkers(selection) {
        console.log("DATA PHASE: New enter selection. Length: %i. Create markers.", selection.size());
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
            var content = layer().getPopup().generatePopupContent(d);
            console.log("[" + name() + "_LAYER] : Generating Popup");
            marker.bindPopup(content);
            this._marker = marker;
        });
    }

    function _addMarkers(selection) {
        selection.each(function(d) {
            layer().addMarker(this._marker);
        })
    }

    function _removeMarkers(selection) {
        selection.each(function(d) {
            layer().getLayer().removeLayer(this._marker);
        })
    }

    function _removeDataIfInBounds(selection, bounds) {
        selection.each(function(d) {
            var latLng = L.latLng(latitudeAccessor()(d), longitudeAccessor()(d));
            if (bounds.contains(latLng)) d3.select(this).remove();
        })
    }

    function _processExit(selection) {
        selection.each(function(d) {
            layer().getLayer().removeLayer(this._marker);
            d3.select(this).remove();
        });
        console.log("exit %o", selection.size());
    }

    function _filterDataWithCoords(data, coords) {
        var distToSeg = (new Utility()).distanceToSegment;

        var root = quadtree(data);

        var filtered = [];

        root.visit(function(node, x1, y1, x2, y2) {
            if (node.leaf) {
                filtered.push(node.point);
                return;
            }

            // var width = Math.abs(x2 - x1), height = Math.abs(y2 - y1);
            // if (width < threshold || height < threshold) return;

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
                if (! array[i + 1]) return;
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

    this.getMarkers = function() {
        var markers = [];
        d3.select(fragment).selectAll("li").each(function(d) {
            markers.push(this._marker);
        });
        return markers;
    }

}
