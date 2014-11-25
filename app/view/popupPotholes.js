function popupPotholes(){

    this.generatePopupContent = function(data){
        d3
        var iconObject = new iconsApp();
        var icon = "<p><img width=\"40\" height=\"40\" src=\"" + iconObject.getIcon("pothole") + "\"/></p>";
        var format = d3.time.format("%x");
        var creationDate  = "<h3><b>Reported on : </b>" + format(new Date(data.creation_date)) + "</h3>";

        return icon + creationDate;
    }
}
