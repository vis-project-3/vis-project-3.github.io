// Class that handles all the functions related to the Map

// Useful Leaflet functions
// L.marker.update()

function Map(container){

    var southWest;
    var northEast;
    var bounds;
    var map;
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

    /*************** Private Methods ********************/

    var computeRectangle = function(){
        lowerLeft = [Math.min(pointA[0], pointB[0])-buffer, Math.min(pointA[1],pointB[1])-buffer];
        upperRight = [Math.max(pointA[0], pointB[0])+buffer,Math.max(pointA[1], pointB[1])+buffer];

        console.log(lowerLeft);
        console.log(upperRight);
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
            //maxZoom: 18
        }).setView([41.87,-87.58],13);

        var mapLayer =  L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpeg', {
                            subdomains: '1234'
                        }).addTo(map);


        var satLayer =  L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpeg', {
                            subdomains: '1234'
                        });

        baseLayers = {
            Map: mapLayer,
            Satellite: satLayer
        };

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

