function controllerCtaBus(mapObject) {

    var controller = (new genericController())
        .map(mapObject)
        .label("CTA Buses")
        .name("CTA_BUS")
        .id("live-bus-layer")
        .iconPath("resources/icons/icon-bus.svg");


    var layer = new genericLayer();
    layer.setKey("vid");
    layer.setIcon("cta_bus");

    controller.layer(layer);

    var popup = new popupCtaBus();
    layer.setPopup(popup);

    var api = new ctaDataSet();

    var getData = function(bounds, route, callback) { // L.latLngBounds
        api.getBusByRoute(route, storeBusResults(bounds,callback))
    };

    /*var storeBusResults = function(bounds,data,callback) {
        var results = data["bustime-response"].vehicle;
        var filtered_data = [];
        for (var i = 0; i < data.lenght)
            var lat = parseFloat(data[stop].lat);
            var lon = parseFloat(data[stop].lon);
            if(bounds.contains([lat , lon])){
                filtered_data.push(results[i]);
            }
        callback(filtered_data);
    };*/

    var storeBusResults = function(bounds, callback) {
        return function (data) {
            var results = data["bustime-response"].vehicle;
            var filtered_data = [];
            if (results) {
                for (var bus = 0; bus < results.length; bus++){
                    var lat = parseFloat(results[bus].lat);
                    var lon = parseFloat(results[bus].lon);
                    if (bounds.contains([lat, lon])) {
                        filtered_data.push(results[bus]);
                    }
                }
            }
            callback(filtered_data);
        }
    };

    var getSet = (new Utility).getSet;

    var getRoutesData = controller.getRoutesData = getSet.bind(controller)();
    var getActiveRoutes = controller.getActiveRoutes = getSet.bind(controller)();

    function updateDataHook(bounds, updateDataFunc) {
        console.log("eye of the murray");

        var activeRoutes = [];

        var activeRouteBusses = [];

        var getActiveBuses = function(activeRouteBusses) {
            return function(buses) {
                activeRouteBusses = activeRouteBusses.concat(buses);
            }
        }

        getRoutesData()(bounds, function(d) {
            console.log(d.length);
            var activeRoutes = getActiveRoutes()();

            activeRoutes.forEach(function(route) {
                getData(bounds, route, function(buses) {
                    controller.removalCondition(function(d) { return d.rt == route; })
                    controller.dataCallback(function(bounds, callback) {
                        callback(buses);
                    });
                    updateDataFunc(bounds);
                });
            })

        })

    }



    controller.updateDataHook(updateDataHook);

    controller.dataCallback(getData);

    controller.latitudeAccessor(function(d){ return d.lat});
    controller.longitudeAccessor(function(d){return d.lon});

    this.get = function() { return controller };

}
