
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
    emplacementDonnees : document.getElementById("listeInfo").querySelectorAll("span"),


    recupAllStations: function(allStations) {
        this.nom = allStations.name;
        this.adresse = allStations.address;
        this.statut = allStations.status;
        this.nbPlaces = allStations.available_bike_stands;
        this.nbVelos = allStations.available_bikes;

    },

    DonneesStation : function() {
        document.getElementById("nomStation").innerHTML = this.nom;
        document.getElementById("statutStation").innerHTML = this.statut;
        document.getElementById("veloDispo").innerHTML = this.nbVelos;
        document.getElementById("placeDispo").innerHTML = this.nbPlaces;
    }

};

ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=cea111ac5cf1f803a122ae937a3d3bd64a1991a7", function(reponse) {
stationsList = JSON.parse(reponse);

stationsList.forEach(function(returnStations) {
	gmap.initMarker(returnStations.position);

	gmap.iconMarker(returnStations.available_bikes);

    google.maps.event.addListener(marker, "click", function() {
        station.recupAllStations(returnStations);
        station.DonneesStation();
    });


});

gmap.groupMarker();
});



