function controllerSongKick(mapObject) {
    var controller = (new genericController())
        .map(mapObject)
        .label("SongKick")
        .name("SONGKICK")
        .id("songkick-layer")
        .iconPath("resources/icons/icon-songkick.svg");

    var layer = new genericLayer();
        layer.setKey("id");
        layer.setIcon("songkick");

    var popup = new popupSongKick();
    layer.setPopup(popup);

    controller.layer(layer);

    var api = new songKickDataSet();

    var getData = function(bounds, callback) { // L.latLngBounds
        var coords = bounds.getCenter();
        api.getEvents(parseFloat(coords.lat),parseFloat(coords.lng), callback);
    };

    controller.dataCallback(getData);

    controller.latitudeAccessor(function(d){return d.latitude});
    controller.longitudeAccessor(function(d){return d.longitude});

    this.get = function() { return controller };


}
