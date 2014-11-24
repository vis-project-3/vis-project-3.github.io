/**
 * Created by theja on 11/20/14.
 */

function fourSquareDataSet(){
    //constructor code goes here
    var self = this;
    this.client_id = 'ADSPOYCSOJSLPKEP4ATQAAIMQNG2JU1PUITZJ01KYBCJ3TI1';
    this.client_secret = 'EYZDF2BFD5CD030PLVVIQXN5CZL114RNFWXIY2NEKBHSBMQD';
    this.limit = 30;
    //List of Categories available here:
    //https://developer.foursquare.com/categorytree
    this.getVenues = function(neCoordinates,swCoordinates,categoryId,callBack) {
        var urlAddress = "https://api.foursquare.com/v2/venues/search?";
        var neCoords = "ne="+neCoordinates[0]+","+neCoordinates[1]+"&";
        var swCoords = "sw="+swCoordinates[0]+","+swCoordinates[1]+"&";
        var category = "4d4b7105d754a06376d81259";
        urlAddress += neCoords+swCoords+"categoryId="+category+"&limit = "+self.limit+"&intent=browse&client_id="+self.client_id+"&v=20141120&client_secret="+self.client_secret;
        $.ajax({
            url: urlAddress,
            dataType: "json",
            success: function(data){
                var newData = self.formatData(data);
                callBack(newData);
            }
        });
    }

    this.getTrendingVenues = function(coordinates,callBack) {
        var urlAddress = "https://api.foursquare.com/v2/venues/trending?";
        urlAddress += "ll="+coordinates[0]+","+coordinates[1]+"&client_id="+self.client_id+"&v=20141120&client_secret="+self.client_secret;
        $.ajax({
            url: urlAddress,
            dataType: "json",
            success: function(data){
                var newData = self.formatData(data);
                callBack(newData);
            }
        });
    }

    this.formatData = function(unformattedData){
        var formattedData = [];
        for(var index = 0; index < unformattedData.response.venues.length; index++){
            var formattedObject = {
                id: unformattedData.response.venues[index].id,
                name: unformattedData.response.venues[index].name,
                latitude: unformattedData.response.venues[index].location.lat,
                longitude: unformattedData.response.venues[index].location.lng,
                activeUsers: unformattedData.response.venues[index].hereNow.count,
                typeOfVenue: unformattedData.response.venues[index].categories[0].name
            }
            formattedData.push(formattedObject);
        }
        return formattedData;
    }
}


