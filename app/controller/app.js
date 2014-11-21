function App(){

    (new Utility).zoomFix();

    L.Icon.Default.imagePath = "resources/images";

    var map = new Map("map");
    
    // map.baseIconSize(10);

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

    var ctaStation = (new controllerCtaStation(map)).get();
    var ctaBus = (new controllerCtaBus(map)).get();
    var divvy = (new controllerDivvy(map)).get();
    var crimes = (new controllerCrimes(map)).get();
    var potholes = (new controllerPotholes(map)).get();
    var lights = (new controllerLights(map)).get();
    // var lightsAll = new controllerLightsAll(map);
    var vehicles = (new controllerVehicles(map)).get();
    // var weather = new controllerWeather(box);

    var controllers = [
        ctaStation, ctaBus, divvy, crimes, lights, potholes, vehicles
    ];

    var customControl = (new Utility).customControl;

    var layerButtons = new buttonsLayer(map, controllers, customControl);

    var switchboard = new Switchboard(map, route, controllers, layerButtons);


    /**** UPDATES HANDLER *****/

    //new updatesHandler();

    /**** INITIAL APP STATE *****/

    var uic_west = L.latLng( 41.874255, -87.676353),
    museum = L.latLng( 41.861466, -87.614935);

    amplify.publish("UPDATE_WAYPOINTS", [uic_west, museum]);

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

    this.customControl = L.Control.extend({
        options: { position: 'topleft' },

        initialize: function (func, options) {
            L.Util.setOptions(this, options);
            this._func = func;
        },

        onAdd: function(map) {
            var className = 'leaflet-control-layers leaflet-control-layers-expanded';
            var container = L.DomUtil.create('div', className);
            d3.select(container).call(this._func);
            return container;
        }
    });

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
