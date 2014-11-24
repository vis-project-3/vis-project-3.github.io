function popupSongKick(){

    this.generatePopupContent = function(data){
        var iconObject = new iconsApp();
        var icon = "<p><img src=\"" + iconObject.getIcon("songkick") + "\"/></p>"
        var eventName  = "<h3><b>Event Name : </b>" + data.name + "</h3>";
        var type = "<p>Event Type : <b>" + data.eventType + "</b></p>";
        var when = "<p>Available Docks : <b>" + data.start + "</b></p>";

        return icon + eventName + type + when ;
    }
}