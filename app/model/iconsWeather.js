function iconsWeather() {

    var path= "resources/icons/weather/";

    this.getIcon = function (kind) {

        switch (kind) {
            case "chanceflurries" :
                return path + "cloudSnowFill.svg";
            case "chanceflurriesMoon" :
                return path + "cloudSnowMoonFill.svg";

            case "chancerain" :
                return path + "cloudRainAltFill.svg";
            case "chancerainMoon" :
                return path + "cloudRainMoonAltFill.svg";

            case "chancesleet" :
                return path + "cloudHailAlt.svg";
            case "chancesleetMoon" :
                return path + "cloudHailAltMoon.svg";

            case "chancesnow" :
                return path + "cloudSnowFill.svg";
            case "chancesnowMoon" :
                return path + "cloudSnowMoonFill.svg";

            case "chancetstorms" :
                return path + "cloudLightning.svg";
            case "chancetstormsMoon" :
                return path + "cloudLightningMoon.svg";

            case "clear" :
                return path + "sun.svg";
            case "clearMoon" :
                return path + "moon.svg";

            case "cloudy" :
                return path + "cloudFill.svg";
            case "cloudyMoon" :
                return path + "cloudMoonFill.svg";

            case "flurries" :
                return path + "cloudHailAltFill.svg";
            case "flurriesMoon" :
                return path + "cloudHailAltMoonFill.svg";

            case "fog" :
                return path + "cloudFogAlt.svg";
            case "fogMoon" :
                return path + "cloudFogMoonAlt.svg";

            case "hazy" :
                return path + "cloudFogFill.svg";
            case "hazyMoon" :
                return path + "cloudFogMoonAltFill.svg";

            case "mostlycloudy" :
                return path + "cloudSun.svg";
            case "mostlycloudyMoon" :
                return path + "cloudMoon.svg";


            case "mostlysunny" :
                return path + "cloudSun.svg";
            case "mostlysunnyMoon" :
                return path + "cloudMoon.svg";

            case "partlycloudy" :
                return path + "cloudSun.svg";
            case "partlycloudyMoon" :
                return path + "cloudMoon.svg";

            case "partlysunny" :
                return path + "cloudSun.svg";
            case "partlysunnyMoon" :
                return path + "cloudMoon.svg";

            case "sleet" :
                return path + "cloudHailAltFill.svg";
            case "sleetMoon" :
                return path + "cloudHailAltMoonFill.svg";

            case "rain" :
                return path + "cloudDrizzleFill.svg";
            case "rainMoon" :
                return path + "cloudDrizzleMoonFill.svg";

            case "snow" :
                return path + "cloudSnowAltFill.svg";
            case "snowMoon" :
                return path + "cloudSnowMoonAltFill.svg";

            case "sunny" :
                return path + "sun.svg";
            case "sunnyMoon" :
                return path + "moon.svg";

            case "tstorms" :
                return path + "cloudLightningFill.svg";
            case "tstormsMoon" :
                return path + "cloudLightningMoonFill.svg";

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