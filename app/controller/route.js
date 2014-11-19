
function Route(){
    var r = 10;

    var iconHtml = d3.select(new DocumentFragment())
    .append("div")
    .call(function(div) {
        div.append("svg").attr({ width: r, height: r})
        .append("circle").attr({ r: r / 2, cy: r / 2, cx: r / 2 });
    })
    .node().innerHTML;

    var myIcon = L.divIcon({
        className: 'my-div-icon',
        html: iconHtml,
        size: r
    });
}
