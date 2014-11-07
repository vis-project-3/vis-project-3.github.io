/**
 * Created by theja on 11/6/14.
 */
function weatherDataSet(){
    //constructor code goes here
    this.dataSetEndPoint = 'http://api.worldweatheronline.com/free/v2/weather.ashx?';
    this.currentWeatherJSON;
    this.formattedWeatherJSON;

    this.generateQuery = function(latitude,longitude,num_of_days){
        var requiredQuery = this.dataSetEndPoint;
        //specify latitude and longitude
        requiredQuery += 'q='+latitude+'%2C%20'+longitude;
        //add format
        requiredQuery += '&format=json';
        //add number of Days
        requiredQuery += '&num_of_days='+num_of_days;
        //add the APIKey
        requiredQuery += '&key=e631047f7d67f7e83ee8bba4b5d7b';
        return requiredQuery;
    }

    this.modifyJSON = function(json){

        var modifiedJSON = {
            temp_in_C : json.data.current_condition[0].temp_C,
            temp_in_F : json.data.current_condition[0].temp_F,
            weatherICON: json.data.current_condition[0].weatherIconUrl[0].value
        }
        return modifiedJSON;
    }
}

weatherDataSet.prototype.getWeatherData = function(latitude,longitude,num_of_days){
    var that = this;
    var query = this.generateQuery(latitude,longitude,num_of_days);
    d3.json(query, function(data) {
            that.currentWeatherJSON = data;
            that.formattedWeatherJSON = that.modifyJSON(data);
        }
    );

}
