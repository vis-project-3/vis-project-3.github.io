function layerButtons(container){
    var svg;
    var layer;
    var background = "rgba(255,255,255,0.66)"
    var width = 600;
    var height = 600;
    var yScale;
    var padding = 10;
    var iconPadding;
    var iconSize;
    var rx = 15;
    var ry = 15;

    var buttonObjects = [
        {
            text:"Bus Station",
            iconPath:"resources/icons/icon-bus-station.svg",
            iconHoverPath:"",
            id:"icon-bus"
        },
        {
            text:"Divvy Station",
            iconPath:"resources/icons/icon-divvy.svg",
            iconHoverPath:"",
            id:"icon-divvy"
        },
        {
            text:"Crime Reports",
            iconPath:"resources/icons/icon-crime.svg",
            iconHoverPath:"",
            id:"icon-crime"
        },
        {
            text:"Street Light Out",
            iconPath:"resources/icons/icon-light.svg",
            iconHoverPath:"",
            id:"icon-light"
        },
        {
            text:"Potholes",
            iconPath:"resources/icons/icon-pot-hole.svg",
            iconHoverPath:"",
            id:"icon-pothole"
        }
    ];

    /******** Initializer  ******/

    var init = function(){



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
                    .style("background-color" , background);

        layer = svg .append("g");

        iconSize = height/buttonObjects.length;

        //Draws the button rectangle
        svg     .selectAll("rect")
                .data(buttonObjects)
                .enter()
                .append("rect")
                .attr("x",padding)
                .attr("y", function(d,i){
                    return yScale(i) + padding;})
                .attr("width", width - 2*padding)
                .attr("height",height/buttonObjects.length-padding)
                .attr("rx",rx)
                .attr("ry",ry)
                .style("fill","#FFFFFF")

        svg .selectAll()
            .data(buttonObjects)
            .enter()
            .append("rect")
            .attr("x",2 * padding)
            .attr("y", function(d,i){
                return yScale(i) + 2*padding;})
            .attr("width", iconSize)
            .attr("height",iconSize - 3*padding)
            .attr("rx",rx)
            .attr("ry",ry)
            .style("fill","orange")

        svg     .selectAll("image")
                .data(buttonObjects)
                .enter()
                .append("image")
                .attr("xlink:href", function(d){return d.iconPath;})
                .attr("x", 2*padding)
                .attr("y",function(d,i){
                    return yScale(i) + 2*padding;})
                .attr("width", iconSize - padding)
                .attr("height",iconSize - padding)
    }();
}