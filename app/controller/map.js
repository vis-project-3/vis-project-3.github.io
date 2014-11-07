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

    /* Public Methods */

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

    /* Private Methods */
    var init = function(){
        //southWest  = [41.60,-87.40];
        //northEast = [42.00, -88.00];
        //bounds = L.latLngBounds(this.southWest, this.northEast);

        var uic_location = [41.8719, -87.6492];
        var museum_location = [41.861466,-87.614935];

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

        /*L.Routing.control({
            waypoints: [
                L.latLng(uic_location),
                L.latLng(museum_location)
            ]
        }).addTo(map);*/

    }();

}

