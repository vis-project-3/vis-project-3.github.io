function App(){

    (new Utility).zoomFix();

    L.Icon.Default.imagePath = "resources/images";

    var map = new Map("map");

    // map.baseIconSize(10);

    var route = new Route();

    route.addTo(map.getMap());

    /***** UI COMPONENTS *****/

    // var layer = new buttonsLayer("#layer");
    // var controls = new mapControls("#mapcontrol")
    // var toggle = new buttonsToggle("#toggle");
    // var navigation = new navigationBar("#top-bar");
    // var graphs = new boxGraphs("#graphs");
    // var graphs = new drawCharts("#graphs", graphControllers, customControl);
    // var box = new boxWeather("#weather");


    /***** CONTROLLERS ******/

    var ctaStationObj = new controllerCtaStation(map);

    var ctaStation = ctaStationObj.get();
    var ctaBus = (new controllerCtaBus(map)).get();
    var divvy = (new controllerDivvy(map)).get();
    var crimes = (new controllerCrimes(map)).get();
    var potholes = (new controllerPotholes(map)).get();
    var lights = (new controllerLights(map)).get();
    // var lightsAll = new controllerLightsAll(map);
    var vehicles = (new controllerVehicles(map)).get();


    var food = (new controllerFoodInspection(map)).get();
    var foursquare = (new controllerFourSquare(map)).get();
    var songkick = (new controllerSongKick(map)).get();
    var uber = (new controllerUber(map)).get();

    ctaBus.getRoutesData(ctaStationObj.getData);
    ctaBus.getActiveRoutes(ctaStationObj.getActiveRoutes);

    var layerControllers = [
         ctaStation, ctaBus, divvy, crimes, lights, potholes, vehicles,food, foursquare, songkick, uber
    ];

    var graphControllers = [
        crimes, lights, potholes, vehicles
    ]

    window.controllers = layerControllers;

    /***** UI COMPONENTS *******/

    var customControl = (new Utility).customControl;
    var layerButtons = new buttonsLayer(map, layerControllers, customControl);
    var graphs = new drawCharts("#graphs", map, graphControllers, customControl);
    var mapButtons = new mapControls("#mapcontrol", map, customControl);
    var box = new boxWeather("#weather", map, customControl);

    var weather = new controllerWeather(box);

    map.addControl(L.control.zoom({ position: 'bottomleft' }));

    /****** EVENT HANDLING *******/

    var switchboard = new Switchboard(
        map, route, layerControllers, layerButtons, mapButtons, weather, box,
        graphControllers
    );


    /**** INITIAL APP STATE *****/

    (function() {
        var uic_west = L.latLng( 41.874255, -87.676353),
        museum = L.latLng( 41.861466, -87.614935);

        amplify.publish("PREFETCH_DATA_WITH_BOUNDS", L.latLngBounds(uic_west, museum));
        amplify.publish("UPDATE_WAYPOINTS", [uic_west, museum]);
    }())


    // console.log((new Utility()).distanceToSegment(L.point(205,80), L.point(200,300), L.point(100,50)));

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

    this.distanceToSegmentSquared = function(point, lineA, lineB) {
        console.log("distance %o %o %o", point, lineA, lineB);
    };

    function square(a) { return Math.pow(a,2); };

    function sum(a, b) { return (a.x + a.x)}

    function _(thing) {
        var _ = {};
        _.then = function(func) { return func(thing); }
        return _;
    };

    function distanceSquared(a, b) {
        return _(a.x - b.x).then(square) + _(a.y - b.y).then(square);
    }

    function dotProduct(a, b) {
        return a.x * b.x + a.y * b.y;
    }

    // Based on: http://stackoverflow.com/a/1501725/502331
    this.distanceToSegment = function(point, lineA, lineB) {
        var squaredLineDist = _(lineA.distanceTo(lineB)).then(square);

        // If the line is actually a point.
        if (squaredLineDist == 0) return square(point.distanceTo(lineA));

        var _point = point.subtract(lineA);
        var _lineB = lineB.subtract(lineA);

        var dot = dotProduct(_point, _lineB);

        var t = dot / squaredLineDist;

        if (t < 0) return point.distanceTo(lineA);
        if (t > 1) return point.distanceTo(lineB);

        var pointAlongLine = _lineB.multiplyBy(t);

        return _point.distanceTo(pointAlongLine);

    }

    this.getBounds = function(array) {
        return L.polyline(array).getBounds();
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

    // From: http://stackoverflow.com/a/15289883/502331

    var _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // a and b are javascript Date objects
    this.dateDiffInDays = function(a, b) {
        // Discard the time and time-zone information.
        var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

        return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    }
}
