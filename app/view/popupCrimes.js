function popupCrimes(){

    this.generatePopupContent = function(data){
        var iconObject = new iconsApp();
        var icon = "<p><img src=\"" + iconObject.getIcon("crime") + "\"/></p>"
        var creationDate  = "<h3><b>Happened on : </b>" + data.date + "</h3>";

        return icon + creationDate;
    }
}