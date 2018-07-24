// Initialisation de la carte

var map;

function initMap() {
    var lyon = { lat: 45.764043, lng: 4.835659 };
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: lyon
    });

    //Récupération des stations pour création tableau
    ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=cea111ac5cf1f803a122ae937a3d3bd64a1991a7",
        function(reponse) {
            // Transforme la réponse en tableau d'objets JavaScript
            var stations = JSON.parse(reponse);
            var markers = [];
            stations.forEach(function(station) {
                this.latitude = station.position.lat;
                this.longitude = station.position.lng;
                var LatLng = new google.maps.LatLng(this.latitude, this.longitude);
                var marker = new google.maps.Marker({
                    position: LatLng,
                    icon: "./images/marker_station.png",
                    label: "",

                });



                if (station.available_bikes <= 0) {
                    marker.icon = "./images/close_station.png";

                } else {
                    marker.icon = "./images/open_station.png";
                    marker.label = station.available_bikes;


                }
                
                markers.push(marker);
            });
            var markerCluster = new MarkerClusterer(map, markers, {
                imagePath: "./images/m"
            });

        })
    marker.initMarker();
}