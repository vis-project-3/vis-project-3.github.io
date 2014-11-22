function Switchboard(map, route, layerControllers, layerButtons, mapButtons) {

    /**** Set up event logging *****/

    [
        "UPDATE_WAYPOINTS",
        "ROUTE_BOUNDS_UPDATED",
        "QUERY_RECT_UPDATED",
        "TOGGLE_LAYER",
        "ROUTE_COORDS_UPDATED"
    ]
    .forEach(function(name) {
        amplify.subscribe(name, (new Utility).i(name));
    });

    /**** Route updates ****/

    amplify.subscribe("UPDATE_WAYPOINTS", route.setWaypoints);

    amplify.subscribe("ROUTE_BOUNDS_UPDATED", map.setQueryRect);

    amplify.subscribe("QUERY_RECT_UPDATED", function(bounds, coords) {
        layerControllers.forEach(function(controller) {
            if (! controller.query()) {
                console.warn("[%s] : Query undefined.", controller.name());
            } else if (controller.layerIsActive()) {
                console.info("Layer %s is active.", controller.label());
                var coords = route.getCoords();
                controller.updateData(bounds, coords);
            }
        })
    });

    route.on("boundsUpdated", function(bounds, coords) {
            amplify.publish("ROUTE_BOUNDS_UPDATED", bounds, coords);
        });


    map.on("queryRectUpdated", function(bounds) {
        amplify.publish("QUERY_RECT_UPDATED", bounds);
    });

    /****** LAYER BUTTONS ******/

    layerButtons.getSelection().selectAll("g.button rect")
        .on("click.toggledata", function(d) {
            amplify.publish("TOGGLE_LAYER", d);
        });

    amplify.subscribe("TOGGLE_LAYER", function(controller) {
        var bounds = map.getQueryRect();
        if (! controller.query()) {
            console.warn("[%s] : Query undefined.", controller.name());
        } else {
            controller.toggleLayer();
            var coords = route.getCoords();
            controller.updateData(bounds, coords);
        }
    });

    /*console.log("[EVENT] : SUNRISE_SUNSET");
    amplify.publish("SUNRISE_SUNSET");

    console.log("[EVENT] : WEATHER");
    amplify.publish("WEATHER");*/

    function getActiveMarkers() {
        var markers = [];
        layerControllers
        .filter(function(controller) {
            return controller.layer() && controller.layerIsActive();
        })
        .forEach(function(controller) {
            markers = markers.concat(controller.getMarkers());
        });
        return markers;
    }

    function updateMarkerSize() {
        var markers = getActiveMarkers();

        markers.forEach(function(marker) {
            var icon = marker.options.icon;
            var _s = map.getIconSize();
            var _newSize = L.point(_s, _s);
            icon.options.iconSize = _newSize;
            marker.setIcon(icon);
        })
    }

    /***** MAP CONTROLS *****/

    amplify.subscribe("MAP_ZOOM_END", updateMarkerSize);

    map.getMap().on("zoomend", function() {
       amplify.publish("MAP_ZOOM_END");
   });

    amplify.subscribe("SWITCH_MAP_LAYER", function(d) {
       map.switchToLayer(d);
    })

    mapButtons.getSelection().selectAll("image")
        .on("click.switch", function(d) {
            amplify.publish("SWITCH_MAP_LAYER", d);
        })

    d3.select("#satellite")
    .on("click", function () {
        console.log("[EVENT] : VIEW_SAT_MAP");
        amplify.publish("VIEW_SAT_MAP");
    });

    d3.select("#street")
    .on("click", function () {
        console.log("[EVENT] : VIEW_STREET_MAP");
        amplify.publish("VIEW_STREET_MAP");
    });


}
