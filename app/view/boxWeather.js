function boxWeather(container, map, customControl){

    var control = new customControl(callback, { position: 'topleft' });

    var selection = d3.select(control._container);

    this.getSelection = function() {
        return selection;
    };

    var id_icon,
        id_date,
        id_condition,
        id_temp,
        date,
        time;

    function callback(selection) {

        selection
            .attr("id", "weather");

        var flex, scale;

        id_date = "date";
        flex = 2;
        date = selection.append("div")
            .style({ "font-size": flex + "vh" })
            .attr({ id: id_date });

        id_time = "time";
        flex = 3;
        time = selection.append("div")
            .style({ "font-size": flex + "vh", "line-height": 1 })
            .attr({ id: id_time });

        id_icon = "weather_icon";
        flex = 9;
        selection.append("div")
            .style({ flex: flex })
            .append("img")
            .attr({ id: id_icon })
            .style({ height: flex + "vh" })

        id_condition = "conditions";
        flex = 2;
        selection.append("div")
            .style({ "font-size": flex + "vh" })
            .attr({ id: id_condition });

        id_temp = "temp";
        flex = 3;
        selection.append("div")
            .style({ "font-size": flex + "vh" })
            .attr({ id: id_temp });

        // window.foo = time.node().parentNode;

    }

    (function() {
        map.addControl(control);
        console.log(time.node().parentNode.getBoundingClientRect());
        console.log(time.node().clientWidth);
    }())

    var height = 174;
    var width = 789;
    // var id_condition = "condition";
    var id_time = "time";
    // var id_temp_c = "temp_c";
    // var id_temp_f = "temp_f";

    var id_icon_c = "icon_c";
    var id_icon_f = "icon_f";
    // var id_icon_temp = "icon_thermo";
    var icon_size = height;


    // var sunset;
    // var sunrise;
    // var time;

    var rows = 2;
    var svg;
    var xScale;
    var yScale;
    var text_size = height * 0.2;

    var weather = weather;
    var icons = new iconsWeather();

    var sunrise, sunset;
    this.setSunriseSunset = function(data) {
        var sunrise_hour = data.sunrise_hour;
        var sunrise_minute = data.sunrise_minute;
        var sunset_hour = data.sunset_hour;
        var sunset_minute = data.sunset_minute;

        var format = d3.time.format("%H-%M");
        sunrise = format.parse(sunrise_hour + "-" + sunrise_minute);
        sunset = format.parse(sunset_hour + "-" + sunset_minute);

    };

    this.updateAll = function(data){
        this.updateTime();
        this.updateTemperature(data);
        this.updateWeather(data);
    };

    // var id_temp_c = "temp_c";
    // var id_temp_f = "temp_f";
    // var id_icon_temp = "icon_thermo";
    this.updateTemperature = function(data){
        var deg = encodeURIComponent("º");
        d3.select("#" + id_temp)
            .text(data.temp_f + "\260F " + data.temp_c + "\260C" );
    };

    var now;
    this.updateTime = function(){
        now = new Date();

        var dateFormat = d3.time.format("%B %e");
        var timeFormat = d3.time.format("%_I:%M %p");

        date.text(dateFormat(now));
        time.text(timeFormat(now));

    }

    this.updateWeather = function(data){
        d3  .select("#" + id_icon)
            .attr("src", function(){
                if (isSunny()){
                    return icons.getIcon(data.iconName)}
                else
                    return icons.getIcon(data.iconName+"Moon")});

        d3  .select("#" + id_condition)
            .text(data.condition);

    };

    var isSunny = function(){
        if(time>=sunrise && time<=sunset) {
            return true;
        }
        else return false;
    };


}
