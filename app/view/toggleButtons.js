function toggleButtons(container){
    var transitionTime = 500;
    var svg;
    var width = 1500;
    var height = 39;
    var buttonWidth;
    var xScale;
    var padding = 5;
    var lastTextWidth = 0;
    var currentX = 0;
    var rightMargin = 10;
    var radius = 3;

    var buttonObjects = [
        {
            text:"All",
            id : "toggle_all"
        },
        {
            text:"Layer Selection",
            id : "toggle_layer"
        },
        {
            text:"Map Controls",
            id : "toggle_mapselection"
        },
        {
            text:"Weather Box",
            id : "toggle_weather"
        },
        {
            text:"Graphs",
            id : "toggle_graphs"
        },
        {
            text:"Notification Center",
            id : "toggle_notifications"
        }
    ];

    /******** Initializer  ******/

    var init = function() {

        // These variables set the height of each button and use it to scale the size of each icon to fit within the button

        buttonWidth = (0.5 * width)/buttonObjects.length;

        xScale = d3.scale
            .linear()
            .domain([0, buttonObjects.length])
            .range([padding, 0.5 * width - padding]);

        svg = d3.select(container)
                .append("svg")
                .attr("viewBox", "0 0 " + width + " " + height)
                .attr("preserveAspectRatio", "xMidYMid meet")
                .attr("width", "100%")
                .attr("height", "100%")

        // Draws the button rectangle
        svg .selectAll("rect")
            .data(buttonObjects)
            .enter()
            .append("rect")
            .attr("id", function (d) {
                return d.id})
            .attr("x", function (d, i) {
                return xScale(i) + padding;})
            .attr("y",padding)
            .attr("width", buttonWidth - 2 * padding)
            .attr("height", 0.6 * height)
            .attr("rx", radius)
            .attr("ry", radius);


        svg .selectAll("text")
            .data(buttonObjects)
            .enter()
            .append("text")
            .attr("text-anchor","middle")
            .attr("class", "UI-toggle-button")
            .text( function(d) { return d.text })
            .attr("x", function (d, i) {
                return xScale(i) + 0.5 * buttonWidth;})
            .attr("y", height/2)
            .attr("pointer-events", "none");


    }();






    /****** jQuery ******/

    $("#toggle_all").click(function () {
        $("#weather").toggle(transitionTime);
        $("#layer").toggle(transitionTime);
        $("#mapcontrol").toggle(transitionTime);
        $("#notifications").toggle(transitionTime);
        $("#graphs").toggle(transitionTime);
    });

    $("#toggle_weather").click(function () {
        $("#weather").toggle(transitionTime);
    });

    $("#toggle_notifications").click(function () {
        $("#notifications").toggle(transitionTime);
    });

    $("#toggle_layer").click(function () {
        $("#layer").toggle(transitionTime);
    });

    $("#toggle_mapselection").click(function () {
        $("#mapcontrol").toggle(transitionTime);
    });

    $("#toggle_graphs").click(function () {
        $("#graphs").toggle(transitionTime);
    });

}