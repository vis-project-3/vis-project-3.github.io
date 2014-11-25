function ctaDataSet(){
    var key = "?key=EsqF2kFGe49fzJ5uM9BJDrQpm";
    var entryPoint = "http://www.ctabustracker.com/bustime/api/v1/";
    var apiPredictions = "getpredictions";
    var apiVehicle = "getvehicles";

    var generateQuery = function(dataset, parameters){
        var query = entryPoint + dataset + key + parameters;
        return 'https://query.yahooapis.com/v1/public/yql?format=json&q=' + encodeURIComponent('select * from xml where url="' + query + '"');
    };

    var getData = function(url, callback){
        $.ajax({
            url: url,
            success: function(data){
                callback(data.query.results);
            }
        });
    };

    this.getBusPrediction = function(vid,callback) {
        var query = generateQuery(apiPredictions,"&vid=" + vid);
        getData(query,callback);
    };

    this.getStopPrediction = function(stpid, callback){
        var query = generateQuery(apiPredictions, "&stpid=" + stpid);
        getData(query,callback);
    };

    this.getBusByRoute = function(route, callback) {
        var query = generateQuery(apiVehicle,"&rt=" + route);
        getData(query,callback);
    };

    this.getBusById = function(vehicle_id, callback){
        var query = generateQuery(apiVehicle,"&vid=" + vehicle_id);
        getData(query,callback);
    };

}