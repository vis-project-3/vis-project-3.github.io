function App(){
    var clickedPoints,
        boundingBox,
        path = L.polyline([]);

    L.Icon.Default.imagePath = "resources/images";

    // console.log(L);

    var getServiceRequest = function(d) { return d.service_request_number; }

    var oneWeekAgo = d3.time.day.offset(new Date(), -7);
    var twoDaysAgo = d3.time.day.offset(new Date(), -2);

    var potholesQuery = function() {
        return ctaQuery("potholes")
            .where("status = 'open'");
    }

    var potholesDayLayer = {
        id: "potholesDay",
        name: "Potholes Last Day",
        layerGroup: L.featureGroup(),
        getQuery: function() { return potholesQuery().fromDate(twoDaysAgo) },
        keyFunction: getServiceRequest
    }

    var potholesWeekLayer = {
        id: "potholesWeek",
        name: "Potholes Last Week",
        layerGroup: L.featureGroup(),
        getQuery: function() { return potholesQuery().fromDate(oneWeekAgo) },
        keyFunction: getServiceRequest
    };

    var dataLayers = [
        { id: "ctaBusses", name: "CTA Busses", layerGroup: L.layerGroup() },
        potholesDayLayer,
        potholesWeekLayer
    ];

    var frag = new DocumentFragment();

    var fragment = d3.select(frag);

    var layerUl = fragment.selectAll("ul").data(dataLayers);
    layerUl.enter().append("ul").attr("class", function(d) { return d.id; });

    var map = new Map("map");

    var control = L.control.layers(null, null, { collapsed: false });

    dataLayers.forEach(function(layer) {
        control.addOverlay(layer.layerGroup, layer.name);
    });

    control.addTo(map.getMap());

    var color = d3.scale.category10();

    /********** TEST CUSTOM CONTROL */

    var legend = L.control({position: 'bottomright'});

    // console.log(d3.select(".leaflet-control-container").node());

    // console.log(map.getMap().getContainer());
    var container = d3.select(".leaflet-control-container").node();

    var MyControl = L.Control.extend({
        options: {
            position: 'bottomright'
        },

        initialize: function (foo, options) {
            // ...
            L.Util.setOptions(this, options);
        },

        onAdd: function(map) {
            var className = 'leaflet-control-layers leaflet-control-layers-expanded';

            var container = L.DomUtil.create('div', className);

            container.innerHTML = '<h1>custom control</h1>';

            return container;
        }
    });

    map.getMap().addControl(new MyControl());

    // L.DomUtil.create('div', "leaflet-middle leaflet-right", container);

    // legend.onAdd = function (map) {
    //
    //     var div = L.DomUtil.create('div', 'leaflet-control-layers');
    //
    //     div.innerHTML = '<h1>custom control</h1>';
    //
    //     return div;
    // };

    // legend.addTo(map.getMap());

    map.getMap()
        .on("overlayadd overlayremove", function(event) {
            var queryRect = map.getQueryRectangle().getBounds();
            updateActiveLayers(queryRect);
        })

    function updateActiveLayers(queryRect) {
        dataLayers.forEach(function(layer) {
            if (map.getMap().hasLayer(layer.layerGroup)) {
                var query = layer.getQuery().queryRect(queryRect);
                d3.json(query(), updateData(layer))
            }
        })
    }



    function updateData(layer) {
        return function(newData) {
            console.info("New data length:", newData.length);
            var className = layer.id + "-marker";
            var parent = fragment.select("." + layer.id);
            var li = parent.selectAll("li").data(newData, layer.keyFunction);
            li.enter().append("li")
                .each(function(d) {
                    var marker = L.circle([d.latitude, d.longitude]);
                    marker.setRadius(10).setStyle({
                        stroke: true,
                        fill: true,
                        fillOpacity: 0.8
                    });
                    this._marker = marker;
                    layer.layerGroup.addLayer(marker);
                });

            li.exit()
                .each(function(d) {
                    layer.layerGroup.removeLayer(this._marker);
                    d3.select(this).remove();
                });
        }
    }

    var uic_west = L.latLng( 41.874255, -87.676353),
        museum = L.latLng( 41.861466, -87.614935);

    var r = 10;

    var iconHtml = d3.select(new DocumentFragment())
        .append("div")
        .call(function(div) {
            div.append("svg").attr({ width: r, height: r})
                .append("circle").attr({ r: r / 2, cy: r / 2, cx: r / 2 });
        })
        .node().innerHTML;

    var myIcon = L.divIcon({
        className: 'my-div-icon',
        html: iconHtml,
        size: r
    });

    var plan = L.Routing.plan(null, {
        waypointIcon: function(i, n) { return myIcon; },
        geocoder: L.Control.Geocoder.nominatim()
    });

    function getBounds(array) {
        return L.polyline(array).getBounds();
    }

    var dispatch = d3.dispatch("routesFound", "queryRectUpdated");

    var route = L.Routing.control({
        plan: plan,
        geocoder: L.Control.Geocoder.nominatim(),
        fitSelectedRoutes: false,
        show: false
    }).on("routesfound", function(e) {
        dispatch.routesFound.apply(this, arguments);
    });

    dispatch.on("routesFound", function(e) {
        var bounds = getBounds(e.routes[0].coordinates);
        setQueryRectangle(bounds);
    })

    dispatch.on("queryRectUpdated", function(queryRect) {
        removeMarkersOutsideBounds(queryRect);
        updateActiveLayers(queryRect);
    })

    dispatch.on("queryRectUpdated.initial", function(e) {
        map.getMap().addLayer(potholesWeekLayer.layerGroup);
    })

    route.addTo(map.getMap());

    function removeMarkersOutsideBounds(queryRect) {
        dataLayers.forEach(function(layer) {
            var group = layer.layerGroup;
            var markers = group.getLayers();
            markers.forEach(function(marker) {
                var latLng = marker.getLatLng();
                if (! queryRect.contains(latLng) ) {
                    group.removeLayer(marker);
                }
            })
        })
    }

    function setQueryRectangle(latLngBounds) {
        var padded = latLngBounds.pad(.20);
        var queryRect = map.setRectangle(padded).getBounds();
        dispatch.queryRectUpdated(queryRect);
    }

    (function initialize() {
        route.setWaypoints([uic_west, museum]);
    }());

    // var router = L.Routing.osrm(),
    //     line,
    //
    // waypoints = [];
    //
    // map.getMap().on("click", function(e) {
    //     waypoints.push({ latLng: e.latlng });
    //     if (waypoints.length >= 2) {
    //         router.route(waypoints, function(e, routes) {
    //             if (line) map.removeLayer(line);
    //
    //             line = L.Routing.line(routes[0]);
    //             line.addTo(map.getMap());
    //         })
    //     }
    // });



    // var ctaKey = "LbihDNnA3P5WKjGJZfBEsAh4P";
    //
    // var endPoint = "http://www.ctabustracker.com/bustime/api/v1/";

    // function cta() {
    //     var apiKey;
    //     function cta() {}
    //     cta.apiKey = function(v) { return (apiKey = v, cta); };
    // }

    // var url = "http://www.ctabustracker.com/bustime/api/v1/getroutes?key=LbihDNnA3P5WKjGJZfBEsAh4P";

    // http://www.ctabustracker.com/bustime/api/v1/getroutes?key=LbihDNnA3P5WKjGJZfBEsAh4P


}
