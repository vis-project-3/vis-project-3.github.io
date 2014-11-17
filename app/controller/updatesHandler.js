function updatesHandler(){

    /*** WEATHER ***/
    setInterval(function(){
        console.log("[EVENT] : WEATHER");
        console.log("[UPDATES HANDLER] : Updating Weather");
        amplify.publish("WEATHER")}, 20000);

}