var idNum = 0;
var loc;
var locationName;
var map;
var latitude;
var longitude;


function lookupLatLong_Complete(result) {
    latitude = result.results[0].geometry.location.lat;
    longitude = result.results[0].geometry.location.lng;
    locationName = result.results[0].address_components[1].long_name + "," +
        result.results[0].address_components[2].short_name;
    GetMap();

    console.log("The lat and long is " + latitude + ", " + longitude);
    console.log("The location is " + locationName);


    var template = $(".template").html();
    template = template.replace("@@IDNUM@@", idNum);
    template = template.replace("@@LOCATION@@", locationName);
    template = template.replace("@@CLOSENUM@@", idNum);

    $(".container").prepend(template);

    idNum++;
}


function initMap() {
    var myLatlng = new google.maps.LatLng(latitude, longitude);
    map = new google.maps.Map(document.getElementById('Map'), {
        center: myLatlng,
        //{ lat: parseInt(latitude), lng: parseInt(longitude) },
        zoom: 8
    });
    console.log(myLatlng);
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: 'You are here!'
    });
    marker.setMap(map);
};
function GetMap() {
    var GoogleMapUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyC3Wjk_vqQdy7KbpXC5ytqTihE6qOWprpM&callback=initMap";
    $.ajax({
        url: GoogleMapUrl,
        dataType: "jsonp",
        success: initMap,
    });
}

function lookupLatLong(city, state, zipcode) {
    var address = "";
    if (zipcode.length != 0) {
        address = zipcode.trim();
    }
    else if (city.length != 0 && state != 0) {
        address = city.trim() + ", " + state;
    }
    else {
        return;
    }
    console.log("The address: " + address)
    //show the box
    var googleUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyC9uhvHVQaLhZRW8ksdWitiwDiuHxuCJ7U";
    $.ajax({
        url: googleUrl,
        success: lookupLatLong_Complete,
    });
}



function lookupWeatherForPostalCode_Click() {
    var zipCode = $("#inputTextZip").val();
    lookupLatLong("", "", zipCode);
}

$(function () {
    $("#sendZip").on("click", lookupWeatherForPostalCode_Click);
    $(document).on('click', '.closeBtn', function () {
        $(this).closest('.card').remove();
    });
});

