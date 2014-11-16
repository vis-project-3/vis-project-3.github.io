function divvyPopUp(){

    this.generatePopUpContent = function(data){
        var iconObject = new appIcons();
        var icon = "<p><img src=\"" + iconObject.getIcon("divvy") + "\"/></p>"
        var stationName  = "<h3><b>Station Name : </b>" + data.stationName + "</h3>";
        var docks = "<p>Available Bikes : <b>" + data.availableBikes + "</b></p>";

        return icon + stationName + docks ;
    }
}