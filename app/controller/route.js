
function Route(){

    /******* SETUP *********/
    var r = 10;

    var iconHtml = d3.select(new DocumentFragment())
        .append("div")
        .call(function(div) {
            div.append("svg").attr({ width: r, height: r})
            .append("circle").attr({ r: r / 2, cy: r / 2, cx: r / 2 });
        })
        .node().innerHTML;

    var myIcon = L.divIcon({
        className: 'route-waypoint-icon',
        html: iconHtml,
        size: r
    });

    var plan = L.Routing.plan(null, {
        waypointIcon: function(i, n) { return myIcon; },
        geocoder: L.Control.Geocoder.nominatim()
    })
    // .on("waypointschanged", function(e) {
    //     console.log(e);
    // })

    var route = L.Routing.control({
        plan: plan,
        geocoder: L.Control.Geocoder.nominatim(),
        fitSelectedRoutes: false,
        show: false,
        lineOptions: {
            styles: [
                {color: 'black', opacity: 0.15, weight: 8},
                {color: 'white', opacity: 0.8, weight: 5},
                {color: 'black', opacity: 0.9, weight: 2}
            ]
        }
    });

    /******** EVENTS ********/

    var dispatch = d3.dispatch(
        "routesFound", "boundsUpdated", "routeCoordinatesUpdated"
    );
    d3.rebind(this, dispatch, "on");

    route.on("routesfound", function(e) {
        dispatch.routesFound.apply(this, arguments);
    });

    var bounds, coords;
    dispatch.on("routesFound", function(e) {
        coords = e.routes[0].coordinates;
        bounds = getBounds(coords);
        dispatch.boundsUpdated(bounds, coords);
    });

    this.getCoords = function() { return coords; };

    /****** PRIVATE METHODS ******/

    function getBounds(array) {
        return L.polyline(array).getBounds();
    }

    /****** PUBLIC METHODS ******/

    this.addTo = function() {
        route.addTo.apply(route, arguments);
        d3.select(".leaflet-routing-container").remove();
    }

    this.setWaypoints = route.setWaypoints.bind(route);



}
