function genericController() {
    // var name;
    // var pointA = [];
    // var pointB = [];
    // var map;
    // var layer;
    // var api;
    // var requiredColumns = {};
    // var filterConditions = {};

    /*** SETTERS AND GETTERS ***/

    var getSet = (new Utility()).getSet;

    var label = this.label = getSet.bind(this)();

    var id = this.id = getSet.bind(this)(id);

    var iconPath = this.iconPath = getSet.bind(this)(iconPath);

    var map = this.map = getSet.bind(this)(map);

    var layer = this.layer = getSet.bind(this)();

    var query = this.query = getSet.bind(this)();

    /**** PUBLIC METHODS *****/
    this.layerIsActive = function() {
        return this.map().hasLayer( this.layer().getLayer() );
    }

    this.updateData = function (bounds) {
        console.info("Layer %s is updating data with %o", name, bounds);
        var getQuery = query();
        var fullQuery = getQuery().queryRect(bounds);
        d3.json(fullQuery(), _updateData)
    };

    //Toggle Layer
    this.toggleLayer = function(){
        console.log("[" + name + "] : Toggling Layer");
        var temp = this.layer().getLayer();
        var map = this.map();
        if( map.hasLayer(temp) == true ){
            map.removeLayer(temp);
        }
        else map.addLayer(temp);
    };

    var fragment = new DocumentFragment();
    var dataList = d3.select(fragment).append("ul");
    function _updateData(newData) {
        console.info("New data length:", newData.length);
        var key = layer().getKey();
        var keyFunction = function(d) { return d[layer().getKey()]; };
        var items = dataList.selectAll("li").data(newData, keyFunction);

        // console.log(layer.getIcon());

        items.enter().append("li")
            .each(function(d) {

                var latLng = [parseFloat(d.latitude), parseFloat(d.longitude)];

                var marker = L.marker(latLng, { icon: layer().getIcon() });

                var content = layer().getPopup().generatePopupContent(d);
                console.log("[" + name + "_LAYER] : Generating Popup");
                marker.bindPopup(content);

                marker.addTo(layer().getLayer());

                this._marker = marker;

                // layer.layerGroup.addLayer(marker);

            });

        items.exit()
            .each(function(d) {
                layer().getLayer().removeLayer(this._marker);
                d3.select(this).remove();
            });
    }

    // var callBackAdd = function(data){
    //     console.log("[" + name + "] : Adding Data");
    //     //layer.clearData();
    //     layer.addCollection(data);
    // };
    //
    // var callBackUpdate = function(data){
    //     console.log("[" + name + "] : Updating Data");
    // };

}
