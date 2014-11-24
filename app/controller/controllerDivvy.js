function controllerDivvy(mapObject) {
    var controller = (new genericController())
        .map(mapObject)
        .label("Divvy Stations")
        .name("DIVVY")
        .id("divvy-layer")
        .iconPath("resources/icons/icon-divvy.svg");

    var layer = new genericLayer();
        layer.setKey("id");
        layer.setIcon("divvy");

    var popup = new popupDivvy();
    layer.setPopup(popup);

    controller.layer(layer);

    var api = new divvyDataSet();

    var getData = function(bounds, callback) { // L.latLngBounds
        api.getStations(bounds, callback);
    };

    controller.dataCallback(getData);

    controller.activeUpdate(true);

    controller.latitudeAccessor(function(d){return d.latitude});
    controller.longitudeAccessor(function(d){return d.longitude});

    this.get = function() { return controller };

}
