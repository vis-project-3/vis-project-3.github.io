function iconsApp() {

    var path ="resources/icons/"

    this.getIcon = function (kind) {
        switch (kind) {

            case "test" :
                return path + "icon-test.svg";

            case "cta_bus" :
                return path + "icon-bus.svg";

            case "cta_bus_north" :
                return path + "icon-bus-north.svg";

            case "cta_bus_south" :
                return path + "icon-bus-south.svg";

            case "cta_bus_east" :
                return path + "icon-bus-east.svg";

            case "cta_bus_west" :
                return path + "icon-bus-west.svg";

            case "cta_station" :
                return path + "icon-bus-station.svg";

            case "divvy" :
                return path + "icon-divvy.svg";

            case "light" :
                return path + "icon-light.svg";

            case "pothole" :
                return path +  "icon-pot-hole.svg";

            case "crime" :
                return path + "icon-crime.svg";

            case "vehicle" :
                return path + "icon-abandoned-car.svg";

            case "uber" :
                return path + "uber.svg";

            default:
                return 'resources/icons/icon-error.svg';
        }
    }
}