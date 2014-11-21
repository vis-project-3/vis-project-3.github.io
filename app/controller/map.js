// Class that handles all the functions related to the Map

// Useful Leaflet functions
// L.marker.update()

function Map(container){
    var self = this;
    var southWest;
    var northEast;
    var bounds;
    var map;
    var mapLayer;
    var mapView;
    var mapView2;
    var satView;
    var satView2;

    var map_app_id = 'bInsuD6J2viFbpUIsQyZ';
    var map_app_code = 'PlxtcGU1qGFBdLzv0KZ84w';
    var map_base = "base";

    var sat_app_id ="dbiVypDUKUMokmrn9C91";
    var sat_app_code = "Bz4hzFLMyMM5-5opQRUJTQ";
    var sat_base = "aerial";

    var baseLayers = {}
    var overLayers = {};
    var controls;
    var pointA;
    var pointB;
    var lowerLeft;
    var upperRight;
    var rectangle;
    var buffer = 0.005;

    /************* EVENTS ************/

    var dispatch = d3.dispatch("queryRectUpdated", "zoomEnd");
    d3.rebind(this, dispatch, "on");

    /*************** Public Methods *****************/

    var buffer_ = 0.20; // Leaflet uses percentage buffers
    this.setBuffer = function(b) {
        buffer_ = b;
        return this;
    }

    this.setQueryRect = function(latLngBounds) {
        var padded = latLngBounds.pad(0.20);

        if (! rectangle) {
            rectangle = L.rectangle(padded, { color: "#222", fill: false, weight: 2 });
            rectangle.addTo(map);
        } else {
            rectangle.setBounds(padded);
        }

        dispatch.queryRectUpdated(rectangle.getBounds());
    }

    this.getQueryRect = function() {
        return rectangle.getBounds();
    }

    this.addControl = function() {
        var map = this.getMap();
        map.addControl.apply(map, arguments);
    }

    this.addMarker = function(kind, lat, long){
        var marker = L.marker([lat, long], {
            icon: getIcon(kind)
        }).addTo(map);
    }

    var getMap = this.getMap = function(){
        /* This code doesn't make sense to me. - Paul */
        // return self;
        return map;
    }

    this.getPointA = function(){
        return pointA;
    }

    this.getPointB = function(){
        return pointB;
    }

    this.addOverLayer = function(name,toAdd){
        overLayers[name] = toAdd;
    }

    this.removeOverLayer = function(name){
        delete overLayers[name];
    }

    this.updateLayer = function(){
        //controls.removeFrom(map);
        controls = L.control.layers(baseLayers, overLayers).addTo(map);
    }

    this.updateRectangle = function(){
        computeRectangle();
        setRectangle();
    }

    this.zoomIn = function() {
        map.zoomIn();
    }

    this.zoomOut = function() {
        map.zoomOut();
    }

    this.hasLayer = function(layer){
        console.log("[MAP] : Checking if selected layer exists")
        return map.hasLayer(layer);
    }

    this.addLayer = function(layer) {
        console.log("[MAP] : Adding selected Layer");
        map.addLayer(layer);
    }

    this.removeLayer = function(layer) {
        console.log("[MAP] : Removing selected Layer")
        map.removeLayer(layer);
    }

    this.switchToMap = function(){
        console.log("[MAP] : Switching to Street View")
        mapLayer.setUrl(mapView);
        //map.redraw();
    }

    this.switchToSat = function(){
        console.log("[MAP] : Switching to Satellite View")
        mapLayer.setUrl(satView);
        //map.redraw();
    }

    this.getZoom = function() {
        map.getZoom();
    }

    var getSet = (new Utility).getSet;
    var minIconSize = this.maxIconSize = getSet.bind(this)(10);
    var maxIconSize = this.maxIconSize = getSet.bind(this)(20);
    var minZoom = function() { return getMap().getMinZoom(); };
    var maxZoom = function() { return getMap().getMaxZoom(); };

    this.dataMarkerClassName = getSet.bind(this)("data-marker");

    var _iconSizeScale = function() {
        return d3.scale.linear()
            .domain([minZoom(), maxZoom()])
            .range([minIconSize(), maxIconSize()]);
    }

    var getIconSize = this.getIconSize = function(){
        return _iconSizeScale()(map.getZoom());
    }

    /*************** Private Methods ********************/

    var rectangle;
    function setRectangle(latLngBounds) {
        if (! rectangle) {
            rectangle = L.rectangle(latLngBounds, { color: "#222", fill: false, weight: 2 });
            rectangle.addTo(map);
        } else {
            rectangle.setBounds(latLngBounds);
        }

        return rectangle;
    }

    var updateRectangle = function(){
        computeRectangle();
        rectangle.setBounds([lowerLeft,upperRight]);
    }


    var init = function(){
        var uic_west = [41.874255, -87.676353];
        var uic_location = [41.8719, -87.6492];
        var museum_location = [41.861466,-87.614935];

        pointA = uic_west;
        pointB = museum_location;

        map = L.map(container, {
            minZoom: 11,
            zoomControl:false,
            attributionControl : false
        }).setView([41.88,-87.615],13);

        map.on("zoomEnd", function(e) {
            dispatch.zoomEnd.apply(this, arguments);
        })

        // var mapLayer =  L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpeg', {
        //                     subdomains: '1234'
        //                 }).addTo(map);

        mapView = 'http://{s}.' + map_base + '.maps.cit.api.here.com/maptile/2.1/maptile/{mapID}/normal.day/{z}/{x}/{y}/256/png8?app_id=' + map_app_id + '&app_code=' + map_app_code;
        satView = 'http://{s}.' + sat_base +'.maps.cit.api.here.com/maptile/2.1/maptile/{mapID}/satellite.day/{z}/{x}/{y}/256/png8?app_id=' + sat_app_id + '&app_code=' + sat_app_code;

        // mapLayer = L.tileLayer(mapView, {
        //     subdomains: '1234',
        //     mapID: 'newest'
        // }).addTo(map);

        // ESRI WorldGrayCanvas
        mapLayer = L.tileLayer(
            'http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
            {
                mapID: 'newest',
                subdomains: '1234',
                maxZoom: 16
            }
        ).addTo(map);

        // Open map surfer greyscale
        // L.tileLayer('http://openmapsurfer.uni-hd.de/tiles/roadsg/x={x}&y={y}&z={z}', {
        //     minZoom: 0,
        //     maxZoom: 19,
        //     attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
        // });

        // mapLayer = L.tileLayer(mapView, {
        //     subdomains: '1234',
        //     mapID: 'newest'
        // }).addTo(map);

        //mapView = 'http://{s}.{base}.maps.cit.api.here.com/maptile/2.1/maptile/{mapID}/normal.day/{z}/{x}/{y}/256/png8?app_id={app_id}&app_code={app_code}';
        //mapView2 = 'http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpeg';
        //satView2 = 'http://{s}.{base}.maps.cit.api.here.com/maptile/2.1/maptile/{mapID}/satellite.day/{z}/{x}/{y}/256/png8?app_id={app_id}&app_code={app_code}';
        //satView = 'http://otile{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpeg';




        //
        // computeRectangle();
        // setRectangle();


        amplify.subscribe("VIEW_ZOOM_PLUS", self.zoomIn);
        amplify.subscribe("VIEW_ZOOM_MINUS", self.zoomOut);
        amplify.subscribe("VIEW_SAT_MAP", self.switchToSat);
        amplify.subscribe("VIEW_STREET_MAP", self.switchToMap);

    }();

}
