function controllerCrimes(mapObject) {
    var pointA = [];
    var pointB = [];
    var map = mapObject.getMap();
    var crimes = new layerCrimes()
    var crimesAPI = new crimesDataSet();

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

    var callBackAdd = function(data){
        console.log("[CRIMES] : Adding Data");
        crimes.clearData();
        crimes.addCollection(data);
    };

    var callBackUpdate = function(data){
        console.log("[CRIMES] : Updating Data");
        //divvy.update
    }

    var clearData = function () {
        crimes.clearData();
    }

    var newData = function () {
        crimesAPI.getData(requiredColumns,filterConditions,callBackAdd);
    };

    var updateData = function () {
        //divvyAPI.getUpdatedData(requiredColumns, filterConditions, callBackUpdate)
    };

    //Toggle Layer
    var toggleLayer = function(){
        console.log("[CRIMES] : Toggling Layer");
        var layer = crimes.getLayer();
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

    amplify.subscribe("CRIMES_CLEAR_DATA", clearData);
    amplify.subscribe("CRIMES_UPDATE_DATA", updateData);
    amplify.subscribe("CRIMES_NEW_DATA", newData);
    amplify.subscribe("VIEW_LAYER_CRIMES", toggleLayer);
    amplify.subscribe("POINT_A", setPointA);
    amplify.subscribe("POINT_B", setPointB);
}

