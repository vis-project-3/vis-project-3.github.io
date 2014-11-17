function popupVehicles(){

    this.generatePopupContent = function(data){
        var iconObject = new iconsApp();
        var icon = "<p><img src=\"" + iconObject.getIcon("vehicle") + "\"/></p>"
        var creationDate  = "<h3><b>Signaled on : </b>" + data.creation_date + "</h3>";

        return icon + creationDate;
    }
}