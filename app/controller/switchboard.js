function Switchboard(map, route, controllers, layerButtons) {

    /**** Set up event logging *****/
    
    [   "UPDATE_WAYPOINTS", "ROUTE_BOUNDS_UPDATED",
        "QUERY_RECT_UPDATED"
    ].forEach(function(name) {
        amplify.subscribe(name, (new Utility).i(name));
    });

    amplify.subscribe("UPDATE_WAYPOINTS", route.setWaypoints);
    amplify.subscribe("ROUTE_BOUNDS_UPDATED", map.setQueryRect);

    route.on("boundsUpdated", function(bounds) {
        amplify.publish("ROUTE_BOUNDS_UPDATED", bounds);
    });

    map.on("queryRectUpdated", function(bounds) {
        amplify.publish("QUERY_RECT_UPDATED", bounds);
    });

    /****** LAYER BUTTONS ******/

    layerButtons.getSelection().selectAll("g.button rect")
        .on("click.foo", function(d) {
            var topic = "TOGGLE_LAYER";
            amplify.subscribe(topic, (new Utility).i(topic));
            amplify.publish(topic, d);
        });

    amplify.subscribe("TOGGLE_LAYER", function(layer) {
        console.log(layer);
        if (layer.getController) layer.getController().toggleLayer();
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