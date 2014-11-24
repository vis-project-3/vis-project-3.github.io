function yelpDataSet(){

    var auth = {

                    consumerKey : "-sxRbkR7yJeHu5kY2HzcOg",
                    consumerSecret : "_bmQ6c183sqEI93OsIyeMHO8I8o",
                    accessToken : "gYqrHowvMt6a3yq-B4JpL2-wq5PccQYp",
                    accessTokenSecret : "2K3suw8oSb_hTeWkaQfpRADslDM",
                    serviceProvider : {
                        signatureMethod : "HMAC-SHA1"
                    }
                };

    var accessor = {
        consumerSecret : auth.consumerSecret,
        tokenSecret : auth.accessTokenSecret
    };

    var parameters = [];
    var message = {};
    var parameterMap;

    var generateQuery = function(bounds){

        var terms = 'food';

        var southWestLat = bounds.getSouthWest().lat;
        var southWestLon = bounds.getSouthWest().lng;
        var northEastLat = bounds.getNorthEast().lat;
        var northEastLon = bounds.getNorthEast().lng;

        var box = southWestLat + "," + southWestLon + "|" + northEastLat + "," + northEastLon;

        parameters = [];
        parameters.push(['term', terms]);
        parameters.push(['bounds', box]);
        parameters.push(['oauth_consumer_key', auth.consumerKey]);
        parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
        parameters.push(['oauth_token', auth.accessToken]);
        parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

        message = {
            'action' : 'http://api.yelp.com/v2/search',
            'method' : 'GET',
            'parameters' : parameters
        };

        OAuth.setTimestampAndNonce(message);
        OAuth.SignatureMethod.sign(message, accessor);

        parameterMap = OAuth.getParameterMap(message.parameters);
    };


   //http://api.yelp.com/v2/search?term=food&bounds=37.900000,-122.500000|37.788022,-122.399797&limit=3


    this.getData = function(bounds, callback) {
        generateQuery(bounds);
        $.ajax({
            'url': message.action,
            'data': parameterMap,
            'dataType': 'jsonp',
            'jsonpCallback': 'cb',
            'success': function(data){
                console.log(data)
            }
        });
    }

}