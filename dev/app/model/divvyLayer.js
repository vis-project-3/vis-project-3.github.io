function divvyLayer() {
    var self = this;
    var layer = [];
    var collection = {};
    var markers = {};

    /* Public Methods */

    this.varLog = function(){
        console.log(layer)
        console.log(collection)
        console.log(markers)
    }

    this.addCollection = function (data) {
        for (var i = 0; i < data.stationBeanList.length; i++) {
            collection[data.stationBeanList[i].id] = data.stationBeanList[i];
            addToMarkers(data.stationBeanList[i]);
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
            icon : getIcon("divvy")
        }).addTo(layer);
    }

}