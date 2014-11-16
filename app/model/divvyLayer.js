function divvyLayer() {
    var self = this;
    var layer = [];
    var collection = {};
    var markers = {};
    var popup = new divvyPopUp();

    /* Public Methods */

    this.clearData = function(){
        collection = {};
        markers = {};
        layer = new L.LayerGroup();
    }

    this.addCollection = function (data) {
        for (var i = 0; i < data.length; i++) {
            collection[data[i].id] = data[i];
            addToMarkers(data[i]);
        }
    }

    this.updateMarker = function (data) {
        markers[data.id].setLatLng([parseFloat(data.latitude), parseFloat(data.longitude)]);
        markers[data.id].bindPopup(function(){
            return popUp.generatePopUpContent(data);
        })
        markers[data.id].update();
    }

    this.getLayer = function () {
        return layer;
    }

    this.updateCollectionElement = function (data) {
        this.collection[data.id] = data;
    }

    /***** Private Methods ******/

    var addToMarkers = function (data) {
        markers[data.id] = L.marker([parseFloat(data.latitude), parseFloat(data.longitude)], {
            icon : getIcon("divvy")
        }).addTo(layer);

        var content = popup.generatePopUpContent(data);
        console.log("[DIVVY_LAYER] : Generating Popup");
        markers[data.id].bindPopup(content);
    }

    var init = function(){
        layer = new L.LayerGroup();

    }();

}