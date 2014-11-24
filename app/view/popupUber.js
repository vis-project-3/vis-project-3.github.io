function popupUber(){

    this.generatePopupContent = function(data){
        var iconObject = new iconsApp();

        var selected = d3.values(data.data)
        console.log(selected);

        var icon = "<p><img src=\"" + iconObject.getIcon("uber") + "\"/></p>"
        var productName  = "<h3><b>Product : </b>" + selected[0].display_name + "</h3>";
        var timeEstimate = "<p>Time : <b>" + selected[0].timeEstimate + "</b></p>";
        var priceEstimate = "<p>Estimated Price : <b>" + selected[0].estimate + "</b></p>";

        return icon + productName + timeEstimate + priceEstimate ;
    }
}