/**
 * Created by theja on 11/5/14.
 */
function potholesDataSet(){
    //constructor code goes here
    this.dataSetEndPoint = 'http://data.cityofchicago.org/resource/7as2-ds3y.json?';
    this.potholesJSON;
    this.previousPotholesJSON;
    this.result = window.document.createElement("div");

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
        requiredQuery += '$select=';
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
                    // Ex:append STATUS=open to the query
                    requiredQuery += property + '=\'' + propertyValue + '\' AND ';
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
}


//Functions Needed:
//1. getData() - return a JSON object
//2. getUpdatedData() - return a JSON object which has only changed data

//requiredColumns contains all the fields that has to be returned from API
//filterConditions contain 2 properties: timeStamp(defines if we need monthly data or weekly data) and
//itemStatus (is a filter on Items. Ex: get only potholes whose status is open)

potholesDataSet.prototype.getData = function(requiredColumns,filterConditions){

    var query = this.generateQuery(requiredColumns,filterConditions);
    d3.json(query, function(data) {
            this.potholesJSON = data;
            this.previousPotholesJSON = data;
        }
    );

}



potholesDataSet.prototype.getUpdatedData =  function(requiredColumns,filterConditions) {

    var query = this.generateQuery(requiredColumns,filterConditions);
    d3.json(query, function (data) {
            var currentData = data;
            var previousData = this.previousPotholesJSON;
            //Find diff between current and previous data
            //this.startCompare(previousData,currentData);
        }
    );
}

potholesDataSet.prototype.startCompare = function(objectA,objectB){

    var objA, objB;
    objA = JSON.parse(objectA);
    objB = JSON.parse(objectB);
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

    this.compareTree(objA, objB, "root");
}

potholesDataSet.prototype.compareTree = function(a, b, name){
    var typeA = this.typeofReal(a);
    var typeB = this.typeofReal(b);

    var typeSpanA = document.createElement("span");
    typeSpanA.appendChild(document.createTextNode("("+typeA+")"))
    typeSpanA.setAttribute("class", "typeName");

    var typeSpanB = document.createElement("span");
    typeSpanB.appendChild(document.createTextNode("("+typeB+")"))
    typeSpanB.setAttribute("class", "typeName");

    var aString = (typeA === "object" || typeA === "array") ? "" : String(a) + " ";
    var bString = (typeB === "object" || typeB === "array") ? "" : String(b) + " ";

    var leafNode = document.createElement("span");
    leafNode.appendChild(document.createTextNode(name));
    if (a === undefined) {
        leafNode.setAttribute("class", "added");
        leafNode.appendChild(document.createTextNode(": " + bString));
        leafNode.appendChild(typeSpanB);
    }
    else if (b === undefined) {
        leafNode.setAttribute("class", "removed");
        leafNode.appendChild(document.createTextNode(": " + aString));
        leafNode.appendChild(typeSpanA);
    }
    else if (typeA !== typeB || (typeA !== "object" && typeA !== "array" && a !== b)) {
        leafNode.setAttribute("class", "changed");
        leafNode.appendChild(document.createTextNode(": " + aString));
        leafNode.appendChild(typeSpanA);
        leafNode.appendChild(document.createTextNode(" => "+ bString));
        leafNode.appendChild(typeSpanB);
    }
    else {
        leafNode.appendChild(document.createTextNode(": " + aString));
        leafNode.appendChild(typeSpanA);
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

        var listNode = document.createElement("ul");
        listNode.appendChild(leafNode);

        for (var i = 0; i < keys.length; i++) {
            if (keys[i] === keys[i-1]) {
                continue;
            }
            var li = document.createElement("li");
            listNode.appendChild(li);

            this.compareTree(a && a[keys[i]], b && b[keys[i]], keys[i], li);
        }
        this.result.appendChild(listNode);
    }
    else {
        this.result.appendChild(leafNode);
    }
}