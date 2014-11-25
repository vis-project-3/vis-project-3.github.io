
// var chicagoEndpoint = "http://data.cityofchicago.org/resource/";

// var apiEndpoints = {
// 	potholes: chicagoEndpoint + "7as2-ds3y.json?",
// 	vehicles: chicagoEndpoint + "3c9v-pnva.json?",
// 	lightsAll: chicagoEndpoint + "zuxi-7xem.json?",
// 	lightsOne: chicagoEndpoint + "3aav-uy2v.json?",
// 	crime: chicagoEndpoint + "ijzp-q8t2.json?",
// 	divvy: "http://sortieapp.com/sortie/divvy"
// }

function chicagoQuery() {
	var chicago = "https://data.cityofchicago.org/resource/";

	var where = "",
		limit = "",
		minLongitude = -88,
		maxLongitude = -87.5,
		minLatitude = 41.6,
		maxLatitude = 42.2,
		fromLng, toLng,
		fromLat, toLat;

	my = function() {
		buildQuery();
		return query;
	}

	function buildQuery() {
		if (where.length) addParam(where);
		if (limit.length) addParam(limit);
	}

	function addParam(param) {
		var lastChar = query.substr(query.length - 1);
		var ampersand = (lastChar === "?") ? "" : "&";
		query += ampersand + param;
	}

	function addWhere(whereString) {
		if (! where.length) where = "$where=";
		else where += " AND ";
		where += whereString;
	}

	var query;
	my.setEndPoint = function(end) {
		query = chicago + end;
		return my;
	}

	my.addParam = function(param) {
		addParam(param);
		return my;
	}

	my.where = function(string) {
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

	my.queryRect = function(queryRect) {
		my.fromLat(queryRect.getSouth());
		my.fromLng(queryRect.getWest());
		my.toLat(queryRect.getNorth());
		my.toLng(queryRect.getEast());
		return my;
	}

	my.limit = function(lim) {
		limit = "$limit=" + parseInt(lim);
		return my;
	}

	var dateColumn = my.dateColumn = (new Utility).getSet.bind(this)("creation_date");

	my.fromDate = function(date) {
		var day = d3.time.day(date);
		var iso = day.toISOString();
		addWhere(dateColumn() + " >= '" + iso + "'");
		return my;
	}

	my.type = function() { return type; };

	return my;
}
