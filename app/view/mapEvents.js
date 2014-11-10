function mapEvents(mapObject){
    var map;

    //Changes Map Kind
    this.changeToMap = function(){
       map.switchToMap();
    };

    this.changeToSat = function(){
        map.switchToSat();

    };

    //Toggle Layer On
    this.layerOn = function(layer){
        map.addLayer(layer);
    };

    //Toggle Layer off
    this.layerOff = function(layer){
        if(map.hasLayer)
            map.removeLayer(layer);
    };

    //Toggle Layer
    this.toggleLayer = function(layer){
        if(map.hasLayer(layer)==true){
            map.removeLayer(layer);}
        else map.addLayer(layer);
    };

    //Zooms In
    this.zoomIn = function(){
        map.zoomIn();
    };

    //Zooms Out
    this.zoomOut = function(){
        map.zoomOut();
    };

    var init = function(){
        map = mapObject;
    }();
}