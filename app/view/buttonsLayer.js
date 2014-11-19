function buttonsLayer(container, map, controllers){
    var svg;
    var svgBackdrop;
    var layer;
    var background = "#FFFFFF";
    var opacity = "0.65";
    var width = 350;
    var height = 600;
    var yScale;
    var padding = 7;
    var iconPadding;
    var buttonHeight;
    var iconSize;

    function addButtons(selection) {
        selection.attr("id", "layer");

        var height = 600, width = 350, padding = 7;

        var buttonObjects = controllers;

        var y = d3.scale.ordinal()
            .domain(d3.range(buttonObjects.length))
            .rangeBands([0, height]);

        buttonHeight = y.rangeBand() * 0.9;
        iconSize = 0.7 * buttonHeight;

        var svg = selection.append("svg")
            .attr("viewBox","0 0 " + width + " " + height)
            .attr("preserveAspectRatio", "xMidYMid meet")
            .attr("width", "100%")
            .attr("height", "100%");

        // Draws the buttons
        var button = svg.selectAll("g.button").data(buttonObjects);

        button.enter().append("g").attr("class", "button")
            .call(function(enter) {
                enter.attr("transform", function(d, i) {
                    return "translate(" + padding + "," + y(i) + ")";
                });
                enter.append("rect")
                .attr({
                    id: function(d) { return d.id ? d.id : "NULL"; },
                    width: width - 2 * padding,
                    height: buttonHeight
                });
                enter.append("text")
                .text( function(d) { return (d.get) ? d.get().label() : d.label })
                .attr({
                    x: 4 * padding + iconSize,
                    y: 0.6 * buttonHeight,
                    "pointer-events": "none"
                });
                enter.append("image")
                .attr({
                    "xlink:href": function(d) { return d.iconPath; },
                    x: 2 * padding,
                    y: 0.25 * buttonHeight,
                    width: iconSize, height: iconSize,
                    "pointer-events": "none"
                })
            })

        button.select("rect").on("click.toggle", function() {
            d3.select(this).classed("selected", function() {
                return ! d3.select(this).classed("selected");
            })
        })
    }

    var selection;
    this.getSelection = function() {
        return selection;
    }

    /******** Initializer  ******/

    var init = function(){

        var ButtonsControl = L.Control.extend({
            options: { position: 'topleft' },

            initialize: function (foo, options) {
                L.Util.setOptions(this, options);
            },

            onAdd: function(map) {
                var className = 'leaflet-control-layers leaflet-control-layers-expanded';

                var container = L.DomUtil.create('div', className);

                selection = d3.select(container).call(addButtons);

                return container;
            }
        });

        // TODO: Remove – dev only!!!!!
        map.addControl(new ButtonsControl());


    }();
}
