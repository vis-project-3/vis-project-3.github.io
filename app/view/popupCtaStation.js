function popupPotholes(){

    this.generatePopupContent = function(data){
        var iconObject = new iconsApp();
        var icon = "<p><img src=\"" + iconObject.getIcon("cta_station") + "\"/></p>"
        var stationName  = "<h3><b>Station Name : </b>" + data.stpnm + "</h3>";


        return icon + creationDate;
    }

    var getPredictions = function(){
        getStopPrediction(data.stpid,addPrediction);
    }

    var addPrediction = function(data){
        var result = data["bustime-response"].prd;

    }
}