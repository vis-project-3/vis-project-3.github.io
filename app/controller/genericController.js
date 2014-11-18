function genericController() {
    var name;
    var pointA = [];
    var pointB = [];
    var map;
    var layer;
    var api;
    var requiredColumns = {};
    var filterConditions = {};

    /*** SETTERS AND GETTERS ***/
    this.setRequiredColumns = function(columns){
        requiredColumns = columns;
    };

    this.setfilterConditions = function(conditions){
        filterConditions = conditions;
    };

    this.setName = function(logName){
        name = logName;
    }

    this.setMap = function(mapObject){
        map = mapObject;
    };

    this.setLayer = function(layerObject){
        console.log(layerObject);
        layer = layerObject;
    };

    this.setAPI = function(objectAPI){
        api = objectAPI;
    };

    /**** PUBLISHER SUBSCRIBER METHODS ****/
    this.subscribe = function(event, callback){
        amplify.subscribe(event,callback);
    };

    this.publish = function(event,data){
        amplify.publish(event, data);
    };


    /**** PUBLIC METHODS *****/
    this.clearData = function () {
        //layer.clearData();
    };

    this.newData = function () {
        api.getData(requiredColumns, filterConditions, callBackAdd);
    };

    this.updateData = function () {
    };

    //Toggle Layer
    this.toggleLayer = function(){
        console.log("[" + name + "] : Toggling Layer");
        temp = layer.getLayer();
        if(map.hasLayer(temp)==true){
            map.removeLayer(temp);}
        else map.addLayer(temp);
    };



    var callBackAdd = function(data){
        console.log("[" + name + "] : Adding Data");
        //layer.clearData();
        layer.addCollection(data);
    };

    var callBackUpdate = function(data){
        console.log("[" + name + "] : Updating Data");
    };

}

