(function(){
$('.navbar-collapse ul li a').click(function() {
    if($(document).width()<=990){
    $(this).closest('.collapse').collapse('toggle');
    }
});


$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

$("#navbar a").on("click", function(){
   $("#navbar").find(".active").removeClass("active");
   $(this).parent().addClass("active");
});
var modal = document.getElementById('ImpressumModal');

var btn = document.getElementById("impressumBtn");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
})();

// Google Maps Scripts
var map = null;
var width=12.4101671;
var height=51.3263266;
google.maps.event.addDomListener(window, 'load', init);
google.maps.event.addDomListener(window, 'resize', function() {
    map.setCenter(new google.maps.LatLng(height, width));
});

function init() {
    var mapOptions = {
        zoom: 16,
        center: new google.maps.LatLng(height, width),

        disableDefaultUI: true,
        scrollwheel: false,
        draggable: false,
        styles:[]
    };


    var mapElement = document.getElementById('map');

  map = new google.maps.Map(mapElement, mapOptions);

   var image = 'img/marker.png';
    var myLatLng = new google.maps.LatLng(51.326297,12.4109433);
    var beachMarker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: image
    });
}
