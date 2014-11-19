function controllerCrimes(mapObject) {
    var controller = new genericController();
    var name = "CRIMES";
    var layer = new genericLayer();
    var api = new crimesDataSet();
    var popup = new popupCrimes();
    var pointA = [];
    var pointB = [];

    this.label = "Crime Reports";
    this.iconPath = "resources/icons/icon-crime.svg";
    this.eventId = "CRIMES";
    this.id = "crimes-layer";

    var requiredColumns = {
        0: 'id',
        1: 'date',
        3: 'latitude',
        4: 'longitude'
    };

    var filterConditions = {
        timeStamp: 'lastMonth',
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

    layer.setKey("id");
    layer.setName(name);
    layer.setIcon("crime");
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
