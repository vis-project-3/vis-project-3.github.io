/**
 * Created by theja on 11/17/14.
 */

//TODO: Update the ORIGIN URI field in Uber App management to our app. Currently it is set to localhost.,i.e., http://localhost:8888
function uberDataSet(){
    //constructor code goes here
    var self = this;
    this.serverToken = 'AmsiHoYp27Ic8rHwDy9R9BQH72tZZly35VgD971J';
    this.clientId = 'Utl9vQTZwbo94RDH9sN99WteGoXkzN9C';

    //Gives lowest possible estimated price from (start_latitude,start_longitude) to (end_latitude,end_longitude)
    //Sample Data Format
    /* currency_code: "USD"
     display_name: "uberX"
     distance: 16.92
     duration: 1780
     estimate: "$21-29"
     high_estimate: "29"
     localized_display_name: "uberX"
     low_estimate: "21"
     product_id: "4bfc6c57-98c0-424f-a72e-c1e2a1d49939"
     surge_multiplier: 1
     */
    this.getPriceEstimates = function(fromCoordinates,toCoordinates,callBack) {
        $.ajax({
            url: "https://api.uber.com/v1/estimates/price",
            headers: {
                Authorization: "Token " + self.serverToken
            },
            data: {
                start_latitude: fromCoordinates[0],
                start_longitude: fromCoordinates[1],
                end_latitude: toCoordinates[0],
                end_longitude: toCoordinates[1]
            },
            success: function(result) {
                var data = result["prices"];
                if (typeof data != typeof undefined) {
                    // Sort Uber products by time to the user's location
                    data.sort(function (e0, e1) {
                        return parseFloat(e0.low_estimate) - parseFloat(e1.low_estimate);
                    });

                    // Update the Uber button with the shortest time
                    var shortest = data[0];
                    /*if (typeof shortest != typeof undefined) {
                        console.log("Updating price estimate...");
                        $("#price").html("Low Estimate : $ " + shortest.low_estimate);
                    }*/
                }
                callBack(result);
            }
        });
    }

    //Gives least possible estimated time for arrival of uber service for that latitude and longitude
    //Sample Data Format
    /*
     display_name: "uberX"
     estimate: 756
     localized_display_name: "uberX"
     product_id: "4bfc6c57-98c0-424f-a72e-c1e2a1d49939"
     */
    this.getTimeEstimates = function(fromCoordinates,callBack) {
        $.ajax({
            url: "https://api.uber.com/v1/estimates/time",
            headers: {
                Authorization: "Token " + self.serverToken
            },
            data: {
                start_latitude: fromCoordinates[0],
                start_longitude: fromCoordinates[1]
            },
            success: function(result) {
                var data = result["times"];
                if (typeof data != typeof undefined) {
                    // Sort Uber products by time to the user's location
                    data.sort(function (t0, t1) {
                        return t0.estimate - t1.estimate;
                    });
                    // Update the Uber button with the shortest time
                    var shortest = data[0];
                    /*if (typeof shortest != typeof undefined) {
                        console.log("Updating time estimate...");
                        $("#time").html("IN " + Math.ceil(shortest.estimate / 60.0) + " MIN");
                    }*/
                }
                callBack(result);
            }
        });
    }

    this.getAvailableUberProducts = function(fromCoordinates,callBack) {
        $.ajax({
            url: "https://api.uber.com/v1/products",
            headers: {
                Authorization: "Token " + self.serverToken
            },
            data: {
                start_latitude: fromCoordinates[0],
                start_longitude: fromCoordinates[1],
            },
            success: function(result) {
                callBack(result);
            }
        });
    }
}


