function drawCharts(container){
        var svg;
        var width = 450;
        var height = 600;
        var opacity = "0.65";
        var localChartX, localChartY;
        var chicagoChartX, chicagoChartY;
        var padding = 15;
        var headerHeight = 35;
        var barHeight;
        var iconSize;
        var maxRange;

        var graphTitles = [
            {
                text: "Along Your Route",
                imagePath: ""
            },
            {
                text: "Chicago",
                imagePath: "resources/icons/icon-chicago-flag.svg"
            }
        ]

        var localData = [
            {
                value: "13",
                imagePath: "resources/icons/icon-light.svg",
                class: "lights-out",
                id: "selected-lights-out"
            },
            {
                value: "15",
                imagePath: "resources/icons/icon-pot-hole.svg",
                class: "pot-hole",
                id: "selected-pot-hole"
            },
                        {
                value: "7",
                imagePath: "resources/icons/icon-crime.svg",
                class: "crime",
                id: "selected-crime"
            },
            {
                value: "4",
                imagePath: "resources/icons/icon-abandoned-car.svg",
                class: "abandoned-car",
                id: "selected-abandoned-car"
            }
        ];

        var chicagoData = [
            {
                value: "54",
                imagePath: "resources/icons/icon-light.svg",
                class: "lights-out",
                id: "chicago-lights-out"
            },
            {
                value: "42",
                imagePath: "resources/icons/icon-pot-hole.svg",
                class: "pot-hole",
                id: "chicago-pot-hole"
            },
                        {
                value: "46",
                imagePath: "resources/icons/icon-crime.svg",
                class: "crime",
                id: "chicago-crime"
            },
            {
                value: "35",
                imagePath: "resources/icons/icon-abandoned-car.svg",
                class: "abandoned-car",
                id: "chicago-abandoned-car"
            }
        ];


        /******** Initializer  ******/

        var init = function(){

            // Max value of the DV
            maxRange = computeMaxRange();
            barHeight = ((( height / 2 - ( 2 * padding + headerHeight)) / localData.length) - padding );

            iconSize = Math.floor( 0.8 * barHeight );

            // Set the vertical scale
            localChartY = d3.   scale
                                .linear()
                                .domain([0, localData.length])
                                .range([ 2 * padding + headerHeight, ( height / 2 ) - padding]);

            chicagoChartY = d3    .scale
                                .linear()
                                .domain([0, chicagoData.length])
                                .range([ 2 * padding + headerHeight, ( height / 2 ) - padding]);
                                // .domain([height/2 + headerHeight + 2 * padding, height - padding]);

            // yScaleZoom =  d3 	.scale
            //                     .linear()
            //                     .domain([0,2])
            //                     .range([0.1 * height, 0.9 * height]);

            svg = d3    .select(container)
                        .append("svg")
                        .attr("viewBox","0 0 " + width + " " + height)
                        .attr("preserveAspectRatio", "xMidYMid meet")
                        .attr("width", "100%")
                        .attr("height", "100%");

            svg     .append("polygon")
                    .attr("points", "0," + (height/2) + " " + width + "," + (height/2) + " " + width + "," + height + " 0," + height)
                    .attr("opacity", opacity)
                    .attr("pointer-events", "none");

            svg .selectAll(".local-rect")
                .data(localData)
                .enter()
                .append("rect")
                .attr("class", function(d) {
                    return "local-rect " + d.class;
                })
                .attr("id",function(d){return d.id;})
                .attr("x", function(d,i){
                    return padding;})
                .attr("y", function(d, i){
                    return localChartY(i);
                })
                .attr("width", function(d) {
                    return barWidth(d.value);
                })
                .attr("height",  (( height / 2 - ( 2 * padding + headerHeight)) / localData.length) - padding )
                .attr("fill", "#E74C3C");

            svg .selectAll(".chicago-rect")
                .data(chicagoData)
                .enter()
                .append("rect")
                .attr("class", function(d) {
                    return "local-rect " + d.class;
                })
                .attr("id",function(d){return d.id;})
                .attr("x", function(d,i){
                    return padding;})
                .attr("y", function(d, i) {
                    return ( height / 2 ) + chicagoChartY(i);
                })
                .attr("width", function(d) {
                    return barWidth(d.value)})
                .attr("height", (( height / 2 - ( 2 * padding + headerHeight)) / localData.length) - padding)
                .attr("fill", "#E74C3C");

            // Draws Images
            svg .selectAll("image.local")
                .data(localData)
                .enter()
                .append("image")
                .attr("class", function(d) { return "local-icon " + d.class})
                .attr("xlink:href", function(d){return d.imagePath;})
                .attr("x", function(d) {
                    return 2 * padding + barWidth(d.value);
                })
                .attr("y", function(d, i) {
                    return localChartY(i);
                })
                .attr("width", iconSize)
                .attr("height", iconSize);

            svg .selectAll("image.chicago")
                .data(chicagoData)
                .enter()
                .append("image")
                .attr("class", function(d) { return "local-icon " + d.class})
                .attr("xlink:href", function(d){return d.imagePath;})
                .attr("x", function(d) {
                    return 2 * padding + barWidth(d.value);
                })
                .attr("y", function(d, i) {
                    return ( height / 2 ) + chicagoChartY(i);
                })
                .attr("width", iconSize)
                .attr("height", iconSize);

            svg .selectAll("text.local-text")
                .data(localData)
                .enter()
                .append("text")
                .attr("class", function(d) { return "local-text " + d.class})
                .text( function(d) { return d.value })
                .attr("text-anchor", "end")
                .attr("x", function(d) {
                    return barWidth(d.value) + 0.5 * padding;
                })
                .attr("y", function(d, i) {
                    return localChartY(i) + 0.6 * barHeight;
                })
                .attr("fill", "#ECF0F1")
                .attr("pointer-events", "none");

            svg .selectAll("text.chicago-text")
                .data(chicagoData)
                .enter()
                .append("text")
                .attr("class", function(d) { return "chicago-text " + d.class})
                .text( function(d) { return d.value })
                .attr("text-anchor", "end")
                .attr("x", function(d) {
                    return barWidth(d.value) + 0.5 * padding;
                })
                .attr("y", function(d, i) {
                    return ( height / 2 ) + localChartY(i) + 0.6 * barHeight;
                })
                .attr("fill", "#ECF0F1")
                .attr("pointer-events", "none");

            svg .selectAll("text.graph-header")
                .data(graphTitles)
                .enter()
                .append("text")
                .attr("class", "graph-header")
                .text( function(d) { return d.text; })
                .attr("text-anchor", "left")
                .attr("x", 2 * padding)
                .attr("y", function(d,i) {
                    return padding + 0.6 * headerHeight + i * ( height / (graphTitles.length));
                });

            svg .append("image")
                .attr("xlink:href", "resources/icons/icon-chicago-flag.svg")
                .attr("x", function(d) {
                    return 0.85 * width;
                })
                .attr("y", function(d, i) {
                    return ( height / 2 ) + 0.25 * headerHeight;
                })
                .attr("width", iconSize)
                .attr("height", iconSize);


        }();

    function computeMaxRange() {
        var tempMax = 0;
        for (var i=0; i<localData.length; i++)
        {
            if (localData[i].value > tempMax){
                tempMax = +localData[i].value;
            }
            else {
                continue;
            }
        }

        for (var i=0; i<chicagoData.length; i++)
        {
            if (chicagoData[i].value > tempMax)
            {
                tempMax = +chicagoData[i].value;
            }
            else {
                continue;
            }
        }

        return tempMax;
    }

    function barWidth(value) {
        var ratio = ( +value / +maxRange);

        return Math.floor( ratio * ( width - 3 * padding - iconSize ) );
    }

    /**** jQuery *****/

}

