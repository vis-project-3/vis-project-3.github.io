function buttonsLayer(container){
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

    var buttonObjects = [
        {
            text:"Bus Station",
            iconPath:"resources/icons/icon-bus-station.svg",
            iconHoverPath:"",
            id: "bus-layer"
        },
        {
            text:"CTA Buses",
            iconPath:"resources/icons/icon-bus.svg",
            iconHoverPath:"",
            id: "live-bus-layer"
        },
        {
            text:"Divvy Station",
            iconPath:"resources/icons/icon-divvy.svg",
            iconHoverPath:"",
            id: "divvy-layer"
        },
        {
            text:"Crime Reports",
            iconPath:"resources/icons/icon-crime.svg",
            iconHoverPath:"",
            id: "crimes-layer"
        },
        {
            text:"Street Light Out",
            iconPath:"resources/icons/icon-light.svg",
            iconHoverPath:"",
            id: "lights-layer"
        },
        {
            text:"Potholes",
            iconPath:"resources/icons/icon-pot-hole.svg",
            iconHoverPath:"",
            id: "potholes-layer"
        },
        {
            text:"Abandoned Cars",
            iconPath:"resources/icons/icon-abandoned-car.svg",
            iconHoverPath:"",
            id: "vehicles-layer"
        }
    ];

    /******** Initializer  ******/

    var init = function(){

        



        // These variables set the height of each button and use it to scale the size of each icon to fit within the button
        // TODO: Just use an ordinal scale instead.
        buttonHeight = ( buttonObjects.length > 0 ) ? ( ( height - ( buttonObjects.length + 1 ) * padding ) / ( buttonObjects.length ) ) : ( height - 2 * padding );
        iconSize = 0.7 * buttonHeight;

        yScale =  d3 	.scale
                        .linear()
                        .domain([0, buttonObjects.length])
                        .range([0,height - padding]);

        svg = d3    .select(container)
                    .append("svg")
                    .attr("viewBox","0 0 " + width + " " + height)
                    .attr("preserveAspectRatio", "xMidYMid meet")
                    .attr("width", "100%")
                    .attr("height", "100%")
                    // .style("background-color" , background);

        // TODO: Switch to rect.
        svg     .append("polygon")
                .attr("points", "0,0 " + width + ",0 " + width + "," + height + " 0," + height)
                .attr("fill", background)
                .attr("opacity", opacity)
                .attr("pointer-events", "none");

        layer = svg.append("g");

        // Draws the buttons
        var button = layer.selectAll("g.button").data(buttonObjects);

        button.enter().append("g").attr("class", "button")
            .call(function(enter) {
                enter.attr("transform", function(d, i) {
                    return "translate(" + padding + "," + yScale(i) + padding + ")";
                });
                enter.append("rect")
                    .attr({
                        id: function(d) { return d.id; },
                        width: width - 2 * padding,
                        height: buttonHeight
                    });
                enter.append("text")
                    .text( function(d) { return d.text })
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
                console.log(d3.select(this).classed("selected"));
                return ! d3.select(this).classed("selected");
            })
        })

    }();
}
