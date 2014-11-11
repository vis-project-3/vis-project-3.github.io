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

    var sat_app_id =""
    var sat_app_code = ""

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
        return self;
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
        console.log("[LOG] : Checking if selected layer exists")
        return map.hasLayer(layer);
    }

    this.addLayer = function(layer) {
        console.log("[LOG] : Adding selected Layer");
        map.addLayer(layer);
    }

    this.removeLayer = function(layer) {
        console.log("[LOG] : Removing selected Layer")
        map.removeLayer(layer);
    }

    this.switchToMap = function(){
        console.log("[LOG] : Switching to Street View")
        mapLayer.setUrl(mapView);
        //map.redraw();
    }

    this.switchToSat = function(){
        console.log("[LOG] : Switching to Satellite View")
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

        mapLayer = L.tileLayer('http://{s}.{base}.maps.cit.api.here.com/maptile/2.1/maptile/{mapID}/normal.day/{z}/{x}/{y}/256/png8?app_id={app_id}&app_code={app_code}', {
            //attribution: 'Map &copy; 1987-2014 <a href="http://developer.here.com">HERE</a>',
            subdomains: '1234',
            mapID: 'newest',
            app_id: 'bInsuD6J2viFbpUIsQyZ',
            app_code: 'PlxtcGU1qGFBdLzv0KZ84w',
            base: 'base'
            //minZoom: 0,
            //maxZoom: 20
        }).addTo(map);

        mapView = 'http://{s}.{base}.maps.cit.api.here.com/maptile/2.1/maptile/{mapID}/normal.day/{z}/{x}/{y}/256/png8?app_id={app_id}&app_code={app_code}';
        mapView2 = 'http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpeg';
        satView2 = 'http://{s}.{base}.maps.cit.api.here.com/maptile/2.1/maptile/{mapID}/satellite.day/{z}/{x}/{y}/256/png8?app_id={app_id}&app_code={app_code}';
        satView = 'http://otile{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpeg';

        computeRectangle();
        setRectangle();

        /*L.Routing.control({
            waypoints: [
                L.latLng(pointA),
                L.latLng(pointB)
            ]
        }).addTo(map);*/

    }();

}

