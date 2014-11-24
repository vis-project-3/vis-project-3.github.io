function popupFoodInspection(){

    this.generatePopupContent = function(data){
        var iconObject = new iconsApp();
        var icon = "<p><img src=\"" + iconObject.getIcon("food") + "\"/></p>"
        var name = "<h3><b>Name : </b>" + data.dba_name + "</h3>";
        var inspectionDate  = "<h3><b>Inspected on : </b>" + data.inspection_date + "</h3>";

        return icon + name + inspectionDate;
    }
}