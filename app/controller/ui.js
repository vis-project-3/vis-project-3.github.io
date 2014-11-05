function UI(){
}


UI.prototype.createSVG = function (container){
    var svg = d3    .select(container)
                    .append("svg")
                    .attr("viewBox","0 0 " + 500 + " " + 500)
                    .attr("preserveAspectRatio", "xMidYMid meet")
                    .attr("width", "100%")
                    .attr("height", "100%");
}

UI.prototype.changeOpacity = function(container, opacity){
}