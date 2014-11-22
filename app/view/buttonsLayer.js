function buttonsLayer(map, controllers, customControl){

    var control = new customControl(addButtons);
    map.addControl( control );

    var selection = d3.select(control._container);
    
    this.getSelection = function() {
        return selection;
    };

    function addButtons(selection) {
        selection.attr("id", "layer");

        var height = 600, width = 350, padding = 7;

        var buttonObjects = controllers;

        var y = d3.scale.ordinal()
            .domain(d3.range(controllers.length))
            .rangeBands([0, height]);

        buttonHeight = y.rangeBand() * 0.9;
        iconSize = 0.7 * buttonHeight;

        var svg = selection.append("svg")
            .attr({
                viewBox: "0 0 " + width + " " + height,
                preserveAspectRatio: "xMidYMid meet",
                width: "100%", height: "100%"
            });

        var button = svg.selectAll("g.button").data(controllers);

        var enter = button.enter()
            .append("g").attr("class", "button")
            .attr("transform", function(d, i) {
                return "translate(" + padding + "," + y(i) + ")";
            });

        enter.append("rect")
            .attr({
                id: function(d) { return d.id(); },
                width: width - 2 * padding,
                height: buttonHeight
            });

        enter.append("text")
            .text( function(d) { return d.label(); })
            .attr({
                x: 4 * padding + iconSize,
                y: 0.6 * buttonHeight,
                "pointer-events": "none"
            });

        enter.append("image")
            .attr({
                "xlink:href": function(d) { return d.iconPath(); },
                x: 2 * padding,
                y: 0.25 * buttonHeight,
                width: iconSize, height: iconSize,
                "pointer-events": "none"
            });

        button.select("rect").on("click.toggle", function() {
            d3.select(this).classed("selected", function() {
                return ! d3.select(this).classed("selected");
            })
        })
    }

}
