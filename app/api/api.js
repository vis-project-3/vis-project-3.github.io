
var apiEndpoints = {
	potholes: "http://data.cityofchicago.org/resource/7as2-ds3y.json?"
}

function query(type) {
	var endPoint = apiEndpoints[type],
		query = endPoint,
		where = "",
		limit = "",
		minLongitude = -88,
		maxLongitude = -87.5,
		minLatitude = 41.6,
		maxLatitude = 42.2,
		fromLng, toLng,
		fromLat, toLat,
		my = {};

	function buildQuery() {
		if (where.length) addParam(where);
		if (limit.length) addParam(limit);
		where = "";
	}
	function addParam(param) {
		var lastChar = query.substr(query.length - 1);
		// var isFirstParam = lastChar === "?";
		var ampersand = (lastChar === "?") ? "" : "&";
		query += ampersand + param;
	}
	function addWhere(whereString) {
		if (! where.length) where = "$where=";
		else where += " AND ";
		where += whereString;
	}

	my.addParam = function(param) {
		addParam(param);
		return my;
	}

	my.addWhere = function(string) {
		addWhere(string);
		return my;
	}

	my.fromLng = function(longitude) {
		longitude = parseFloat(longitude);
		if (longitude > maxLongitude)
			throw new Error("Longitude " + longitude + " is out of bounds.");
		fromLng = longitude;
		if (toLng && fromLng >= toLng)
			throw new Error("FromLng >= ToLng.");
		addWhere("longitude >= " + fromLng);
		return my;
	};

	my.toLng = function(longitude) {
		longitude = parseFloat(longitude);
		if (longitude < minLongitude)
			throw new Error("Longitude " + longitude + " is out of bounds.");
		toLng = longitude;
		if (fromLng && fromLng >= toLng)
			throw new Error("FromLng >= ToLng.");
		addWhere("longitude <= " + toLng);
		return my;
	}

	my.fromLat = function(latitude) {
		latitude = parseFloat(latitude);
		if (latitude > maxLatitude)
			throw new Error("Latitude " + latitude + " is out of bounds.");
		fromLat = latitude;
		if (toLat && fromLat >= toLat)
			throw new Error("FromLat >= ToLat.");
		addWhere("latitude >= " + fromLat);
		return my;
	}

	my.toLat = function(latitude) {
		latitude = parseFloat(latitude);
		if (latitude < minLatitude) 
			throw new Error("Latitude " + latitude + " is out of bounds.");
		toLat = latitude;
		if (fromLat && fromLat >= toLat)
			throw new Error("FromLat >= ToLat.");
		addWhere("latitude <= " + toLat);
		return my;
	}

	my.limit = function(lim) {
		limit = "$limit=" + parseInt(lim);
		return my;
	}

	my.get = function() {
		buildQuery();
		console.info("Query: ", query);
		return query;
	}

	return my;
}

var query = query("potholes")
	.fromLat("41.8")
	.fromLng("-87.8")
	.toLat("41.9")
	.toLng("-87.6")
	.limit(100)
	.addWhere("status = 'open'")
	.get();

d3.json(query, function(data) { console.log(data); });
	
