function updatesHandler(){

    /*** WEATHER ***/
    setInterval(function(){
        console.log("[UPDATES HANDLER] : Updating Weather");
        console.log("[EVENT] : WEATHER");
        amplify.publish("WEATHER")}, 20000);

}