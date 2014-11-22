function controllerWeather(weatherBox){

    var weather = weatherBox;
    var weatherData = new weatherDataSetMod();

    var getSunriseSunset = this.getSunriseSunset = function() {
        weatherData.getSunriseSunset(callBackSunriseSunset);
    };

    var getWeather = this.getWeather = function(){
        weatherData.getData(callBack);
    };

    var callBack = function(data){
        weather.updateAll(data);
    };

    var callBackSunriseSunset = function(data){
        weather.setSunriseSunset(data);
    };


}
