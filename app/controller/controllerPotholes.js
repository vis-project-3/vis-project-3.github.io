function controllerPotholes(mapObject) {

    var controller = new genericController();
    controller.map(mapObject);
    controller.label("Potholes!!");
    controller.id("potholes-layer");
    controller.iconPath("resources/icons/icon-pot-hole.svg");

    var layer = new genericLayer();
    layer.setKey("service_request_number");
    layer.setIcon("pothole");

    var popup = new popupPotholes();
    layer.setPopup(popup);

    controller.layer(layer);

    var query = function() {
        var fromDate = d3.time.day.offset(new Date(), -7);

        return chicagoQuery()
            .setEndPoint("7as2-ds3y.json?")
            .where("status = 'open'")
            .fromDate(fromDate);
    }

    controller.query(query);

    // var api = new potholesDataSet();
    // var popup = new popupPotholes();

    this.get = function() { return controller };

    // var requiredColumns = {
    //     0: 'creation_date',
    //     1: 'status',
    //     2: 'service_request_number',
    //     3: 'latitude',
    //     4: 'longitude'
    // };

    // var filterConditions = {
    //     timeStamp: 'lastMonth',
    //     status: 'Open',
    //     latitude: [Math.min(pointA[0],pointB[0]),Math.max(pointA[0],pointB[0])],
    //     longitude: [Math.min(pointA[1],pointB[1]),Math.max(pointA[1],pointB[1])]
    // };

    // var setPointA = function(data){
    //     pointA = data;
    //     setBoundaries()
    // };
    // var setPointB = function(data){
    //     pointB = data;
    //     setBoundaries();
    // };
    //
    // var setBoundaries = function(){
    //     filterConditions.latitude = [Math.min(pointA[0], pointB[0]), Math.max(pointA[0], pointB[0])];
    //     filterConditions.longitude =  [Math.min(pointA[1], pointB[1]), Math.max(pointA[1], pointB[1])];
    // };

    // layer.setKey("service_request_number");
    // layer.setName(name);
    // layer.setIcon("pothole");
    // layer.setPopup(popup);

    // controller.setName(name);
    // controller.setMap(mapObject);
    // controller.setLayer(layer);
    // controller.setfilterConditions(filterConditions);
    // controller.setRequiredColumns(requiredColumns);
    // controller.setAPI(api);

    // var fromDate = d3.time.day.offset(new Date(), -7);
    //
    // var query = function() {
    //     return chicagoQuery()
    //         .setEndPoint("7as2-ds3y.json?")
    //         .where("status = 'open'")
    //         .fromDate(fromDate);
    // }
    //
    // controller.setQuery(query);

    // controller.subscribe(name + "_CLEAR_DATA", controller.clearData);
    // controller.subscribe(name + "_UPDATE_DATA", controller.updateData);
    // controller.subscribe(name + "_NEW_DATA", controller.newData);
    // controller.subscribe("VIEW_LAYER_" + name, controller.toggleLayer);

    // amplify.subscribe("POINT_A", setPointA);
    // amplify.subscribe("POINT_B", setPointB);
}
