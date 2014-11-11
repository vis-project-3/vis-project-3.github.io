function App(){
    var mapObject = new Map("map");
    var ui = new UI();

    // ui.createSVG("#top-bar");
    ui.createSVG("#notifications");
    //this.ui.createSVG("#layer");
    ui.createSVG("#graphs");

    var layer = new layerButtons("#layer");
    var controls = new mapControls("#mapcontrol")
    var toggle = new toggleButtons("#toggle");
    var navigation = new navigationBar("#top-bar");
    var events = new mapEvents(mapObject.getMap());
    var pointA = mapObject.getPointA();
    var pointB = mapObject.getPointB();


    /*** TEMPORARY BINDINGS ***/

    d3  .select("#icon-minus")
        .on("click",function(){
            events.zoomOut();
        });

    d3  .select("#icon-plus")
        .on("click", function(){
            events.zoomIn();
        });

    d3  .select("#satellite")
        .on("click", function(){
            events.changeToSat();
        });

    d3  .select("#street")
        .on("click", function(){
            events.changeToMap();
        });

    d3  .select("#divvy-layer")
        .on("click", function(){
            events.toggleLayer(divvy.getLayer());
        });

    d3  .select("#potholes-layer")
        .on("click", function(){
            events.toggleLayer(potholes.getLayer());
        });

    d3  .select("#vehicles-layer")
        .on("click", function(){
            events.toggleLayer(vehicles.getLayer());
        });

    d3  .select("#lights-layer")
        .on("click", function(){
            events.toggleLayer(lights.getLayer());
        });

    d3  .select("#crimes-layer")
        .on("click", function(){
            events.toggleLayer(crimes.getLayer());
        });


    L.Icon.Default.imagePath = "../resources/images";
    var divvy = new divvyLayer();
    var divvyAPI = new divvyStationsDataSet();

    var potholes = new potholesLayer();
    var potholesAPI = new potholesDataSet();

    var vehicles = new vehicleLayer();
    var vehiclesAPI = new abandonedVehiclesDataSet();

    var crimes = new crimeLayer(4)
    var crimesAPI = new crimesDataSet();

    var lights = new lightsLayer();
    var lightsAPI = new streetLightsAllOutDataSet();

    var requiredDivvy

    var requiredColumns = {
        0: 'creation_date',
        1: 'status',
        2: 'service_request_number',
        3: 'latitude',
        4: 'longitude'
    };

    var crimeRequiredColumns = {
        0: 'id',
        1: 'date',
        3: 'latitude',
        4: 'longitude'
    };

    var filterConditions = {
        timeStamp: 'lastMonth',
        status: 'Open',
        latitude:[Math.min(pointA[0],pointB[0]),Math.max(pointA[0],pointB[0])],//[from,to]
        longitude:[Math.min(pointA[1],pointB[1]),Math.max(pointA[1],pointB[1])]//[from,to]
    };

    var crimeFilterConditions = {
        timeStamp: 'lastMonth'
        //latitude:[41.8,41.9],//[from,to]
        //longitude:[-87.8,-87.6]//[from,to]
    };

    function getDivvyData(){
        $.ajax({
            url: "http://sortieapp.com/sortie/divvy",
            dataType: "json",
            success: function(data){
                callBackDivvy(data)
            }
        });
    }

    function callBackDivvy(data){
        console.log("[LOG] : Adding Divvy Data");
        divvy.addCollection(data);
        //divvy.varLog();
       // mapObject.addLayer(divvy.getLayer());

    }


    function callBackPotholes(data){
        console.log("[LOG] : Adding Potholes Data");
        potholes.addCollection(data);
        //potholes.varLog();
        //mapObject.addLayer(potholes.getLayer());

    }

    function callBackVehicles(data){
        console.log("[LOG] : Adding Vehicles Data");
        vehicles.addCollection(data);
        //potholes.varLog();
       // mapObject.addLayer(vehicles.getLayer());

    }

    function callBackLights(data){
        console.log("[LOG] : Adding Lights Data");
        lights.addCollection(data);
        //potholes.varLog();
        //mapObject.addLayer(lights.getLayer());

    }

    function callBackCrime(data){
        console.log("[LOG] : Adding Crime Data");
        crimes.addCollection(data);
        //potholes.varLog();
       // mapObject.addLayer(crimes.getLayer());

    }

    function prova(){
        getDivvyData();
        potholesAPI.getData(requiredColumns,filterConditions,callBackPotholes);
        vehiclesAPI.getData(requiredColumns,filterConditions,callBackVehicles);
        lightsAPI.getData(requiredColumns,filterConditions,callBackLights);
        crimesAPI.getData(crimeRequiredColumns,crimeFilterConditions,callBackCrime);
    }

    prova();
}
