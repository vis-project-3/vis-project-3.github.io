/**
 * Created by theja on 11/6/14.
 */
function abandonedVehiclesDataSet(){
    //constructor code goes here
    var self = this;
    this.dataSetEndPoint = 'http://data.cityofchicago.org/resource/3c9v-pnva.json?$$app_token=pJ4wo2exY0EaCEJ758bK7Q5E3';
    this.abandonedVehiclesJSON;
    this.previousAbandonedVehiclesJSON;
    this.addedContent = [];
    this.modifiedContent = [];
    this.deletedContent = [];

    this.getData = function(requiredColumns,filterConditions,callBack){
        var urlForDataSet = this.generateQuery(requiredColumns,filterConditions);
        $.ajax({
            url: urlForDataSet,
            dataType: "json",
            success: function(data){
                self.abandonedVehiclesJSON = data;
                self.previousAbandonedVehiclesJSON = data;
                callBack(data);
            }
        });
    }

    this.getUpdatedData = function(requiredColumns,filterConditions,callBack){
        var urlForDataSet = this.generateQuery(requiredColumns,filterConditions);
        $.ajax({
            url: urlForDataSet,
            dataType: "json",
            success: function(data){
                self.abandonedVehiclesJSON = data;
                var previousData = self.previousAbandonedVehiclesJSON;
                self.previousAbandonedVehiclesJSON = data;
                self.nullifyChanges();
                self.startCompare(previousData,data);
                var modifiedData = {
                    addedData : self.addedContent,
                    deletedData: self.deletedContent,
                    modifiedData: self.modifiedContent
                }
                callBack(modifiedData)
            }
        });
    }

    this.nullifyChanges = function(){
        self.addedContent = [];
        self.deletedContent = [];
        self.modifiedContent = [];
    }
    this.typeofReal = function(value){
        return this.isArray(value) ? "array" : typeof value;
    }

    this.isArray = function(value){
        return value && typeof value === "object" && value.constructor === Array;
    }

    this.appendTimeStamp = function(timeFrame,requiredQuery){
        var frequency;
        if(timeFrame === 'lastWeek'){
            frequency = d3.time.day.offset(new Date(), -7);
        }
        else if(timeFrame === 'lastMonth'){

            frequency = d3.time.day.offset(new Date(), -30);
        }
        var day = d3.time.day(frequency);
        var iso = day.toISOString();
        requiredQuery += "creation_date >= \'"+ iso + '\' AND ' ;
        return requiredQuery;
    }

    this.generateQuery = function(requiredColumns,filterConditions){
        var requiredQuery = this.dataSetEndPoint;
        requiredQuery += '&$select=';
        //Append the required Columns to show in the query
        for (var property in requiredColumns) {
            if (requiredColumns.hasOwnProperty(property)) {

                var propertyValue = requiredColumns[property];
                requiredQuery += propertyValue + ",";

            }
        }
        requiredQuery = requiredQuery.substr(0, requiredQuery.length - 1);
        //Append the filteredConditions to the query
        requiredQuery += '&$where=';
        for (var property in filterConditions) {
            if (filterConditions.hasOwnProperty(property)) {

                var propertyValue = filterConditions[property];
                if (property !== 'timeStamp') {
                    // Handle case for latitude and longitude - Show data between give latitude and longitude positions
                    if(propertyValue instanceof Array){
                        var fromVal = propertyValue[0];
                        var toVal = propertyValue[1];
                        requiredQuery += property + '>=' + fromVal +' AND '+ property + '<=' + toVal + ' AND ';
                    }
                    // Ex:append STATUS=open to the query
                    else{
                        requiredQuery += property + '=\'' + propertyValue + '\' AND ';
                    }
                }
                //if property is timeStamp we have to change condition depending on Weekly or Monthly
                else {
                    requiredQuery = this.appendTimeStamp(propertyValue, requiredQuery);
                }

            }
        }
        requiredQuery = requiredQuery.substr(0, requiredQuery.length - 4);
        return requiredQuery;
    }
    // Reference: http://tlrobinson.net/projects/javascript-fun/jsondiff
    this.startCompare = function(objectA,objectB){

        var HashStore =
        {
            load: function (callback) {
                if (window.location.hash) {
                    try {
                        var hashObject = JSON.parse(decodeURIComponent(window.location.hash.slice(1)));
                        callback && callback(hashObject.d);
                        return;
                    } catch (e) {
                        console.log()
                    }
                }
                callback && callback(null);
            },
            sync: function (object) {
                var hashObject = {d: object};
                window.location.hash = "#" + encodeURIComponent(JSON.stringify(hashObject));
            }
        };

        HashStore.sync({
            a : objectA,
            b : objectB
        });

        this.compareTree(objectA, objectB, "root");
    }

    this.compareTree = function(a, b, name){
        var typeA = this.typeofReal(a);
        var typeB = this.typeofReal(b);

        //if new records are added
        if (a === undefined) {
            if(typeof b === "object"){
                this.addedContent.push(b);
            }
        }
        //if  records are deleted
        else if (b === undefined) {
            if(typeof a === "object"){
                this.deletedContent.push(a);
            }
        }
        //if a record is modified
        else if (typeA !== typeB || (typeA === "object" && typeA !== "array" && JSON.stringify(a) !== JSON.stringify(b))) {
            this.modifiedContent.push(b);
        }

        if (typeA === "object" || typeA === "array" || typeB === "object" || typeB === "array") {
            var keys = [];
            for (var i in a) {
                if (a.hasOwnProperty(i)) {
                    keys.push(i);
                }
            }
            for (var i in b) {
                if (b.hasOwnProperty(i)) {
                    keys.push(i);
                }
            }
            keys.sort();
            for (var i = 0; i < keys.length; i++) {
                if (keys[i] === keys[i - 1]) {
                    continue;
                }
                this.compareTree(a && a[keys[i]], b && b[keys[i]], keys[i]);
            }
        }
    }
}