function controllerPotholes(mapObject) {
    var controller = (new genericController())
        .map(mapObject)
        .label("Potholes")
        .name("POTHOLES")
        .id("potholes-layer")
        .iconPath("resources/icons/icon-pot-hole.svg");

    var layer = new genericLayer();
    layer.setKey("service_request_number");
    layer.setIcon("pothole");

    var popup = new popupPotholes();
    layer.setPopup(popup);

    controller.layer(layer);

    controller.endPoint("7as2-ds3y.json?");

    controller.preFetchData(true);

    controller.dateAccessor(function(d) { return new Date(d.creation_date); })

    var query = function() {
        var fromDate = d3.time.day.offset(new Date(), -30);

        return chicagoQuery()
            .setEndPoint("7as2-ds3y.json?")
            .where("status = 'open'")
            .fromDate(fromDate);
    }

    controller.query(query);

    this.get = function() { return controller };

}
