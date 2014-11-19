function Switchboard(controllers, layerButtons) {

    /****** LAYER BUTTONS ******/

    layerButtons.getSelection().selectAll("g.button rect")
        .on("click.foo", function(d) {
            var topic = "VIEW_LAYER_" + d.eventId;
            amplify.subscribe(topic, (new Utility).i(topic));
            amplify.publish(topic);
            console.log(topic);
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
