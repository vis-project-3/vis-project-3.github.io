function controllerVehicles(mapObject) {
    var controller = (new genericController())
        .map(mapObject)
        .label("Abandoned Cars")
        .name("VEHICLE")
        .id("vehicles-layer")
        .iconPath("resources/icons/icon-abandoned-car.svg");

    var layer = new genericLayer();
    layer.setKey("service_request_number");
    layer.setIcon("vehicle");

    var popup = new popupVehicles();
    layer.setPopup(popup);

    controller.layer(layer);

    var query = function() {
        var fromDate = d3.time.day.offset(new Date(), -30);

        return chicagoQuery()
        .setEndPoint("3c9v-pnva.json?")
        .fromDate(fromDate);
    }

    controller.query(query);

    this.get = function() { return controller };

}
