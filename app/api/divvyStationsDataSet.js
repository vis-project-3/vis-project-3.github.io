/**
 * Created by theja on 11/8/14.
 */
function divvyStationsDataSet(){
    //constructor code goes here
    this.dataSetEndPoint = 'http://query.yahooapis.com/v1/public/yql?q=';

    this.getData = function(requiredColumns,filterConditions,callBack){
        var urlForDataSet = this.generateQuery(requiredColumns,filterConditions);
        $.ajax({
            url: urlForDataSet,
            dataType: "json",
            success: function(data){
                /* Format of returned Data:
                 {
                     "type": "Feature",
                     "properties": {
                         "id": 328,
                         "stationName": "Ellis Ave & 58th St",
                         "availableDocks": 6,
                         "availableBikes": 9,
                         "statusValue": "In Service",
                         "landmark": "365",
                         "testStation": false
                     },
                     "geometry": {
                         "type": "Point",
                         "coordinates": [
                             -87.601334,
                             41.788746
                         ]
                     }
                 }
                 */
                callBack(data.query.results.stationBeanList);
            }
        });
    }

    this.getSpecificStationData = function(stationId,callBack){
        var urlForDataSet = this.generateSpecificStnQuery(stationId);
        $.ajax({
            url: urlForDataSet,
            dataType: "json",
            success: function(data){
                var divvyBikesGeoJSON = data;
                callBack(divvyBikesGeoJSON);
            }
        });
    }

    this.generateQuery = function(requiredColumns,filterConditions){
        var requiredQuery = this.dataSetEndPoint;
        //specify latitude and longitude
        //select * from json where url='http://www.divvybikes.com/stations/json/' and itemPath = "json.stationBeanList" and id <= 20
        requiredQuery += 'select ';
        //Append the required Columns to show in the query
        for (var property in requiredColumns) {
            if (requiredColumns.hasOwnProperty(property)) {
                var propertyValue = requiredColumns[property];
                requiredQuery += propertyValue + ",";
            }
        }
        requiredQuery = requiredQuery.substr(0, requiredQuery.length - 1);
        //Append the filteredConditions to the query
        var divvyOriginal = 'http://www.divvybikes.com/stations/json';
        var divvyProxy = 'http://sortieapp.com/sortie/divvy';
        requiredQuery += ' from json where url= \''+divvyProxy+'\' and itemPath = "json.stationBeanList" and ';
        for (var property in filterConditions) {
            if (filterConditions.hasOwnProperty(property)) {
                var propertyValue = filterConditions[property];
                // Handle case for latitude and longitude - Show data between give latitude and longitude positions
                if(propertyValue instanceof Array){
                    var fromVal = propertyValue[0];
                    var toVal = propertyValue[1];
                    requiredQuery += property + '>=' + fromVal +' AND '+ property + '<=' + toVal + ' AND ';
                }
                // Ex:append STATUS=open to the query
                else{
                    requiredQuery += property + '=\'' + propertyValue + '\' AND ';
                }

            }
        }
        requiredQuery = requiredQuery.substr(0, requiredQuery.length - 4);
        requiredQuery += '&format=json';
        return requiredQuery;
    }

    this.generateSpecificStnQuery = function(stationID){
        var requiredQuery = this.dataSetEndPoint;
        //specify latitude and longitude
        requiredQuery += stationID;
        return requiredQuery;
    }
}
