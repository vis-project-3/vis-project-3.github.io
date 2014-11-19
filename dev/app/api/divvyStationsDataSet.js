/**
 * Created by theja on 11/8/14.
 */
function divvyStationsDataSet(){
    //constructor code goes here
    this.dataSetEndPoint = 'http://shrouded-beach-2183.herokuapp.com/stations/';

    this.getSurroundingStationsData = function(latitude,longitude,num_of_Stations_around_Lat_Lon,callBack){
        var urlForDataSet = this.generateQuery(latitude,longitude,num_of_Stations_around_Lat_Lon);
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
                var divvyBikesGeoJSON = data;
                callBack(divvyBikesGeoJSON);
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

    this.generateQuery = function(latitude,longitude,num_of_Stations){
        var requiredQuery = this.dataSetEndPoint;
        //specify latitude and longitude
        requiredQuery += 'nearby?lat='+latitude+'&lon='+longitude;
        //limit to required number of stations
        requiredQuery += '&max_stations='+num_of_Stations;
        return requiredQuery;
    }

    this.generateSpecificStnQuery = function(stationID){
        var requiredQuery = this.dataSetEndPoint;
        //specify latitude and longitude
        requiredQuery += stationID;
        return requiredQuery;
    }
}
