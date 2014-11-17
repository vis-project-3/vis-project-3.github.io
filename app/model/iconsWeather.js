function iconsWeather() {

    var path= "resources/icons/weather/";

    this.getIcon = function (kind) {

        switch (kind) {
            case "chanceflurries" :
                return path + "cloudSnowFill.svg";

            case "chancerain" :
                return path + "cloudRainAltFill.svg";

            case "chancesleet" :
                return path + "cloudHailAlt.svg";

            case "chancesnow" :
                return path + "cloudSnowFill.svg";

            case "chancetstorms" :
                return path + "cloudLightning.svg";

            case "clear" :
                return path + "sun.svg";

            case "cloudy" :
                return path + "cloudFill.svg";

            case "flurries" :
                return path + "cloudHailAltFill.svg";

            case "fog" :
                return path + "cloudFogAlt.svg";

            case "hazy" :
                return path + "cloudFogFill.svg";

            case "mostlycloudy" :
                return path + "cloudSun.svg";

            case "mostlysunny" :
                return path + "cloudSun.svg";

            case "partlycloudy" :
                return path + "cloudSun.svg";

            case "partlysunny" :
                return path + "cloudSun.svg";

            case "sleet" :
                return path + "cloudHailAltFill.svg";

            case "rain" :
                return path + "cloudDrizzleFill.svg";

            case "snow" :
                return path + "cloudSnowAltFill.svg";

            case "sunny" :
                return path + "sun.svg";

            case "tstorms" :
                return path + "cloudLightningFill.svg";

            case "thermo0" :
                return path + "thermometer0.svg";

            case "thermo25" :
                return path + "thermometer25.svg";

            case "thermo50" :
                return path + "thermometer50.svg";

            case "thermo75" :
                return path + "thermometer75.svg";

            case "thermo100" :
                return path + "thermometer100.svg";

            case "Celsius" :
                return path + "Degrees-Celsius.svg";

            case "Fahrenheit":
                return path + "Degrees-Fahrenheit.svg"

            default :
                return path + "snowflake.svg";
        }
    }
}