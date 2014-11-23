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

    var popup = new popupStations();
    layer.setPopup(popup);

    var getData = function(bounds) { // L.latLngBounds
        d3.json("../data/cta.json", function(error, json) {
            if (error) return console.warn(error);
            var filtered_data = [];
            var data = json;
            for(var route = 0; route < data.length;route++){
                for(var stop = 0; stop < data[route].stops.length; stop++){
                    if(bounds.contains(data[route].stops[stop].lat, data[route].stops[stop].lon)){
                        filtered_data.push(data[route].stops[stop]);
                    }
                }
            }
            return filtered_data; // array of objects [{ foo: 34 }, ... ]
        });
    };

    controller.getData(getData);

    this.get = function() { return controller };

}
