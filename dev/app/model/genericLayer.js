function genericLayer(iconKind) {
    var self = this;
    var layer = [];
    var collection = {};
    var markers = {};

    /* Public Methods */

    this.addCollection = function (data) {
        for (var i = 0; i < data.length; i++) {
            collection[data[i].id] = data[i];
            addToMarkers(data[i]);
        }
    }

    this.updateMarker = function (data) {
        markers[data.id].setLatLng([parseFloat(data.latitude), parseFloat(data.longitude)]);
        markers[data.id].update();
    }

    this.getLayer = function () {
        return layer;
    }

    this.updateCollectionElement = function (data) {
        this.collection[data.id] = data;
    }

    /* Private Methods */
    var init = function(){
        layer = new L.LayerGroup();
    }();

    var addToMarkers = function (data) {
        markers[data.id] = L.marker([parseFloat(data.latitude), parseFloat(data.longitude)], {
            icon : getIcon(iconKind)
        }).addTo(layer);
    }

}