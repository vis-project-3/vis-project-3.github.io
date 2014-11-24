function controllerCrimes(mapObject) {
    var controller = (new genericController())
        .map(mapObject)
        .label("Crime Reports")
        .name("CRIMES")
        .id("crimes-layer")
        .iconPath("resources/icons/icon-crime.svg");

    var layer = new genericLayer();
    layer.setKey("id");
    layer.setIcon("crime");

    var popup = new popupCrimes();
    layer.setPopup(popup);

    controller.layer(layer);

    controller.endPoint("ijzp-q8t2.json?");

    controller.dateAccessor(function(d) { return new Date(d.date); });

    var query = function() {
        var fromDate = d3.time.day.offset(new Date(), -30);

        return chicagoQuery()
            .setEndPoint("ijzp-q8t2.json?")
            .limit(50000)
            .dateColumn("date")
            .fromDate(fromDate);
    }

    controller.showInChart(true);

    controller.query(query);

    this.get = function() { return controller };
}
