function Switchboard(map, route, layerControllers, layerButtons) {

    /**** Set up event logging *****/

    [
        "UPDATE_WAYPOINTS",
        "ROUTE_BOUNDS_UPDATED",
        "QUERY_RECT_UPDATED",
        "TOGGLE_LAYER"
    ]
    .forEach(function(name) {
        amplify.subscribe(name, (new Utility).i(name));
    });

    /**** Route updates ****/

    amplify.subscribe("UPDATE_WAYPOINTS", route.setWaypoints);

    amplify.subscribe("ROUTE_BOUNDS_UPDATED", map.setQueryRect);

    amplify.subscribe("QUERY_RECT_UPDATED", function(bounds) {
        layerControllers.forEach(function(controller) {
            if (! controller.query()) {
                console.warn("[%s] : Query undefined.", controller.name());
            } else if (controller.layerIsActive()) {
                console.info("Layer %s is active.", controller.label());
                controller.updateData(bounds);
            }
        })
    })

    route.on("boundsUpdated", function(bounds) {
        amplify.publish("ROUTE_BOUNDS_UPDATED", bounds);
    });

    map.on("queryRectUpdated", function(bounds) {
        amplify.publish("QUERY_RECT_UPDATED", bounds);
    });

    /****** LAYER BUTTONS ******/

    layerButtons.getSelection().selectAll("g.button rect")
        .on("click.toggledata", function(d) {
            var topic = "TOGGLE_LAYER";
            amplify.publish(topic, d);
        });

    amplify.subscribe("TOGGLE_LAYER", function(controller) {
        var bounds = map.getQueryRect();
        if (! controller.query()) {
            console.warn("[%s] : Query undefined.", controller.name());
        } else {
            controller.toggleLayer();
            controller.updateData(bounds);
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
        console.log(map.getMap().getZoom())
       amplify.publish("MAP_ZOOM_END");
    })

    d3.select("#icon-minus")
    .on("click", function () {
        console.log("[EVENT] : VIEW_ZOOM_MINUS");
        amplify.publish("VIEW_ZOOM_MINUS");
    });

    d3.select("#icon-plus")
    .on("click", function () {
        console.log("[EVENT] : VIEW_ZOOM_PLUS");
        amplify.publish("VIEW_ZOOM_PLUS");
    });

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
