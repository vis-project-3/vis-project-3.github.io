function Switchboard(map, route, layerControllers, layerButtons, mapButtons, weather, box, graphControllers) {

    var getBounds = (new Utility()).getBounds;

    /**** Set up event logging *****/

    [
        "UPDATE_WAYPOINTS",
        "ROUTE_BOUNDS_UPDATED",
        "QUERY_RECT_BOUNDS_UPDATED",
        "TOGGLE_LAYER",
        "ROUTE_COORDS_UPDATED",
        "ROUTE_UPDATED",
        "PREFETCH_DATA_WITH_BOUNDS"
    ]
    .forEach(function(name) {
        amplify.subscribe(name, (new Utility).i(name));
    });

    /**** Route updates ****/

    amplify.subscribe("UPDATE_WAYPOINTS", route.setWaypoints);

    route.on("routeFound", function(route) {
        amplify.publish("ROUTE_UPDATED", route);
    });

    amplify.subscribe("ROUTE_COORDS_UPDATED", function(coords) {
        layerControllers.forEach(function(controller) {
            if (! controller.query() && ! controller.dataCallback()) {
                console.warn("[%s] : Controller is not ready.", controller.name());
            } else {
                controller.updateCoords(coords);
            }
        })
    });

    amplify.subscribe("ROUTE_UPDATED", function(route) {
        coords = route.coordinates;
        amplify.publish("ROUTE_COORDS_UPDATED", coords);
        bounds = getBounds(coords);
        amplify.publish("ROUTE_BOUNDS_UPDATED", bounds);
    });

    amplify.subscribe("ROUTE_BOUNDS_UPDATED", map.setQueryRect);

    map.on("queryRectUpdated", function(bounds) {
        amplify.publish("QUERY_RECT_BOUNDS_UPDATED", bounds);
    });

    amplify.subscribe("QUERY_RECT_BOUNDS_UPDATED", _updateActiveLayers);

    var _bounds;
    amplify.subscribe("QUERY_RECT_BOUNDS_UPDATED", function(bounds) {
        _bounds = bounds;
    })

    amplify.subscribe("PREFETCH_DATA_WITH_BOUNDS", _updatePrefetchLayers);

    function _updateActiveLayers(bounds) {
        layerControllers.forEach(function(controller) {
            if (! controller.query() && !controller.dataCallback()) {
                console.warn("[%s] : Query undefined.", controller.name());
            } else if (true) { //controller.layerIsActive()) {
                console.info("Layer %s is active.", controller.label());

                _updateControllerData(controller, bounds);
            }
        })
    }

    function _updatePrefetchLayers(bounds) {
        layerControllers.filter(function(c) {
            return c.preFetchData();
        }).forEach(function(d) {
            console.log("prefetch: ", d.name());
        })
    }

    function _updateControllerData(controller, bounds) {
        var coords = route.getCoords();
        controller.updateDataWithBounds(bounds, coords);
    }

    // route.on("boundsUpdated", function(bounds) {
    //     amplify.publish("ROUTE_BOUNDS_UPDATED", bounds);
    // });

    /****** LAYER BUTTONS ******/

    layerButtons.getSelection().selectAll("g.button rect")
        .on("click.toggledata", function(d) {
            amplify.publish("TOGGLE_LAYER", d);
        });

    amplify.subscribe("TOGGLE_LAYER", function(controller) {

        if (! controller.query() && !controller.dataCallback()) {
            console.warn("[%s] : Query undefined.", controller.name());
        } else {
            controller.toggleLayer();

            var bounds = map.getQueryRect();
            _updateControllerData(controller, bounds);
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
            if (! marker) return;
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

    /********** ACTIVE ETTORE **********/

    window.setInterval(function() {
        layerControllers.forEach(function(controller) {
            if (controller.activeUpdate() && controller.layerIsActive()) {
                _updateControllerData(controller, _bounds);
            }
        })
    }, 20000)

    /********* WEATHER **********/

    // amplify.subscribe("SUNRISE_SUNSET", weather.getSunriseSunset)
    // amplify.subscribe("WEATHER", weather.getWeather);

    // FIXME
    amplify.subscribe("WEATHER", function(data) {
        box.setSunriseSunset(data);
        box.updateAll(data);
    })

    // FIXME
    var fakeData = {
        temp_c: 12,
        temp_f: 45,
        iconName: "chancetstorms",
        sunrise_hour: 6,
        sunrise_minute: 15,
        sunset_hour: 19,
        sunset_minute: 15,
        condition: "Stormy"
    }

    amplify.publish("WEATHER", fakeData); // FIXME

    setInterval(function(){
        console.log("[EVENT] : WEATHER");
        console.log("[UPDATES HANDLER] : Updating Weather");
        amplify.publish("WEATHER", fakeData); // FIXME
    }, 20000);


}
