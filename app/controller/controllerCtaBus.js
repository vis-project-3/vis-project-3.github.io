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

        var getData = function(bounds, route, callback) { // L.latLngBounds
            getBusByRoute(route, storeBusResults(bounds,callback))
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

        var storeBusResults = function(bounds,callback) {
            return function (data) {
                var results = data["bustime-response"].vehicle;
                var filtered_data = [];
                for (var bus = 0; bus < results.length; bus++){
                    var lat = parseFloat(results[bus].lat);
                    var lon = parseFloat(results[bus].lon);
                    if (bounds.contains([lat, lon])) {
                        filtered_data.push(results[bus]);
                    }
                }
                callback(filtered_data);
            }
        };

        controller.dataCallback(getData);

        controller.latitudeAccessor(function(d){return d.lat});
        controller.longitudeAccessor(function(d){return d.lon});

        this.get = function() { return controller };

}
