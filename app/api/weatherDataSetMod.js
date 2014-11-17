
/**
 * Created by theja on 11/6/14.
 */
function weatherDataSetMod(){
    //constructor code goes here
    var self = this;
    var key = '83a7051e2edc5e81';
    var yahooURL = "https://query.yahooapis.com/v1/public/yql?q=";
    var dataSetEndPoint = 'http://api.wunderground.com/api/' + key + '/';

    this.getData = function(callBack){
        var urlForDataSet = generateQuery();
        $.ajax({
            url: urlForDataSet,
            dataType: "json",
            success: function(data){
                var weatherData = modifyJSON(data);
                callBack(weatherData);
            }
        });
    }

    this.getSunriseSunset = function(callBack){
        var urlForDataSet = generateQuery2();
        $.ajax({
            url: urlForDataSet,
            dataType: "json",
            success: function(data){
                var weatherData = modifyJSON2(data);
                callBack(weatherData);
            }
        });
    }

    var generateQuery = function(){

        /*var requiredQuery = dataSetEndPoint;
        //specify latitude and longitude
        requiredQuery += 'conditions/';
        requiredQuery += 'q/';
        requiredQuery += 'IL/Chicago';
        requiredQuery += '.json';

        var yql = yahooURL;
        yql += "select * from json where url='" + requiredQuery + "'" + "and itemPath=json.current_observation" +  "&format='json'";*/

        var yql = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D'http%3A%2F%2Fapi.wunderground.com%2Fapi%2F83a7051e2edc5e81%2Fconditions%2Fq%2FIL%2FChicago.json'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"

        return yql;
    }

    var modifyJSON = function(json){
        var modifiedJSON = {
            temp_c : json.query.results.json.current_observation.temp_c,
            temp_f : json.query.results.json.current_observation.temp_f,
            iconName: json.query.results.json.current_observation.icon,
            condition : json.query.results.json.current_observation.weather
        }
        return modifiedJSON;
    }

    var generateQuery2 = function(){

        /*var requiredQuery = dataSetEndPoint;
         //specify latitude and longitude
         requiredQuery += 'astronomy/';
         requiredQuery += 'q/';
         requiredQuery += 'IL/Chicago';
         requiredQuery += '.json';

         var yql = yahooURL;
         yql += "select * from json where url='" + requiredQuery + "'"  +  "&format='json'";*/

        var yql = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D'http%3A%2F%2Fapi.wunderground.com%2Fapi%2F83a7051e2edc5e81%2Fastronomy%2Fq%2FIL%2FChicago.json'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"

        return yql;
    }

    var modifyJSON2 = function(json){
        var modifiedJSON = {
            sunrise_hour : json.query.results.json.sun_phase.sunrise.hour,
            sunrise_minute : json.query.results.json.sun_phase.sunrise.minute,
            sunset_hour: json.query.results.json.sun_phase.sunset.hour,
            sunset_minute: json.query.results.json.sun_phase.sunset.minute
        }
        return modifiedJSON;
    }
}
