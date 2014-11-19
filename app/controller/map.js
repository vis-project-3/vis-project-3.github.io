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

    /*************** Public Methods *****************/

    this.addMarker = function(kind, lat, long){
        var marker = L.marker([lat, long], {
            icon: getIcon(kind)
        }).addTo(map);
    }

    this.getMap = function(){
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



    /*************** Private Methods ********************/

    var computeRectangle = function(){
        lowerLeft = [Math.min(pointA[0], pointB[0])-buffer, Math.min(pointA[1],pointB[1])-buffer];
        upperRight = [Math.max(pointA[0], pointB[0])+buffer,Math.max(pointA[1], pointB[1])+buffer];

        //console.log(lowerLeft);
        //console.log(upperRight);
    }

    var setRectangle= function(){
        rectangle = L.rectangle([lowerLeft,upperRight], {color: "#ff3c00", weight: 5}).addTo(map);
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
            //maxBounds : bounds,
            minZoom: 10,
            zoomControl:false,
            attributionControl : false

            //maxZoom: 18
        }).setView([41.88,-87.615],13);

        // var mapLayer =  L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpeg', {
        //                     subdomains: '1234'
        //                 }).addTo(map);


        mapView = 'http://{s}.' + map_base + '.maps.cit.api.here.com/maptile/2.1/maptile/{mapID}/normal.day/{z}/{x}/{y}/256/png8?app_id=' + map_app_id + '&app_code=' + map_app_code;
        satView = 'http://{s}.' + sat_base +'.maps.cit.api.here.com/maptile/2.1/maptile/{mapID}/satellite.day/{z}/{x}/{y}/256/png8?app_id=' + sat_app_id + '&app_code=' + sat_app_code;

        mapLayer = L.tileLayer(
            'http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}'
        ).addTo(map);

        // mapLayer = L.tileLayer(mapView, {
        //     subdomains: '1234',
        //     mapID: 'newest'
        // }).addTo(map);

        //mapView = 'http://{s}.{base}.maps.cit.api.here.com/maptile/2.1/maptile/{mapID}/normal.day/{z}/{x}/{y}/256/png8?app_id={app_id}&app_code={app_code}';
        //mapView2 = 'http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpeg';
        //satView2 = 'http://{s}.{base}.maps.cit.api.here.com/maptile/2.1/maptile/{mapID}/satellite.day/{z}/{x}/{y}/256/png8?app_id={app_id}&app_code={app_code}';
        //satView = 'http://otile{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpeg';





        computeRectangle();
        setRectangle();


        amplify.subscribe("VIEW_ZOOM_PLUS", self.zoomIn);
        amplify.subscribe("VIEW_ZOOM_MINUS", self.zoomOut);
        amplify.subscribe("VIEW_SAT_MAP", self.switchToSat);
        amplify.subscribe("VIEW_STREET_MAP", self.switchToMap);

    }();

}
