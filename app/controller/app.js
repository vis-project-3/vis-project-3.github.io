function App(){

    (new Utility).zoomFix();

    var map = new Map("map");

    var route = new Route();

    route.addTo(map.getMap());

    /***** UI COMPONENTS *****/
    // var layer = new buttonsLayer("#layer", map);
    // var controls = new mapControls("#mapcontrol")
    // var toggle = new buttonsToggle("#toggle");
    // var navigation = new navigationBar("#top-bar");
    // var graphs = new boxGraphs("#graphs");
    // var box = new boxWeather("#weather");


    /***** CONTROLLERS ******/
    // var pointA = map.getPointA();
    // var pointB = map.getPointB();

    // var divvy = new controllerDivvy(map);
    var crimes = (new controllerCrimes(map)).get();
    var potholes = (new controllerPotholes(map)).get();
    var lights = (new controllerLights(map)).get();
    // var lightsAll = new controllerLightsAll(map);
    // var vehicles = new controllerVehicles(map);
    // var ctaStation = new controllerCtaStation(map);
    // var ctaBus = new controllerCtaBus(map);
    // var weather = new controllerWeather(box);

    // console.log(potholes._map());

    var controllers = [
        // ctaStation, ctaBus, divvy, crimes,
        crimes, lights, potholes,
        // vehicles
    ];

    var layerButtons = new buttonsLayer(map, controllers);

    var switchboard = new Switchboard(map, route, controllers, layerButtons);


    /**** UPDATES HANDLER *****/
    //new updatesHandler();

    /**** LISTENERS *****/
    // new buttonsListeners();

    /**** EVENTS *****/
    // amplify.subscribe("UPDATE_WAYPOINTS", route.setWaypoints);
    // amplify.subscribe("ROUTE_BOUNDS_UPDATED", map.setQueryRect);
    //
    // route.on("boundsUpdated", function(bounds) {
    //     amplify.publish("ROUTE_BOUNDS_UPDATED", bounds);
    // });
    //
    // map.on("queryRectUpdated", function(bounds) {
    //     amplify.publish("QUERY_RECT_UPDATED", bounds);
    // });

    // /**** Set up event logging *****/
    // [
    //     "UPDATE_WAYPOINTS", "ROUTE_BOUNDS_UPDATED", "QUERY_RECT_UPDATED"
    // ].forEach(function(name) {
    //     amplify.subscribe(name, (new Utility).i(name));
    // })

    /***** INITIALIZERS TEST *****/

    /*console.log("[EVENT] : SUNRISE_SUNSET");
    amplify.publish("SUNRISE_SUNSET");

    console.log("[EVENT] : WEATHER");
    amplify.publish("WEATHER");*/


    /**** INITIAL APP STATE *****/
    var uic_west = L.latLng( 41.874255, -87.676353),
    museum = L.latLng( 41.861466, -87.614935);

    amplify.publish("UPDATE_WAYPOINTS", [uic_west, museum]);

    // console.log("[EVENT] : POINT_A");
    // amplify.publish("POINT_A", pointA);
    //
    // console.log("[EVENT] : POINT_B");
    // amplify.publish("POINT_B", pointB);
    //
    // console.log("[EVENT] : DIVVY_NEW_DATA");
    // amplify.publish("DIVVY_NEW_DATA");
    //
    // console.log("[EVENT] : CRIMES_NEW_DATA");
    // amplify.publish("CRIMES_NEW_DATA");

    // console.log("[EVENT] : POTHOLES_NEW_DATA");
    // amplify.publish("POTHOLES_NEW_DATA");

    // console.log("[EVENT] : LIGHTS_NEW_DATA");
    // amplify.publish("LIGHTS_NEW_DATA");
    //
    // console.log("[EVENT] : VEHICLES_NEW_DATA");
    // amplify.publish("VEHICLES_NEW_DATA");

}

function Utility() {
    /* Helper closure for logging events */
    this.i = function (text) {
        return function(data) {
            console.info("[EVENT] : %s : %o", text, data);
        }
    }

    this.getSet = function(defaultValue) {
        var variable = defaultValue;
        return function(value) {
            return (arguments.length) ? (variable = value, this) : variable;
        }
    }

    this.zoomFix = function() {
        var lastScroll = new Date().getTime();
        L.Map.ScrollWheelZoom.prototype._onWheelScroll = function (e) {
            if (new Date().getTime() - lastScroll < 400) { return; }
            var delta = L.DomEvent.getWheelDelta(e);
            var debounce = this._map.options.wheelDebounceTime;

            this._delta += delta;
            this._lastMousePos = this._map.mouseEventToContainerPoint(e);

            if (!this._startTime) {
                this._startTime = +new Date();
            }

            var left = Math.max(debounce - (+new Date() - this._startTime), 0);

            clearTimeout(this._timer);
            lastScroll = new Date().getTime();
            this._timer = setTimeout(L.bind(this._performZoom, this), left);

            L.DomEvent.stop(e);
        }
    }
}
