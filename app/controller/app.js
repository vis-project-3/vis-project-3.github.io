function App(){

    var map = new Map("map");
    // var map = mapObject.getMap();

    var route = new Route();

    route.addTo(map.getMap());

    /***** UI COMPONENTS *****/
    var layer = new buttonsLayer("#layer");
    var controls = new mapControls("#mapcontrol")
    var toggle = new buttonsToggle("#toggle");
    var navigation = new navigationBar("#top-bar");
    var graphs = new boxGraphs("#graphs");
    var box = new boxWeather("#weather");


    /***** CONTROLLERS ******/
    var pointA = map.getPointA();
    var pointB = map.getPointB();

    var divvy = new controllerDivvy(map);
    var crimes = new controllerCrimes(map);
    var potholes = new controllerPotholes(map);
    var lights = new controllerLights(map);
    var lightsAll = new controllerLightsAll(map);
    var vehicles = new controllerVehicles(map);
    var weather = new controllerWeather(box);


    /**** UPDATES HANDLER *****/
    //new updatesHandler();

    /**** LISTENERS *****/
    new buttonsListeners();

    /**** EVENTS *****/
    amplify.subscribe("UPDATE_WAYPOINTS", route.setWaypoints);

    amplify.subscribe("BOUNDS_UPDATED", map.setQueryRect);

    route.on("boundsUpdated", function(bounds) {
        amplify.publish("BOUNDS_UPDATED", bounds);
    });



    /**** INITIAL APP STATE *****/


    var names = [
        "UPDATE_WAYPOINTS", "BOUNDS_UPDATED"
    ]

    names.forEach(function(name) {
        amplify.subscribe(name, i(name));
    })



    /* Helper closure for logging events */
    function i(text) {
        return function(data) {
            console.info("[EVENT] : %s : %o", text, data);
        }
    }

    /***** INITIALIZERS TEST *****/

    /*console.log("[EVENT] : SUNRISE_SUNSET");
    amplify.publish("SUNRISE_SUNSET");

    console.log("[EVENT] : WEATHER");
    amplify.publish("WEATHER");*/

    var uic_west = L.latLng( 41.874255, -87.676353),
        museum = L.latLng( 41.861466, -87.614935);

    amplify.publish("UPDATE_WAYPOINTS", [uic_west, museum]);

    console.log("[EVENT] : POINT_A");
    amplify.publish("POINT_A", pointA);

    console.log("[EVENT] : POINT_B");
    amplify.publish("POINT_B", pointB);

    console.log("[EVENT] : DIVVY_NEW_DATA");
    amplify.publish("DIVVY_NEW_DATA");

    console.log("[EVENT] : CRIMES_NEW_DATA");
    amplify.publish("CRIMES_NEW_DATA");

    console.log("[EVENT] : POTHOLES_NEW_DATA");
    amplify.publish("POTHOLES_NEW_DATA");

    console.log("[EVENT] : LIGHTS_NEW_DATA");
    amplify.publish("LIGHTS_NEW_DATA");

    console.log("[EVENT] : VEHICLES_NEW_DATA");
    amplify.publish("VEHICLES_NEW_DATA");

}
