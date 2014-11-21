/**
 * Created by theja on 11/20/14.
 */

function fourSquareDataSet(){
    //constructor code goes here
    var self = this;
    this.client_id = 'ADSPOYCSOJSLPKEP4ATQAAIMQNG2JU1PUITZJ01KYBCJ3TI1';
    this.client_secret = 'EYZDF2BFD5CD030PLVVIQXN5CZL114RNFWXIY2NEKBHSBMQD';
    this.limit = 30;
    //https://api.foursquare.com/v2/venues/search?ne=39.998,-0.06&sw=39.9935,-0.075&limit=30&intent=browse&
    //client_id=ADSPOYCSOJSLPKEP4ATQAAIMQNG2JU1PUITZJ01KYBCJ3TI1&v=20141120&client_secret=EYZDF2BFD5CD030PLVVIQXN5CZL114RNFWXIY2NEKBHSBMQD
    this.getVenues = function(neCoordinates,swCoordinates,categoryId,callBack) {
        var urlAddress = "https://api.foursquare.com/v2/venues/search?";
        var neCoords = "ne="+neCoordinates[0]+","+neCoordinates[1]+"&";
        var swCoords = "sw="+swCoordinates[0]+","+swCoordinates[1]+"&";
        urlAddress += neCoords+swCoords+"categoryId=4d4b7105d754a06376d81259&"+"limit = "+self.limit+"&intent=browse&client_id="+self.client_id+"&v=20141120&client_secret="+self.client_secret;
        $.ajax({
            url: urlAddress,
            dataType: "json",
            success: function(data){

                /*Sample Format of single object

                 "response": {
                 "venues": [{
                 "id": "40b28c80f964a520affb1ee3",
                 "name": "House of Blues",
                 "contact": {
                 "phone": "3129232000",
                 "formattedPhone": "(312) 923-2000",
                 "twitter": "hobchicago",
                 "facebook": "47721997350",
                 "facebookUsername": "hobchicago",
                 "facebookName": "House of Blues Chicago"
                 },
                 "location": {
                 "address": "329 N Dearborn St",
                 "crossStreet": "btwn Kinzie St & Wacker Dr",
                 "lat": 41.88797483090435,
                 "lng": -87.62899909550914,
                 "postalCode": "60654",
                 "cc": "US",
                 "city": "Chicago",
                 "state": "IL",
                 "country": "United States",
                 "formattedAddress": ["329 N Dearborn St (btwn Kinzie St & Wacker Dr)", "Chicago, IL 60654", "United States"]
                 },
                 "categories": [{
                 "id": "4bf58dd8d48988d1e5931735",
                 "name": "Music Venue",
                 "pluralName": "Music Venues",
                 "shortName": "Music Venue",
                 "icon": {
                 "prefix": "https:\/\/ss3.4sqi.net\/img\/categories_v2\/arts_entertainment\/musicvenue_",
                 "suffix": ".png"
                 },
                 "primary": true
                 }],
                 "verified": true,
                 "stats": {
                 "checkinsCount": 30825,
                 "usersCount": 19846,
                 "tipCount": 126
                 },
                 "url": "http:\/\/www.houseofblues.com\/chicago",
                 "hasMenu": true,
                 "reservations": {
                 "url": "http:\/\/www.opentable.com\/single.aspx?rid=39712&ref=9601"
                 },
                 "menu": {
                 "type": "Menu",
                 "label": "Menu",
                 "anchor": "View Menu",
                 "url": "https:\/\/foursquare.com\/v\/house-of-blues\/40b28c80f964a520affb1ee3\/menu",
                 "mobileUrl": "https:\/\/foursquare.com\/v\/40b28c80f964a520affb1ee3\/device_menu"
                 },
                 "specials": {
                 "count": 0,
                 "items": []
                 },
                 "events": {
                 "count": 1,
                 "summary": "Chase Rice and Michael Ray",
                 "items": [{
                 "id": "53ed5153e4b058c9be4b858a",
                 "name": "Chase Rice and Michael Ray",
                 "categories": [{
                 "id": "4e0a4b91bd41eda0d6092f89",
                 "name": "Concert",
                 "pluralName": "Concerts",
                 "shortName": "Concert",
                 "icon": {
                 "prefix": "https:\/\/ss3.4sqi.net\/img\/categories_v2\/arts_entertainment\/musicvenue_",
                 "suffix": ".png"
                 },
                 "primary": true
                 }],
                 "startAt": 1416526200,
                 "endAt": 1416547800,
                 "allDay": false,
                 "timeZone": "America\/Chicago",
                 "text": "",
                 "url": "http:\/\/www.songkick.com\/concerts\/21395103-chase-rice-at-house-of-blues?utm_source=4436&utm_medium=partner",
                 "images": [],
                 "provider": {
                 "name": "songkick",
                 "iconUrl": {
                 "prefix": "https:\/\/playfoursquare.s3.amazonaws.com\/events\/images\/partners\/sk\/",
                 "sizes": [20, 40],
                 "name": "\/logo.png"
                 },
                 "urlText": "more info"
                 },
                 "stats": {
                 "checkinsCount": 6,
                 "usersCount": 6
                 }
                 }]
                 },
                 "hereNow": {
                 "count": 6,
                 "summary": "6 people are checked in here",
                 "groups": [{
                 "type": "others",
                 "name": "Other people here",
                 "count": 6,
                 "items": []
                 }]
                 },
                 "venuePage": {
                 "id": "39508202"
                 },
                 "storeId": "",
                 "referralId": "v-1416531461"
                 }


                 */
                callBack(data);
            }
        });
    }
}


