function Switchboard(map, route, controllers, layerButtons) {

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
        controllers.forEach(function(controller) {
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
    })

    /***** MAP CONTROLS *****/

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
