function App(){
    this.map = new Map("map");
    this.ui = new UI();

    this.ui.createSVG("#top-bar");
    this.ui.createSVG("#notifications");
    //this.ui.createSVG("#layer");
    this.ui.createSVG("#graphs");

    var map = this.map;
    var layer = new layerButtons("#layer");

    //map.addMarker("test",41.87,-87.58);


}
