function buttonsListeners(controllers, layerButtons) {

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

    /****** LAYER BUTTONS ******/



    d3.select("#divvy-layer")
        .on("click", function () {
            console.log("[EVENT] : VIEW_LAYER_DIVVY");
            amplify.publish("VIEW_LAYER_DIVVY");
        });

    d3.select("#potholes-layer")
        .on("click", function () {
            console.log("[EVENT] : VIEW_LAYER_POTHOLES");
            amplify.publish("VIEW_LAYER_POTHOLES")
        });

    d3.select("#vehicles-layer")
        .on("click", function () {
            console.log("[EVENT] : VIEW_LAYER_VEHICLES");
            amplify.publish("VIEW_LAYER_VEHICLES");
        });

    d3.select("#lights-layer")
        .on("click", function () {
            console.log("[EVENT] : VIEW_LAYER_LIGHTS");
            amplify.publish("VIEW_LAYER_LIGHTS");
        });

    d3.select("#crimes-layer")
        .on("click", function () {
            console.log("[EVENT] : VIEW_LAYER_CRIMES");
            amplify.publish("VIEW_LAYER_CRIMES");
        });

}
