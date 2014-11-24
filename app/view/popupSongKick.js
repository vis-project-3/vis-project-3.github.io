function popupSongKick(){

    this.generatePopupContent = function(data){
        var iconObject = new iconsApp();
        var icon = "<p><img src=\"" + iconObject.getIcon("songkick") + "\"/></p>"
        var eventName  = "<h3><b>Event Name : </b>" + data.name + "</h3>";
        var type = "<p><b>Event Type : </b>" + data.eventType + "</p>";
        var when = "<p><b>When : </b>" + data.start + "</p>";

        return icon + eventName + type + when ;
    }
}