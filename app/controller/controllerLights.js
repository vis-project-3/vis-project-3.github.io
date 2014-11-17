function controllerLights(mapObject) {
    var pointA = [];
    var pointB = [];
    var map = mapObject.getMap();

    var lights = new layerLights();
    var lightsAPI = new streetLightsOneOutDataSet();

    var lightsAll = new layerLightsAll();
    var lightsAllAPI = new streetLightsAllOutDataSet();

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
        console.log("[LIGHTS ONE] : Adding Data");
        lights.clearData();
        lights.addCollection(data);
    };

    var callBackAddAll = function(data){
        console.log("[LIGHTS ALL] : Adding Data");
        lightsAll.clearData();
        lightsAll.addCollection(data);
    };

    var callBackUpdate = function(data){
        console.log("[LIGHTS ONE] : Updating Data");
        //divvy.update
    }

    var callBackUpdateAll = function(data){
        console.log("[LIGHTS ALL] : Updating Data");
        //divvy.update
    }

    var clearData = function () {
        lights.clearData();
        lightsAll.clearData();
    }

    var newData = function () {
        lightsAPI.getData(requiredColumns,filterConditions,callBackAdd);
    };

    var newDataAll = function () {
        lightsAllAPI.getData(requiredColumns,filterConditions,callBackAddAll);
    };

    var updateData = function () {
        //lightsAPI.getUpdatedData(requiredColumns, filterConditions, callBackUpdate)
    };

    var updateDataAll = function () {
        //lightsAllAPI.getUpdatedData(requiredColumns, filterConditions, callBackUpdateAll)
    };

    //Toggle Layer
    var toggleLayer = function(){
        console.log("[LIGHTS] : Toggling Layer");
        var layer = lights.getLayer();
        if(map.hasLayer(layer)==true){
            map.removeLayer(layer);}
        else map.addLayer(layer);
    };

    var toggleLayerAll = function(){
        console.log("[LIGHTS All] : Toggling Layer");
        var layerAll = lightsAll.getLayer();
        if(map.hasLayer(layerAll)==true){
            map.removeLayer(layerAll);}
        else map.addLayer(layerAll);
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

    amplify.subscribe("LIGHTS_CLEAR_DATA", clearData);

    amplify.subscribe("LIGHTS_UPDATE_DATA", updateData);
    amplify.subscribe("LIGHTS_UPDATE_DATA", updateDataAll);

    amplify.subscribe("LIGHTS_NEW_DATA", newData);
    amplify.subscribe("LIGHTS_NEW_DATA", newDataAll);

    amplify.subscribe("VIEW_LAYER_LIGHTS", toggleLayer);
    amplify.subscribe("VIEW_LAYER_LIGHTS", toggleLayerAll);

    amplify.subscribe("POINT_A", setPointA);
    amplify.subscribe("POINT_B", setPointB);
}

