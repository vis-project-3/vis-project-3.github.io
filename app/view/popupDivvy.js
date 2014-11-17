function popupDivvy(){

    this.generatePopupContent = function(data){
        var iconObject = new iconsApp();
        var icon = "<p><img src=\"" + iconObject.getIcon("divvy") + "\"/></p>"
        var stationName  = "<h3><b>Station Name : </b>" + data.stationName + "</h3>";
        var bikes = "<p>Available Bikes : <b>" + data.availableBikes + "</b></p>";
        var docks = "<p>Available Docks : <b>" + data.availableDocks + "</b></p>";

        return icon + stationName + bikes + docks ;
    }
}