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

            var coords = bounds.getCenter();
            api.getTrendingVenues([parseFloat(coords.lat),parseFloat(coords.lng)], callback);
        };

        controller.dataCallback(getData);

        controller.latitudeAccessor(function(d){return d.latitude});
        controller.longitudeAccessor(function(d){return d.longitude});

        this.get = function() { return controller };

}
