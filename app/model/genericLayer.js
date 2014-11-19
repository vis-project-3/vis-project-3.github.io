function genericLayer() {
    var self = this;
    var layer = [];
    var collection = {};
    var markers = {};
    var popup;
    var key;
    var name;
    var icon;

    /*** SETTERS AND GETTERS ***/

    this.setName  = function(layerName){
        name = layerName;
    };

    this.setKey = function(dataKey){
        key = dataKey;
    };

    this.getKey = function() { return key; };

    this.setPopup = function(popupKind){
        popup = popupKind;
    };

    this.setIcon = function(markerIcon){
        icon = markerIcon;
    };

    this.getLayer = function () {
        return layer;
    };

    /**** Public Methods *****/

    this.clearData = function(){
        collection = {};
        markers = {};
        layer = new L.LayerGroup();
    };

    this.addCollection = function(data) {
        for (var i = 0; i < data.length; i++) {
            collection[data[i][key]] = data[i];
            addToMarkers(data[i]);
        }
    };

    this.updateMarker = function (data) {
        markers[data[key]].setLatLng([parseFloat(data.latitude), parseFloat(data.longitude)]);
        markers[data[key]].update();
    };

    this.updateCollectionElement = function (data) {
        this.collection[data[key]] = data;
    };

    /* Private Methods */
    var init = function(){
        layer = new L.LayerGroup();
    }();

    var addToMarkers = function (data) {
        markers[data[key]] = L.marker([parseFloat(data.latitude), parseFloat(data.longitude)], {
            icon : getIcon(icon)
        }).addTo(layer);

        var content = popup.generatePopupContent(data);
        console.log("[" + name + "_LAYER] : Generating Popup");
        markers[data[key]].bindPopup(content);
    }

}
