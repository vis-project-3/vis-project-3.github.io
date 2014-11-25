function drawCharts(container, map, graphControllers, customControl){

    var width = 1000, height = 300, margin = {top: 120, bottom: 30, left: 15, right: 15 };

    var routeFill = "#E74C3C";

    var control = new customControl(addGraphs, { position: 'topright' });

    map.addControl( control );

    var selection = d3.select(control._container);
    var graphs;

    this.getSelection = function() {
        return selection;
    };

    function addGraphs(selection) {
        selection.style({
            width: "30vw",
            height: "50vh",
            top: "25vh"
        })
        .attr("id", "charts")

        var graphTitles = [
            // { text: "Along Your Route", imagePath: "", id: "local" },
            { text: "Chicago Total", imagePath: "resources/icons/icon-chicago-flag.svg", id: "chicago" }
        ]

        var svg = selection.selectAll("svg").data(graphTitles);
        svg.enter().append("svg")
            .attr({
                id: function(d) { return d.id },
                viewBox: "0 0 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom),
                preserveAspectRatio: "xMidYMid meet",
                width: "100%", height: "100%"
            });

        svg.append("g").attr("class", "title")
            .attr({ transform: translate(0, margin.top - 50) })
            .append("text").text(function(d) { return d.text })
            .style({ "font-size": "4vh" })

        svg.append("g")
            .attr({ transform: translate(width, margin.top - 50) })
            .append("text").text("Along This Route")
            .attr({ "text-anchor": "end" })
            .style({ fill: routeFill, "font-size": "4vh" })

        svg.append("g").attr("class", "barchart")
            .attr({ transform: translate(margin.left, margin.top)});

        var localSvg = svg.select("#local"),
            chicagoSvg = svg.select("#chicago");

        graphs = selection;
    }

    var dispatch = d3.dispatch("dataUpdated", "requestComplete", "newData");

    var data = graphControllers.map(function(controller) {
        return { name: controller.name(), city: 0, route: 0, controller: controller };
    });

    // dispatch

    var requests = data.map(function(obj) {
        var getQuery = obj.controller.query()();
        var key = obj.controller.layer().getKey();

        getQuery.addParam("$select=count(" + key + ")");

        return d3.json(getQuery())
            .on("load", function(d) {
                obj.city = parseInt(d3.values(d[0])[0], 10);
                dispatch.requestComplete();
            })
            .get();
    })

    dispatch.on("requestComplete", function() {
        requests.pop();
        if (requests.length === 0) dispatch.dataUpdated(data);
    })

    data.forEach(function(obj) {
        obj.controller.on("markersUpdated", function() {
            obj.route = obj.controller.getActiveMarkersCount();
            dispatch.newData(data);
        })
    })

    dispatch.on("newData", function(data) {
        var max = d3.max(data, function(d) { return d.city });
        var x = d3.scale.log()
            .domain([1, max])
            .range([width, 0])
            .clamp(true);

        var y = d3.scale.ordinal()
            .domain(d3.range(data.length))
            .rangeBands([0, height]);

        var axis = d3.svg.axis().scale(x).orient("top")
            .ticks(5, ",.1s");

        // console.log("UPDATED", data)
        var barchart = graphs.selectAll("svg").select("g.barchart");
        var axisG = barchart.selectAll("g.axis").data([1]);
        axisG.enter().append("g").attr("class", "axis");
        axisG.call(axis);
        var bar = barchart.selectAll("g.bar").data(data);
        bar.enter().append("g").attr("class", "bar")
            .attr("transform", function(d, i) { return translate(0, y(i)) })
            .call(function(barG) {
                var cityG = barG.append("g").attr("class", "city");
                cityG.append("line").attr({ y2: y.rangeBand() });
                cityG.append("text").attr({ y: y.rangeBand() / 2, x: 10 })

                var routeG = barG.append("g").attr("class", "route");
                routeG.append("rect").attr({ height: y.rangeBand() })
                    .style({ fill: "#E74C3C", "fill-opacity": 0.8 });

                routeG.append("image")
                    .attr("xlink:href", function(d) { return d.controller.iconPath(); })
                    .attr("width", y.rangeBand() - 20)
                    .attr("height", y.rangeBand() - 20)
                    .attr("y", 10);

                routeG.append("text")
                    .attr({ y: y.rangeBand() / 2, "text-anchor": "left" })
                    .style({
                        fill: "#ECF0F1",
                        "font-family": "'Open Sans', Sans-serif"
                    })
            })
        bar.selectAll("text").attr({ dy: 10 })
        bar.select("g.city").attr("transform", function(d) { return translate(x(d.city), 0); });
        bar.select("g.city text").text(function(d) { return d.city });
        bar.select("g.route rect").attr({
            x: function(d) { return x(d.route) - 10 },
            width: function(d) { return Math.abs(x(d.route) - x(0)) + 10 }
        })
        bar.select("g.route image")
            .attr({ x: function(d) { return x(d.route) - y.rangeBand() }});
        bar.select("g.route text")
            .text(function(d) { return d.route })
            .attr({ x: function(d) { return x(d.route); }})
    })


}

function translate(x, y) { return "translate(" + x + "," + y + ")" }
