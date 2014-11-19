
function Route(){
    var dispatch = d3.dispatch("routesFound");

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

    var route = L.Routing.control({
        plan: plan,
        geocoder: L.Control.Geocoder.nominatim(),
        fitSelectedRoutes: false,
        show: false
    }).on("routesfound", function(e) {
        dispatch.routesFound.apply(this, arguments);
    });

    this.getRouteControl = function() { return route; };

    // this.setWaypoints = function(array) {
    //     route.setWaypoints(array);
    // }

    this.setWaypoints = route.setWaypoints.bind(route);

}
