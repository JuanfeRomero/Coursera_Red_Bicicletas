var mymap = L.map("main_map").setView([-34.6012424, -58.3861497], 15);

const accessToken =
    "pk.eyJ1IjoianVhbmZlcm9tZXJvIiwiYSI6ImNrZ3QwZWEyZjE1YXQycnIzYWg5YjZ3eDgifQ.UcYj7Ytgvua8nHNX65Jq-w";

L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
        attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken: accessToken,
    }
).addTo(mymap);
var marker = L.marker([-34.6040424, -58.3815]).addTo(mymap);

fetch("api/bicicletas")
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        console.log(data);
        data.bicicleta.forEach((bici) => {
            L.marker(bici.ubicacion, { title: bici._id }).addTo(mymap);
        });
    })
    .catch((err) => console.log(err));

/*
-Metodo de acceder a la API original del curso.
$.ajax({
    dataType: "json",
    url: "api/bicicletas",
    success: function(result){
        console.log(result);
        result.bicicletas.forEach(function(bici){
            L.marker(bici.ubicacion, {title: bici.id}).addTo(mymap);
        });
    }
})
*/
