function controllerDivvy(mapObject) {
    var pointA = [];
    var pointB = [];
    var map = mapObject.getMap();
    var divvy = new layerDivvy();
    var divvyAPI = new divvyStationsDataSet();

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

    var callBackAdd = function(data){
        console.log("[DIVVY] : Adding Data");
        divvy.clearData();
        divvy.addCollection(data);
    };

    var callBackUpdate = function(data){
        console.log("[DIVVY] : Updating Data");
        //divvy.update
    }

    var clearData = function () {
        divvy.clearData();
    }

    var newData = function () {
        //divvyAPI.getData(requiredColumns, filterConditions, callBackDivvy);
        divvyAPI.getSurroundingStationsData(requiredColumns, filterConditions, callBackAdd);

    }

    var updateData = function () {
        //divvyAPI.getUpdatedData(requiredColumns, filterConditions, callBackUpdate)
    }

    //Toggle Layer
    var toggleLayer = function(){
        console.log("[DIVVY] : Toggling Layer");
        layer = divvy.getLayer();
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

    amplify.subscribe("DIVVY_CLEAR_DATA", clearData);
    amplify.subscribe("DIVVY_UPDATE_DATA", updateData);
    amplify.subscribe("DIVVY_NEW_DATA", newData);
    amplify.subscribe("VIEW_LAYER_DIVVY", toggleLayer);
    amplify.subscribe("POINT_A", setPointA);
    amplify.subscribe("POINT_B", setPointB);
}

