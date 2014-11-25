function rectToggle(map, customControl){

    var control = new customControl(callback, { position: 'bottomleft' });

    map.addControl( control );

    // var selection = d3.select(control._container);
    // var graphs;

    var dispatch = d3.dispatch("filterToggle", "deleteWaypoint", "addWaypoint");
    d3.rebind(this, dispatch, "on");

    window.filterBy = "path"

    this.getSelection = function() {
        return selection;
    };

    function callback(selection) {
        selection.style({ position: "absolute", left: "2vw" })
        var button = selection.append("div").style({ "text-align": "center", width: "20vw" }).selectAll("button")
            .data([{ label: "Filter Path", id: "path" }, { label: "Filter Area", id: "area" }]);
        button.enter().append("button")
            .attr({ width: "7vw", margin: "auto" })
            .text(function(d) { return d.label })
            .on("click", function(d) {
                window.filterBy = d.id;
                dispatch.filterToggle();
            });

        selection.select("div").append("button")
            .attr({ width: "7vw", margin: "auto" })
            .text("Add Waypoint")
            .on("click", function(e) {
                d3.event.stopPropagation();
                dispatch.addWaypoint(e);
            });

        selection.select("div").append("button")
            .attr({ width: "7vw", margin: "auto" })
            .text("Delete Last Waypoint")
            .on("click", function() {
                dispatch.deleteWaypoint();
            });

        selection.selectAll("button").style({ "font-size": "3vh" })
    }



}

function translate(x, y) { return "translate(" + x + "," + y + ")" }
