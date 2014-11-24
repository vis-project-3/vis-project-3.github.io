function rectToggle(map, customControl){

    var control = new customControl(callback, { position: 'bottomleft' });

    map.addControl( control );

    // var selection = d3.select(control._container);
    // var graphs;

    var dispatch = d3.dispatch("filterToggle");
    d3.rebind(this, dispatch, "on");

    window.filterBy = "path"

    this.getSelection = function() {
        return selection;
    };

    function callback(selection) {
        selection.style({ position: "absolute", left: "10vw", width: "30vw" })
        var button = selection.selectAll("button")
            .data([{ label: "Filter Path", id: "path" }, { label: "Filter Area", id: "area" }]);
        button.enter().append("button")
            .text(function(d) { return d.label })
            .on("click", function(d) {
                window.filterBy = d.id;
                dispatch.filterToggle();
            })
    }


}

function translate(x, y) { return "translate(" + x + "," + y + ")" }
