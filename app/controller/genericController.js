function genericController() {

    var dispatch = d3.dispatch("dataUpdated");

    /*** SETTERS AND GETTERS ***/

    var getSet = (new Utility()).getSet;

    var label = this.label = getSet.bind(this)();
    var id = this.id = getSet.bind(this)();
    var iconPath = this.iconPath = getSet.bind(this)();
    var map = this.map = getSet.bind(this)();
    var layer = this.layer = getSet.bind(this)();
    var query = this.query = getSet.bind(this)();
    var name = this.name = getSet.bind(this)();
    var getData = this.getData = getSet.bind(this)(undefined);
    var showInChart = this.showInChart = getSet.bind(this)(false);
    var preFetchData = this.preFetchData = showInChart;
    var latitudeAccessor = this.latitudeAccessor = getSet.bind(this)(function(d) { return d.latitude });

    /**** PUBLIC METHODS *****/
    this.layerIsActive = function() {
        return map().hasLayer( layer().getLayer() );
    }

    this.updateData = function(bounds, coords) {
        console.info("[%s] : Updating data within bounds %o", name(), bounds);
        if (getData()) {
            var data = getData()(bounds);
            _updateData(coords)(data);
            return;
        }
        // console.log(coords);
        var getQuery = query();
        var fullQuery = getQuery().queryRect(bounds);
        var queryString = fullQuery();
        d3.json(queryString, _updateData(coords));
    };

    this.updateBounds = function(bounds) {
        dispatch.on("dataUpdated.withBounds", function(update, enter, exit) {
            _processUpdate(update);
            _processEnter(enter);
            _processExitWithBounds(exit);
        })
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

    /* Should all this be moved to Layer()? - Paul */

    var fragment, dataList;
    (function initialize() {
        fragment = new DocumentFragment();
        dataList = d3.select(fragment).append("ul");
    }());

    var quadtree = d3.geom.quadtree()
        .x(function(d) { return d.longitude })
        .y(function(d) { return d.latitude });

    function _updateData(coords) {
        return function(newData) {
            console.info("[%s] : New data, length: %i", name(), newData.length);

            // filtered = _filterDataWithCoords(newData, coords);

            filtered = newData;

            // var filtered = newData;

            var key = layer().getKey();
            var keyFunction = function(d) { return d[layer().getKey()]; };

            var itemsUpdate = dataList.selectAll("li").data(filtered, keyFunction);

            var itemsEnter = itemsUpdate.enter().append("li");

            var itemsExit = itemsUpdate.exit();

            dispatch.dataUpdated(itemsUpdate, itemsEnter, itemsExit);

            console.log(itemsUpdate.size());
        }
    }

    function _processUpdate(selection) {
        console.log("update %o", selection.size());
    }

    function _processEnter(selection) {
        selection.each(function(d) {
            var latLng = [parseFloat(d.latitude), parseFloat(d.longitude)];
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
            layer().addMarker(marker);
            this._marker = marker;
        });
        console.log("enter %o", selection.size());
    }

    function _processExit(selection) {
        selection.each(function(d) {
            layer().getLayer().removeLayer(this._marker);
            d3.select(this).remove();
        });
        console.log("exit %o", selection.size());
    }

    // function _processExitWithBounds(selection, bounds) {
    //     selection.each(function(d) {
    //
    //     })
    // }

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

            var nodeBounds = L.latLngBounds(southWest, northEast).pad(0.60);

            var anyCoordInside = coords.some(function(coord, i, array) {
                var lineA = L.latLng(coord[0], coord[1]);
                // if (nodeBounds.contains(lineA)) return true;

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
        // TODO: Speed this up with a quadtree.
        filtered = filtered.filter(function(d) {
            // return true; // TODO
            return coords.some(function(coord, i, array) {
                if (! array[i + 1]) return;
                var point = L.point(parseFloat(d.latitude), parseFloat(d.longitude));
                var lineA = L.point(coord[0], coord[1]);
                var next = array[i + 1];
                var lineB = L.point(next[0], next[1]);
                var distance = distToSeg(point, lineA, lineB);
                if (distance < threshold) return true;
            });
        });

        return filtered;
    }

}
