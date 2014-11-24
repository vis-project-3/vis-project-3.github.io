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

    var activeRoutes = [];

    var getData = this.getData = function(bounds, callback) { // L.latLngBounds
        d3.json("data/stops.json", function(error, json) {
            activeRoutes = [];
            if (error) return console.warn(error);
            var filtered_data = [];
            var data = json;
            for(var stop = 0; stop < data.length; stop++){
                //console.log(route , stop);
                var flag = data[stop];
                if(flag) {
                    var lat = parseFloat(data[stop].lat);
                    var lon = parseFloat(data[stop].lon);
                    //console.log(lat,lon);

                    if(bounds.contains([lat , lon])){
                        filtered_data.push(data[stop]);
                        activeRoutes = arrayUnique(activeRoutes.concat(data[stop].rt));
                    }
                }
            }
            callback(filtered_data); // array of objects [{ foo: 34 }, ... ]
        });
    };

   var arrayUnique = function(array) {
        var a = array.concat();
        for(var i=0; i<a.length; ++i) {
            for(var j=i+1; j<a.length; ++j) {
                if(a[i] === a[j])
                    a.splice(j--, 1);
            }
        }

        return a;
    };

    this.getActiveRoutes = function(){
        if(activeRoutes.length > 0 )
            return activeRoutes;
    }

    function updateDataHook(bounds, updateDataFunc) {
        console.log("eye of the paulo");

        updateDataFunc(bounds);
    }

    controller.updateDataHook(updateDataHook);

    controller.dataCallback(getData);

    controller.latitudeAccessor(function(d){return d.lat});
    controller.longitudeAccessor(function(d){return d.lon});

    this.get = function() { return controller };

}
