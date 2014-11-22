function boxWeather(container, map, customControl){

    var control = new customControl(callback);
    map.addControl( control );

    var selection = d3.select(control._container);

    this.getSelection = function() {
        return selection;
    };

    function callback(selection) {

    }

    var height = 174;
    var width = 789;
    var id_condition = "condition";
    var id_time = "time";
    var id_temp_c = "temp_c";
    var id_temp_f = "temp_f";
    var id_icon = "weather_icon";
    var id_icon_c = "icon_c";
    var id_icon_f = "icon_f";
    var id_icon_temp = "icon_thermo";
    var icon_size = height;


    var sunset;
    var sunrise;
    var time;

    var rows = 2;
    var svg;
    var xScale;
    var yScale;
    var text_size = height * 0.2;

    var weather = weather;
    var icons = new iconsWeather();

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

    this.updateTemperature = function(data){
        d3  .select("#" + id_temp_c)
            .text(data.temp_c);

        d3  .select("#" + id_temp_f)
            .text(data.temp_f);

        d3  .select("#" + id_icon_temp)
            .attr("xlink:href", function(d){
                if (data.temp_f<=0 && data.temp_f<=25)
                    return icons.getIcon("thermo0");
                if (data.temp_f>0 && data.temp_f<=25)
                    return icons.getIcon("thermo25");
                if (data.temp_f>25 && data.temp_f<=50)
                    return icons.getIcon("thermo50");
                if (data.temp_f>50 && data.temp_f<=75)
                    return icons.getIcon("thermo75");
                if (data.temp_f>100)
                    return icons.getIcon("thermo100");
            })
    };

    this.updateTime = function(){
        var now = new Date();
        var day = now.getDate();
        var month = (now.getMonth());
        var year = now.getFullYear();
        var hours = now.getHours();
        var minutes = now.getMinutes();

        var format = d3.time.format("%H-%M");
        time = format.parse(hours + "-" + minutes);

        var monthNames = [ "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December" ];

        function getMonth(d){
            return monthNames[month];
        };

        function nth(d) {
            if(d>3 && d<21) return 'th';
            switch (d % 10) {
                case 1:  return "st";
                case 2:  return "nd";
                case 3:  return "rd";
                default: return "th";
            }
        }


        d3  .select("#" + id_time)
            .text(hours + ":" + minutes + " - " +  " " + getMonth(month) + " " + day + nth(day) + " " + year);
    }

    this.updateWeather = function(data){
        d3  .select("#" + id_icon)
            .attr("xlink:href", function(){
                if (isSunny()){
                    return icons.getIcon(data.iconName)}
                else
                    return icons.getIcon(data.iconName+"Moon")});

        d3  .select("#" + id_condition)
            .text("Condition : " + data.condition);

    };

    var isSunny = function(){
        if(time>=sunrise && time<=sunset) {
            return true;
        }
        else return false;
    };

    var init = function(){

        xScale = d3 .scale
                    .linear()
                    .domain([0,5])
                    .range([icon_size,width]);

        yScale = d3 .scale
                    .linear()
                    .domain([0, rows])
                    .range([0,height]);

        svg = d3    .select(container)
                    .append("svg")
                    .attr("viewBox","0 0 " + width + " " + height)
                    .attr("preserveAspectRatio", "xMidYMid meet")
                    .attr("width", "100%")
                    .attr("height", "100%");

        svg .append("text")
            .attr("id",id_time)
            .attr("text-anchor","middle")
            .attr("x",width/2)
            .attr("y",text_size)
            .style("font-size",text_size)
            .style("font-weight","bold");

        svg .append("text")
            .attr("id",id_condition)
            .attr("text-anchor","start")
            .attr("x",icon_size)
            .attr("y",yScale(1))
            .style("font-size",text_size)
            //.text("Weather : " + weather.condition);


        svg .append("image")
            .attr("id",id_icon_c)
            .attr("xlink:href", function(d){return icons.getIcon("Celsius");})
            .attr("x", xScale(4))
            .attr("y", yScale(1))
            .attr("width",100)
            .attr("height",100);


        svg .append("text")
            .attr("id",id_temp_c)
            .attr("text-anchor","start")
            .attr("x",xScale(3))
            .attr("y",yScale(2)-text_size)
            .style("font-size",text_size)
            //.text(weather.temp_c);

        svg .append("image")
            .attr("id",id_icon_f)
            .attr("xlink:href", function(d){return icons.getIcon("Fahrenheit");})
            .attr("x", xScale(1))
            .attr("y", yScale(1) - text_size)
            .attr("width",100)
            .attr("height",100);

        svg .append("image")
            .attr("id",id_icon_temp)
            //.attr("xlink:href", function(d){return icons.getIcon("thermo50");
              //  })
            .attr("x", xScale(2))
            .attr("y", yScale(1) - text_size)
            .attr("width",100)
            .attr("height",100);

        svg .append("text")
            .attr("id",id_temp_f)
            .attr("text-anchor","start")
            .attr("x",xScale(0))
            .attr("y",yScale(2)-text_size)
            .style("font-size",text_size)
            //.text(weather.temp_f);

        svg .append("image")
            .attr("id",id_icon)
            //.attr("xlink:href", function(d){return icons.getIcon(weather.iconName);})
            .attr("x","0")
            .attr("y", height - icon_size)
            .attr("width",icon_size)
            .attr("height",icon_size);
    }();
}
