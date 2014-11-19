function controllerVehicles(mapObject) {
    var controller = new genericController();
    var name = "VEHICLE";
    var layer = new genericLayer();
    var api = new potholesDataSet();
    var popup = new popupPotholes();
    var pointA = [];
    var pointB = [];

    this.label = "Abandoned Cars";
    this.id = "vehicles-layer";
    this.iconPath = "resources/icons/icon-abandoned-car.svg";
    this.eventId = "VEHICLE";

    var requiredColumns = {
        0: 'creation_date',
        1: 'status',
        2: 'service_request_number',
        3: 'latitude',
        4: 'longitude'
    };

    var filterConditions = {
        timeStamp: 'lastMonth',
        status: 'Open',
        latitude:[Math.min(pointA[0],pointB[0]),Math.max(pointA[0],pointB[0])],
        longitude:[Math.min(pointA[1],pointB[1]),Math.max(pointA[1],pointB[1])]
    };

    var setPointA = function(data){
        pointA = data;
        setBoundaries()
    };
    var setPointB = function(data){
        pointB = data;
        setBoundaries();
    };

    var setBoundaries = function(){
        filterConditions.latitude = [Math.min(pointA[0], pointB[0]), Math.max(pointA[0], pointB[0])];
        filterConditions.longitude =  [Math.min(pointA[1], pointB[1]), Math.max(pointA[1], pointB[1])];
    };

    layer.setKey("service_request_number");
    layer.setName(name);
    layer.setIcon("vehicle");
    layer.setPopup(popup);

    controller.setName(name);
    controller.setMap(mapObject);
    controller.setLayer(layer);
    controller.setfilterConditions(filterConditions);
    controller.setRequiredColumns(requiredColumns);
    controller.setAPI(api);

    controller.subscribe(name + "_CLEAR_DATA", controller.clearData);
    controller.subscribe(name + "_UPDATE_DATA", controller.updateData);
    controller.subscribe(name + "_NEW_DATA", controller.newData);
    controller.subscribe("VIEW_LAYER_" + name, controller.toggleLayer);

    amplify.subscribe("POINT_A", setPointA);
    amplify.subscribe("POINT_B", setPointB);
}
