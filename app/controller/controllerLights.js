function controllerLights(mapObject) {
    var controller = (new genericController())
        .map(mapObject)
        .label("Street Light Out")
        .name("ONE_LIGHT")
        .id("lights-layer")
        .iconPath("resources/icons/icon-light.svg");

    var layer = new genericLayer();
    layer.setKey("service_request_number");
    layer.setIcon("light");

    var popup = new popupLights();
    layer.setPopup(popup);

    controller.layer(layer);

    controller.endPoint("3aav-uy2v.json?");

    controller.preFetchData(true);

    var query = function() {
        var fromDate = d3.time.day.offset(new Date(), -30);

        return chicagoQuery()
            .setEndPoint("3aav-uy2v.json?")
            .where("status = 'open'")
            .fromDate(fromDate);
    }

    controller.query(query);

    this.get = function() { return controller };
}
