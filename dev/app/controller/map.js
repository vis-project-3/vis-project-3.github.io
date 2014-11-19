// Class that handles all the functions related to the Map

// Useful Leaflet functions
// L.marker.update()

function Map(container){

    var southWest;
    var northEast;
    var bounds;
    var map;
    var mapLayer;
    var mapView;
    var mapView2;
    var satView;
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
        return map;
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

    this.addLayer = function(layer) {
        map.addLayer(layer);
    }

    this.removeLayer = function(layer) {
        map.removeLayer(layer);
    }

    this.switchToMap = function(){
        mapLayer.setUrl(mapView);
        //map.redraw();
    }

    this.switchToSat = function(){
        mapLayer.setUrl(satView);
        //map.redraw();
    }

    this.getMap = function() {
        return map;
    }

    this.setRectangle = function(latLngBounds) {

        if (! rectangle) {
            rectangle = L.rectangle(latLngBounds, { color: "#222", fill: false, weight: 2 });
            rectangle.addTo(map);
        } else {
            rectangle.setBounds(latLngBounds);
        }

        return rectangle;
    }

    this.getQueryRectangle = function() { return rectangle; }


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

        // L.mapbox.accessToken = 'pk.eyJ1IjoicGxtcnJ5IiwiYSI6Ik55OXlMbjgifQ.SNPfhMPm17RUeQhWmtBgBA';
        //
        // map = L.mapbox.map(container, 'plmrry.k8fci27i', {
        //     minZoom: 10,
        //     zoomControl: true,
        //     attributionControl : false
        // }).setView([41.88,-87.615], 13);

        map = L.map(container, {
            minZoom: 10,
            zoomControl:false,
            attributionControl : false
        }).setView([41.88,-87.615], 13);

        L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
	        maxZoom: 16
        }).addTo(map);

        // L.tileLayer('http://{s}.tile.stamen.com/toner-lite/{z}/{x}/{y}.png', {
        // 	attribution: null,
        // 	subdomains: 'abcd',
        // 	minZoom: 0,
        // 	maxZoom: 20
        // }).addTo(map);

    }();

}
