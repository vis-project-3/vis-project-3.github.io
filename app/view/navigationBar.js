function navigationBar(container){
    var transitionTime = 500;
    var svg;
    var width = 1000;
    var height = 39;
    var buttonWidth;
    var arrowWidth;
    var xScale;
    var padding = 20;
    var lastTextWidth = 0;
    var currentX = 0;
    var rightMargin = 10;
    var radius = 3;

    var destinations = [
        {
            text:"Start",
            class: "start-location",
            id : "start_location"
        },
        {
            text:"End",
            class: "end-location",
            id : "end_location"
        }
    ];

    /******** Initializer  ******/

    var init = function() {

        // These variables set the height of each button and use it to scale the size of each icon to fit within the button

        buttonWidth = width / ( destinations.length );
        arrowWidth = Math.floor( 0.05 * buttonWidth );

        xScale = d3.scale
            .linear()
            .domain([0, destinations.length])
            .range([0, width]);

        svg = d3.select(container)
                .append("svg")
                .attr("viewBox", "0 0 " + width + " " + height)
                .attr("preserveAspectRatio", "xMidYMid meet")
                .attr("width", "100%")
                .attr("height", "100%")

        // Draws the rectangles in the navigation bar
        svg .selectAll("rect")
            .data(destinations)
            .enter()
            .append("rect")
            .attr("id", function (d) {
                return d.id})
            .attr("class", function(d) {
                return d.class;
            })
            .attr("x", function (d, i) {
                return xScale(i);
            })
            .attr("y", 0)
            .attr("width", buttonWidth)
            .attr("height", height);

        svg .append("polygon")
            .attr("points", (buttonWidth-1) + ",0 " + (buttonWidth+arrowWidth) + "," + (0.5*height) + " " + (buttonWidth-1) + "," + height)
            .attr("class", destinations[0].class);


    }();


    /****** jQuery ******/


}