
var gmap = {
    lyon: { lat: 45.764043, lng: 4.835659 },
    markerArray: [],

    initMap: function() {
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 13,
            center: this.lyon,
        });
    },

    initMarker: function(positionStation) {
        marker = new google.maps.Marker({
            map: map,
            icon: "./images/marker_station.png",
            position: positionStation,
        });
        this.markerArray.push(marker);
    },

    groupMarker: function() {
        markerCluster = new MarkerClusterer(map, this.markerArray, {
            imagePath: "./images/m",
        });
    },
    iconMarker: function(dispoStation) {
        if (dispoStation <= 0) {
            marker.icon = "./images/closed_station.png";
        } else if ((dispoStation <= 4) && (dispoStation > 0)) {
            marker.icon = "./images/limited_station.png";
        } else {
            marker.icon = "./images/open_station.png";
        }
    },

};

var station = {
    nom: "",
    adresse: "",
    statut: "",
    nbPlaces: "",
    nbVelo: "",


    recupAllStations: function(allStations) {
        this.nom = allStations.name;
        this.adresse = allStations.address;
        this.statut = allStations.status;
        this.nbPlaces = allStations.available_bike_stands;
        this.nbVelo = allStations.available_bikes;

    }

};

ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=cea111ac5cf1f803a122ae937a3d3bd64a1991a7", function(reponse) {
stationsList = JSON.parse(reponse);

stationsList.forEach(function(returnStations) {
	gmap.initMarker(returnStations.position);

	gmap.iconMarker(returnStations.available_bikes);

});

gmap.groupMarker();
});



