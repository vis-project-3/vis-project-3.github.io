
var chicagoEndpoint = "http://data.cityofchicago.org/resource/";

var apiEndpoints = {
	potholes: chicagoEndpoint + "7as2-ds3y.json?",
	vehicles: chicagoEndpoint + "3c9v-pnva.json?",
	lightsAll: chicagoEndpoint + "zuxi-7xem.json?",
	lightsOne: chicagoEndpoint + "3aav-uy2v.json?",
	crime: chicagoEndPoint + "ijzp-q8t2.json?"
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

	var lastChar = endPoint.substr(endPoint.length - 1);
	if (lastChar !== "?") endPoint += "?";

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

	my.fromDate = function(date) {
		var day = d3.time.day(date);
		var iso = day.toISOString();
		addWhere("creation_date >= '" + iso + "'");
		return my;
	}

	my.type = function() { return type; };

	my.get = function() {
		buildQuery();
		console.info("Query: ", query);
		return query;
	}

	return my;
}

var lastWeek = d3.time.day.offset(new Date(), -7);
var yesterday = d3.time.day.offset(new Date(), -2);
var date = lastWeek;

var potholesQuery = query("potholes")
	.fromLat("41.8")
	.fromLng("-87.8")
	.toLat("41.9")
	.toLng("-87.6")
	.fromDate(date)
	.limit(100)
	.addWhere("status = 'open'");

var vehiclesQuery = query("vehicles")
	.fromLat("41.8")
	.fromLng("-87.8")
	.toLat("41.9")
	.toLng("-87.6")
	.fromDate(date)
	.limit(100);

d3.json(potholesQuery.get(), function(data) { console.log(potholesQuery.type(), data); });
d3.json(vehiclesQuery.get(), function(data) { console.log(vehiclesQuery.type(), data); });
	
