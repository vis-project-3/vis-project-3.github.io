function controllerFoodInspection(mapObject) {
    var controller = (new genericController())
        .map(mapObject)
        .label("Failed Food Inspection")
        .name("FOOD_INSPECTION")
        .id("food-layer")
        .iconPath("resources/icons/icon-food.svg");

    var layer = new genericLayer();
    layer.setKey("inspection_id");
    layer.setIcon("food");

    var popup = new popupFoodInspection();
    layer.setPopup(popup);

    controller.layer(layer);

    var query = function() {
        var fromDate = d3.time.day.offset(new Date(), -30);

        return chicagoQuery()
            .setEndPoint("4ijn-s7e5.json?")
            .where("results = 'fail'")
            .dateColumn("inspection_date")
            .fromDate(fromDate);
    }

    controller.query(query);

    this.get = function() { return controller };

}
