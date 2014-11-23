function controllerCtaStation(mapObject) {
    var controller = (new genericController())
    .map(mapObject)
    .label("CTA Bus Station")
    .name("CTA_STATION")
    .id("bus-layer")
    .iconPath("resources/icons/icon-bus-station.svg");

    var layer = new genericLayer();
    layer.setKey("stpid");
    layer.setIcon("cta_station");

    controller.layer(layer);

    var popup = new popupCtaStation();
    layer.setPopup(popup);

    var getData = function(bounds,callback) { // L.latLngBounds
        d3.json("data/cta.json", function(error, json) {
            if (error) return console.warn(error);
            var filtered_data = [];
            var data = json;
            for(var route = 0; route < data.length; route++){
                for(var stop = 0; stop < data[route].stops.length; stop++){
                    //console.log(route , stop);
                    var flag = data[route].stops[stop];
                    if(flag) {
                        var lat = parseFloat(data[route].stops[stop].lat);
                        var lon = parseFloat(data[route].stops[stop].lon);
                        //console.log(lat,lon);

                        if(bounds.contains([lat , lon])){
                            filtered_data.push(data[route].stops[stop]);
                        }
                    }
                }
            }
            callback(filtered_data); // array of objects [{ foo: 34 }, ... ]
        });
    };

    controller.dataCallback(getData);

    controller.latitudeAccessor(function(d){return d.lat});
    controller.longitudeAccessor(function(d){return d.lon});

    this.get = function() { return controller };

}
