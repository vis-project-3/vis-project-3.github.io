// http://data.cityofchicago.org/resource/7as2-ds3y.json?';
//        var filter1 = 'STATUS=Open&';
//        $.getJSON(potHolesAccessEndPoint+filter1+'ZIP=' + zip

d3.json("http://data.cityofchicago.org/resource/7as2-ds3y.json");

var apiEndpoints = {
	potholes: "http://data.cityofchicago.org/resource/7as2-ds3y.json"
}

function getData(fromLng, fromLat, toLng, toLat, fromDate) {

}

function query(type) {
	var query,
		endpoint = apiEndpoints[type],
		my = {};

	function addParam(param) {

	}

	my.fromLng(longitude) {
		addParam
	}

	my.logQuery = function() {
		console.log(query);
	}

	return my;
}

// query("potholes").fromLng("-87.6").fromLat("41.8").toLng("-87.7").toLat("41.9").logQuery();
query("potholes")
	.fromLng("-87.6")
	.logQuery();