function controllerFourSquare(mapObject) {

    var controller = (new genericController())
        .map(mapObject)
        .label("FourSquare")
        .name("FOURSQUARE")
        .id("foursquare-layer")
        .iconPath("resources/icons/icon-foursquare.svg");


        var layer = new genericLayer();
        layer.setKey("id");
        layer.setIcon("foursquare");

        controller.layer(layer);

        var popup = new popupFourSquare();
        layer.setPopup(popup);

        var api = new fourSquareDataSet();

        var getData = function(bounds, callback) { // L.latLngBounds
            api.getTrendingVenues(bounds.getCenter(), callback);
        };

        controller.dataCallback(getData);

        controller.latitudeAccessor(function(d){return d.lat});
        controller.longitudeAccessor(function(d){return d.lon});

        this.get = function() { return controller };

}
