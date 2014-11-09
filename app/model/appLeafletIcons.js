var getIcon = function (kind) {
        switch (kind) {
            case "test" :
                return L.icon({
                    iconUrl: 'resources/icons/icon-test.svg',
                    iconSize: [50, 50]
                });
            case "cta_bus" :
                return L.icon({
                    iconUrl: 'resources/icons/icon-bus.svg'
                });
            case "cta_station" :
                return L.icon({
                    iconUrl: 'resources/icons/icon-bus-station.svg'
                });
            case "divvy" :
                return L.icon({
                    iconUrl: 'resources/icons/icon-divvy.svg'
                });
            case "light" :
                return L.icon({
                    iconUrl: 'resources/icons/icon-light.svg'
                });
            case "pothole" :
                return L.icon({
                    iconUrl: 'resources/icons/icon-pot-hole.svg'
                });
            case "crime" :
                return L.icon({
                    iconUrl: 'resources/icons/icon-crime.svg'
                });
            case "vehicle" :
                return L.icon({
                    iconUrl: 'resources/icons/icon-abandoned-car.svg'
                });
            case "uber" :
                return L.icon({
                    iconUrl: 'resources/icons/uber.svg'
                });
            default:
                return L.icon({
                    iconUrl: 'resources/icons/icon-error.svg',
                    iconSize: [25, 25]
                });

        }
}