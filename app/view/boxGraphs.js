function boxGraphs(container){
    var svg;
    var layer;
    var background = "#FFFFFF";
    var opacity = "0.65";
    var width = 500;
    var height = 600;
    var yScale;
    var padding = 7;
    var iconPadding;
    var buttonHeight;
    var iconSize;

    var graphObjects = [
        {
            iconPath:"resources/images/graph-placeholder.svg",
        }
    ];

    /******** Initializer  ******/

    var init = function(){

        svg = d3    .select(container)
                    .append("svg")
                    .attr("viewBox","0 0 " + width + " " + height)
                    .attr("preserveAspectRatio", "xMidYMid meet")
                    .attr("width", "100%")
                    .attr("height", "100%")
                    // .style("background-color" , background);

        svg .selectAll("image")
            .data(graphObjects)
            .enter()
            .append("image")
            .attr("xlink:href", function(d){
                return d.iconPath;
            })
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", width)
            .attr("height", height);

        

    }();
}