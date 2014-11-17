var getIcon = function (kind) {
        switch (kind) {
            case "test" :
                return L.icon({
                    iconUrl: 'resources/icons/icon-test.svg',
                    iconSize: [50, 50]
                });
            case "cta_bus" :
                return L.icon({
                    iconUrl: 'resources/icons/icon-bus.svg',
                    iconSize: [50, 50]
                });
            case "cta_station" :
                return L.icon({
                    iconUrl: 'resources/icons/icon-bus-station.svg',
                    iconSize: [50, 50]
                });
            case "divvy" :
                return L.icon({
                    iconUrl: 'resources/icons/icon-divvy.svg',
                    iconSize: [50, 50]
                });
            case "light" :
                return L.icon({
                    iconUrl: 'resources/icons/icon-light.svg',
                    iconSize: [50, 50]
                });
            case "pothole" :
                return L.icon({
                    iconUrl: 'resources/icons/icon-pot-hole.svg',
                    iconSize: [50, 50]
                });
            case "crime" :
                return L.icon({
                    iconUrl: 'resources/icons/icon-crime.svg',
                    iconSize: [50, 50]
                });
            case "vehicle" :
                return L.icon({
                    iconUrl: 'resources/icons/icon-abandoned-car.svg',
                    iconSize: [50, 50]
                });
            case "uber" :
                return L.icon({
                    iconUrl: 'resources/icons/uber.svg',
                    iconSize: [50, 50]
                });
            default:
                return L.icon({
                    iconUrl: 'resources/icons/icon-error.svg',
                    iconSize: [25, 25]
                });

        }
}