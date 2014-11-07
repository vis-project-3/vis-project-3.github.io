var getIcon = function (kind) {
        switch (kind) {
            case "test" :
                return L.icon({
                    iconUrl: 'resources/icons/test_icon.svg',
                    iconSize: [100, 100]
                });
            case "cta_bus" :
                return L.icon({
                    iconUrl: 'resources/icons/cta_bus.svg'
                });
            case "cta_station" :
                return L.icon({
                    iconUrl: 'resources/icons/cta_station.svg'
                });
            case "divvy" :
                return L.icon({
                    iconUrl: 'resources/icons/divvy.svg'
                });
            case "light" :
                return L.icon({
                    iconUrl: 'resources/icons/light.svg'
                });
            case "pothole" :
                return L.icon({
                    iconUrl: 'resources/icons/pothole.svg'
                });
            case "crime" :
                return L.icon({
                    iconUrl: 'resources/icons/crime.svg'
                });
            case "vehicle" :
                return L.icon({
                    iconUrl: 'resources/icons/vehicle.svg'
                });
            case "uber" :
                return L.icon({
                    iconUrl: 'resources/icons/uber.svg'
                });
            default:
                return L.icon({
                    iconUrl: 'resources/icons/error.svg',
                    iconSize: [50, 50]
                });

        }
}