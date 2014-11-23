function popupCtaBus(){

    this.generatePopupContent = function(data){
        var iconObject = new iconsApp();
        var icon = "<p><img src=\"" + iconObject.getIcon("cta_bus") + "\"/></p>"
        var route  = "<h3><b>Route : </b>" + data.rt + "</h3>";
        var destination = "<h3><b>Destination : </b>" + data.des + "</h3>";

        return icon + creationDate;
    };

    var getPredictions = function(){
        getBusPrediction(data.vid,addPrediction);
    };

    var addPrediction = function(data){
        var result = data["bustime-response"].vehicle;
    }
}