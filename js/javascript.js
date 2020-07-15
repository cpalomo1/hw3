$(document).ready( function() {
    $("#zipError").html("");
});


$("#zipInput").on("change", function() {
    if(!checkValid()) {
        $("#zipError").html("Error: invalid zip code");
        $("#city").html("");
        $("#temperature").html("");
        $("#humidity").html("");
        $("#wind").html("");
    } else {
        $("#zipError").html("");
        $.ajax({
               method:"GET",
               url: "https://api.openweathermap.org/data/2.5/weather?zip=" + $("#zipInput").val() + ",us&appid=5e873dded353c03b51f1a37aa6d658f3",
               dataType: "json",
               success: function(result, status) {
                    var tempUnits = Math.floor((result.main.temp-273.15)*(9/5)+32);
                    $("#city").html(result.name);
                    $("#temperature").html(tempUnits + " degrees (F)");
                    $("#humidity").html(result.main.humidity + "%");
                    $("#wind").html(result.wind.speed + " mph");
               },
               error: function(result, status) {
                    $("#zipError").html("Error: invalid zip code");
                    $("#city").html("");
                    $("#temperature").html("");
                    $("#humidity").html("");
                    $("#wind").html("");
               }
        });
    }
});

function checkValid(){
    isValid = true;
    if($("#zipInput").val().length != 5) {
        isValid = false;
    }
    return isValid;
}