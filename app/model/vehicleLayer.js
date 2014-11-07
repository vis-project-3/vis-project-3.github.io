function vehicleLayer(){

    var api;
    var requiredColumns = {};
    var filterConditions = {};

    var self = this;
    var layer = [];
    var collection = {};
    var markers = {};

    /* Public Methods */


    /* Private Methods */

    // Initializer
    var init = function(){
        api = new abandonedVehiclesDataSet();

        requiredColumns = {
            0: 'creation_date',
            1: 'status',
            2: 'service_request_number',
            3: 'latitude',
            4: 'longitude'
        }
        filterConditions = {
            timeStamp: 'lastWeek',
            status: 'Open'
        };

    }();


}