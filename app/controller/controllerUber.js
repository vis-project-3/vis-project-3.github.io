function controllerUber(mapObject) {
    var controller = (new genericController())
        .map(mapObject)
        .label("Uber Estimates")
        .name("UBER")
        .id("uber-layer")
        .iconPath("resources/icons/icon-uber.svg");

    var layer = new genericLayer();
        layer.setKey("id");
        layer.setIcon("uber");

    var popup = new popupUber();
    layer.setPopup(popup);

    controller.layer(layer);

    var waypoints = [];

    var result = {};
    var uberObject = {};

    var api = new uberDataSet();

    var setWaypoints = function(data){
        waypoints = data.waypoints;
    };

    var getData = function(undefined,callback) { // L.latLngBounds
        result = {};
        uberObject = {};
        api.getPriceEstimates(waypoints[0],waypoints[1],storePriceEstimates(callback));
    };

    var storePriceEstimates = function(callback) {
        return function (data) {
            var priceEstimate = data.prices;
            for(var i = 0; i < priceEstimate.length; i++){
                uberObject[priceEstimate[i].product_id] = priceEstimate[i];
            }
            api.getTimeEstimates(waypoints[0],storeTimeEstimates(callback));
        }
    };

    var storeTimeEstimates = function(callback){
        return function(data){
            var timeEstimate = data.times;
            for(var i = 0; i < timeEstimate.length; i++){
                uberObject[timeEstimate[i].product_id].timeEstimate = timeEstimate[i].estimate;
            }
            result.lat = waypoints[0][0];
            result.lon = waypoints[0][1];
            result.data = uberObject;
            callback([result]);
        }
    };

    controller.dataCallback(getData);

    controller.latitudeAccessor(function(d){return d.lat});
    controller.longitudeAccessor(function(d){return d.lon});

    this.get = function() { return controller };

    amplify.subscribe("ROUTE_UPDATED",setWaypoints);

}
