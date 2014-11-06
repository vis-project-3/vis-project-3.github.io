function App(){
    this.map = new Map("map");
    this.ui = new UI();

    this.ui.createSVG("#top-bar");
    this.ui.createSVG("#notifications");
    this.ui.createSVG("#layer");
    this.ui.createSVG("#graphs");

    var map = this.map;

    map.addMarker("damn",41.87,-87.58);
}
