function controllerDivvy(mapObject) {
    var controller = new genericController();
    var name = "DIVVY";
    var layer = new genericLayer();
    var api = new divvyStationsDataSet();
    var popup = new popupVehicles();
    var pointA = [];
    var pointB = [];

    this.label = "Divvy Station";
    this.id = "divvy-layer";
    this.eventId = "DIVVY";
    this.iconPath = "resources/icons/icon-divvy.svg";

    this.getController = function() { return controller };

    var requiredColumns = {
        0: 'id',
        1: 'stationName',
        2: 'availableDocks',
        3: 'availableBikes',
        4: 'latitude',
        5: 'longitude'
    };

    var filterConditions = {
            latitude: [Math.min(pointA[0], pointB[0]), Math.max(pointA[0], pointB[0])],
            longitude: [Math.min(pointA[1], pointB[1]), Math.max(pointA[1], pointB[1])]
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

    layer.setKey("id");
    layer.setName(name);
    layer.setIcon("divvy");
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
