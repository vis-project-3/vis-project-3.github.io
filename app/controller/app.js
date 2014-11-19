function App(){

    var mapObject = new Map("map");
    var map = mapObject.getMap();

    var route = new Route();


    /***** UI COMPONENTS *****/
    var layer = new buttonsLayer("#layer");
    var controls = new mapControls("#mapcontrol")
    var toggle = new buttonsToggle("#toggle");
    var navigation = new navigationBar("#top-bar");
    var graphs = new boxGraphs("#graphs");
    var box = new boxWeather("#weather");


    /***** CONTROLLERS ******/
    var pointA = mapObject.getPointA();
    var pointB = mapObject.getPointB();

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


    /***** INITIALIZERS TEST *****/

    /*console.log("[EVENT] : SUNRISE_SUNSET");
    amplify.publish("SUNRISE_SUNSET");

    console.log("[EVENT] : WEATHER");
    amplify.publish("WEATHER");*/

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
