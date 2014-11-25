function divvyDataSet() {
    var entryPoint = "http://www.divvybikes.com/stations/json";

    var generateQuery = function (coords) {
        var query = entryPoint;// + parameters;
        //var southWest = coords.getSouthWest();
        //var northEast = coords.getNorthEast();

        //console.log(southWest);
        //console.log(northEast);
        //var parameters = "";

        //parameters += " and latitude>=" + southWest.lat;
        //parameters += " and longitude>=" + southWest.lng;
        //parameters += " and latitude<=" + northEast.lat;
        //parameters += " and longitude>=" + northEast.lng;

        return 'https://query.yahooapis.com/v1/public/yql?format=json&q=' + encodeURIComponent('select * from json where url="' + entryPoint + '"');
    };

    var getData = function (url, callback) {
        $.ajax({
            url: url,
            success: function (data) {
                callback(data.query.results.json.stationBeanList);
            }
        });
    };

    this.getStations = function (coords, callback) {
        var query = generateQuery(coords);
        getData(query, callback);
    };

}
