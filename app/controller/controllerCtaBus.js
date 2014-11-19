function controllerCtaBus(mapObject) {

    var controller = (new genericController())
        .map(mapObject)
        .label("CTA Buses")
        .name("CTA_BUS")
        .id("live-bus-layer")
        .iconPath("resources/icons/icon-bus.svg");

    // var layer = new genericLayer();
    // layer.setKey("id");
    // layer.setIcon("divvy");
    //
    // var popup = new popupCrimes();
    // layer.setPopup(popup);
    //
    // controller.layer(layer);
    //
    // var query = function() {
    //     var fromDate = d3.time.day.offset(new Date(), -30);
    //
    //     return chicagoQuery()
    //     .setEndPoint("ijzp-q8t2.json?")
    //     .dateColumn("date")
    //     .fromDate(fromDate);
    // }
    //
    // controller.query(query);

    this.get = function() { return controller };

}
