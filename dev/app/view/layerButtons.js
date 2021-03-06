function layerButtons(container){
    var svg;
    var layer;
    var background = "rgba(255,255,255,0.15)"
    var width = 350;
    var height = 500;
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
        },
        {
            text:"Abandoned Cars",
            iconPath:"resources/icons/icon-abandoned-car.svg",
            iconHoverPath:"",
            id:"icon-abandoned-car"
        }
    ];

    /******** Initializer  ******/

    var init = function(){

        // These variables set the height of each button and use it to scale the size of each icon to fit within the button
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
                    .style("background-color" , background);

        layer = svg .append("g");

        // Draws the button rectangle
        svg     .selectAll("rect")
                .data(buttonObjects)
                .enter()
                .append("rect")
                .attr("x",padding)
                .attr("y", function(d,i){
                    return yScale(i) + padding;})
                .attr("width", width - 2 * padding)
                .attr("height", buttonHeight);

        svg     .selectAll("text")
                .data(buttonObjects)
                .enter()
                .append("text")
                .text( function(d) { return d.text })
                // .attr("text-anchor", "end")
                .attr("x", 4 * padding + iconSize)
                .attr("y", function(d,i) {
                    return yScale(i) + padding + 0.6 * buttonHeight;
                })
                .attr("pointer-events", "none");


        // Places the icons
        svg     .selectAll("image")
                .data(buttonObjects)
                .enter()
                .append("image")
                .attr("xlink:href", function(d){return d.iconPath;})
                .attr("x", 2*padding)
                // .attr("y",function(d,i){
                //     return yScale(i) + 2*padding;})
                .attr("y",function(d,i){
                    return yScale(i) + 0.25 * buttonHeight;})
                // .attr("width", iconSize - padding)
                // .attr("height",iconSize - padding)
                .attr("width", iconSize)
                .attr("height", iconSize)
                .attr("pointer-events", "none");


        // Highlight rectangles when they've been selected
        $(container + " svg rect").click(function () {

            if ( $( this ).attr("class") == "selected") {
                this.classList.remove("selected");
            }
            else {
                this.classList.add("selected");
            }

        })  

    }();
}