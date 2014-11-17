function controllerWeather(weatherBox){

    var weather = weatherBox;
    var weatherData = new weatherDataSetMod();

    var getSunriseSunset = function() {
        weatherData.getSunriseSunset(callBackSunriseSunset);
    };

    var getWeather = function(){
        weatherData.getData(callBack);
    };

    var callBack = function(data){
        weather.updateAll(data);
    };

    var callBackSunriseSunset = function(data){
        weather.setSunriseSunset(data);
    };

    amplify.subscribe("SUNRISE_SUNSET",getSunriseSunset)
    amplify.subscribe("WEATHER", getWeather);
}