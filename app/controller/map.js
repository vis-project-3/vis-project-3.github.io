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

}
