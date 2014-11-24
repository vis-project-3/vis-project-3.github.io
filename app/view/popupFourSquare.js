function popupFourSquare(){

    this.generatePopupContent = function(data){
        var iconObject = new iconsApp();
        var icon = "<p><img src=\"" + iconObject.getIcon("foursquare") + "\"/></p>"
        var name  = "<h3><b>Name : </b>" + data.name + "</h3><br>";
        var kind = "<h3><b>Kind : </b>" + data.typeOfVenue + "</h3><br>";

        return icon + name + kind;
    }
}