function mapControls(container){
        var svg;
        var width = 450;
        var height = 155;
        var selectionWidth = width * 0.8;
        var zoomWidth = width * 0.1;
        var xScaleSelection;
        var yScaleZoom;
        var padding = 15;
        var iconSize = Math.min((height/2 - 2*padding),width - selectionWidth - padding);

        var imageObjects = [
            {
                text: "Street View",
                imagePath: "resources/images/streetview.jpg",
                class: "map-preview-tile",
                id: "street"
            },
            {
                text:"Satellite",
                imagePath:"resources/images/satellite.jpg",
                class: "map-preview-tile",
                id:"satellite"
            }
        ];

        var zoomObjects = [
            {
                iconPath: "resources/icons/icon-plus.svg",
                id: "icon-plus"
            },
            {
                iconPath:"resources/icons/icon-minus.svg",
                id:"icon-minus"
            }
        ];


        /******** Initializer  ******/

        var init = function(){

            xScaleSelection = d3 .  scale
                                    .linear()
                                    .domain([0,imageObjects.length])
                                    .range([0,selectionWidth]);

            yScaleZoom =  d3 	.scale
                                .linear()
                                .domain([0,2])
                                .range([0.1 * height, 0.9 * height]);

            svg = d3    .select(container)
                        .append("svg")
                        .attr("viewBox","0 0 " + width + " " + height)
                        .attr("preserveAspectRatio", "xMidYMid meet")
                        .attr("width", "100%")
                        .attr("height", "100%");

            // Draws rectangles around satellite previews
            svg .selectAll("rect")
                .data(imageObjects)
                .enter()
                .append("rect")
                .attr("class", function(d) {
                    return d.class;
                })
                .attr("id",function(d){return d.id + "-rectangle";})
                .attr("x", function(d,i){
                    return xScaleSelection(i) + padding;})
                .attr("y",padding + 18)
                .attr("width", selectionWidth/imageObjects.length - padding)
                .attr("height", 0.72 * (selectionWidth/imageObjects.length - padding));


            // Draws Images
            svg .selectAll("image")
                .data(imageObjects)
                .enter()
                .append("image")
                .attr("class","map-preview-tile")
                .attr("id",function(d){return d.id;})
                .attr("xlink:href", function(d){return d.imagePath;})
                .attr("x", function(d,i){
                    return xScaleSelection(i) + padding;})
                .attr("y",padding)
                .attr("width", selectionWidth/imageObjects.length - padding)
                .attr("height", height);

            // svg .selectAll("text")
            //     .data(imageObjects)
            //     .enter()
            //     .append("text")
            //     .attr("class","map-tile-label")
            //     .text( function(d) { return d.text })
            //     .attr("text-anchor", "start")
            //     .attr("x", function(d,i){
            //         return xScaleSelection(i) + padding + 10;})
            //     .attr("y", 3.5 * padding)
            //     .attr("pointer-events", "none");

            svg .selectAll()
                .data(zoomObjects)
                .enter()
                .append("image")
                .attr("id",function(d){return d.id;})
                .attr("xlink:href", function(d){return d.iconPath;})
                .attr("x", selectionWidth + padding)
                .attr("y", function(d,i){
                    return yScaleZoom(i) + padding})
                .attr("width", iconSize)
                .attr("height", iconSize);

        }();

    /**** jQuery *****/

    $(".map-preview-tile").click(function () {
        $(".map-preview-tile").removeClass("selected");
        $( this ).addClass("selected");
    });
}

