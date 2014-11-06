// Class that handles all the functions related to the Map

// Useful Leaflet functions
// L.marker.update()

function Map(container){

    this.southWest  = [41.60,-87.40];
    this.northEast = [42.00, -88.00];
    this.bounds = L.latLngBounds(this.southWest, this.northEast);

    this.map = L.map(container, {
        maxBounds : this.bounds,
        minZoom: 10,
        maxZoom: 18
    }).setView([41.87,-87.58],13)

    L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpeg', {
            subdomains: '1234'
        }).addTo(this.map);

    this.getIcon = function(kind) {
        switch (kind) {
            case "test" :
                return L.icon({
                    iconUrl: 'resources/icons/test_icon.svg',
                    iconSize: [100,100]
                });
            case "cta_bus" :
                return L.icon({
                    iconUrl: 'resources/icons/cta_bus.svg'
                });
            case "cta_station" :
                return L.icon({
                    iconUrl: 'resources/icons/cta_station.svg'
                });
            case "divvy" :
                return L.icon({
                    iconUrl: 'resources/icons/divvy.svg'
                });
            case "light" :
                return L.icon({
                    iconUrl: 'resources/icons/light.svg'
                });
            case "pothole" :
                return L.icon({
                    iconUrl: 'resources/icons/pothole.svg'
                });
            case "crime" :
                return L.icon({
                    iconUrl: 'resources/icons/crime.svg'
                });
            case "vehicle" :
                return L.icon({
                    iconUrl: 'resources/icons/vehicle.svg'
                });
            case "uber" :
                return L.icon({
                    iconUrl: 'resources/icons/uber.svg'
                });
            default:
                return L.icon({
                    iconUrl: 'resources/icons/error.svg',
                    iconSize: [100,100]
                 });

        }
    }

}

Map.prototype.addMarker = function(kind, lat, long){
    var map = this.map;
    var marker = L.marker([lat, long], {
        icon: this.getIcon(kind)
    }).addTo(map);

    return marker;
}