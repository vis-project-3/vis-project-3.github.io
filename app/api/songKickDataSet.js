/**
 * Created by theja on 11/22/14.
 */

function songKickDataSet(){
    //constructor code goes here
    var self = this;
    this.apiKey = '73WTsMuS6dWmm6pB';

    //Return 50 events happening around given location on that day
    this.getEvents = function(latitude,longitude,callBack) {
        var url = 'http://api.songkick.com/api/3.0/events.json?location=geo:'+latitude+','+longitude+'&apikey='+self.apiKey;
        $.ajax({
            url: url,
            success: function(data) {
                var newData = self.getModifiedData(data.resultsPage.results.event);
                callBack(newData);
            }
        });
    }
    this.getModifiedData = function(unformattedData) {
        var formattedContent = [];
        for(var index = 0; index < unformattedData.length; index++){
            var formattedData = {
                eventType: unformattedData[index].type,
                name: unformattedData[index].displayName,
                latitude: unformattedData[index].location.lat,
                longitude: unformattedData[index].location.lng
            }
            formattedContent.push(formattedData);
        }
        return formattedContent;
    }
}
