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
        // console.log(layerObject);
        layer = layerObject;
    };

    this.setAPI = function(objectAPI){
        api = objectAPI;
    };

    var query;
    this.setQuery = function(q) { query = q; };

    /**** PUBLISHER SUBSCRIBER METHODS ****/
    this.subscribe = function(event, callback){
        amplify.subscribe(event,callback);
    };

    this.publish = function(event,data){
        amplify.publish(event, data);
    };


    /**** PUBLIC METHODS *****/
    this.layerIsActive = function() {
        return map.hasLayer(layer.getLayer());
    }

    this.clearData = function () {
        //layer.clearData();
    };

    this.newData = function () {
        api.getData(requiredColumns, filterConditions, callBackAdd);
    };

    this.updateData = function (bounds) {
        console.info("Layer %s is updating data with %o", name, bounds);
        if (! query) return;
        var fullQuery = query().queryRect(bounds);
        d3.json(fullQuery(), _updateData)
        // console.log(fullQuery());
    };

    //Toggle Layer
    this.toggleLayer = function(){
        console.log("[" + name + "] : Toggling Layer");
        temp = layer.getLayer();
        if(map.hasLayer(temp) == true){
            map.removeLayer(temp);
        }
        else map.addLayer(temp);
    };

    var fragment = new DocumentFragment();
    var fragSelect = d3.select(fragment);
    function _updateData(newData) {
        console.info("New data length:", newData.length);
        var keyFunction = function(d) { return d[layer.getKey()]; };
    }

    var callBackAdd = function(data){
        console.log("[" + name + "] : Adding Data");
        //layer.clearData();
        layer.addCollection(data);
    };

    var callBackUpdate = function(data){
        console.log("[" + name + "] : Updating Data");
    };

}
