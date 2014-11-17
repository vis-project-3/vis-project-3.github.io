function controllerPotholes(mapObject) {
    var pointA = [];
    var pointB = [];
    var map = mapObject.getMap();
    var potholes = new layerPotholes();
    var potholesAPI = new potholesDataSet();

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

    var callBackAdd = function(data){
        console.log("[POTHOLES] : Adding Data");
        potholes.clearData();
        potholes.addCollection(data);
    };

    var callBackUpdate = function(data){
        console.log("[POTHOLES] : Updating Data");
        //divvy.update
    }

    var clearData = function () {
        potholes.clearData();
    }

    var newData = function () {
        potholesAPI.getData(requiredColumns,filterConditions,callBackAdd);
    };

    var updateData = function () {
        //divvyAPI.getUpdatedData(requiredColumns, filterConditions, callBackUpdate)
    };

    //Toggle Layer
    var toggleLayer = function(){
        console.log("[POTHOLES] : Toggling Layer");
        var layer = potholes.getLayer();
        if(map.hasLayer(layer)==true){
            map.removeLayer(layer);}
        else map.addLayer(layer);
    };

    var setPointA = function(data){
        pointA = data;
        setBoundaries();
    };
    var setPointB = function(data){
        pointB = data;
        setBoundaries();
    };

    var setBoundaries = function(){
        filterConditions.latitude = [Math.min(pointA[0], pointB[0]), Math.max(pointA[0], pointB[0])];
        filterConditions.longitude =  [Math.min(pointA[1], pointB[1]), Math.max(pointA[1], pointB[1])];
    };

    amplify.subscribe("POTHOLES_CLEAR_DATA", clearData);
    amplify.subscribe("POTHOLES_UPDATE_DATA", updateData);
    amplify.subscribe("POTHOLES_NEW_DATA", newData);
    amplify.subscribe("VIEW_LAYER_POTHOLES", toggleLayer);
    amplify.subscribe("POINT_A", setPointA);
    amplify.subscribe("POINT_B", setPointB);
}

