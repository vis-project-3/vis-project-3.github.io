function controllerWeather(weatherBox){

    var weather = weatherBox;
    var weatherData = new weatherDataSetMod();

    function getWeather(){
        weatherData.getData(callBack);
    }

    function callBack(data){
        weather.updateAll(data);
    }

    getWeather();

    amplify.subscribe("WEATHER", getWeather);
}