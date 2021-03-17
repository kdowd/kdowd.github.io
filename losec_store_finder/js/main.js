const key = "AIzaSyD5E8tp8tzJmpcuMWJm6QalwOhmRwyVUBY";
//const key = "AIzaSyAlsTeUYvBwAvNTOfZwvgMd_cTB-cKL9-E";
const libs = "&libraries=places";

window.addEventListener(
  "DOMContentLoaded",
  (e) => {
    loadStoresJSON();
  },
  false
);

function loadStoresJSON() {
  fetch("./unichemdata.json")
    .then((response) => response.json())
    .then((response) => (window.locationsJSON = response))
    .then(() => {
    console.log("get the gmaps");
      var t = setTimeout(
        function () {
           console.log("get the gmaps 2");
            loadScript(
              `//maps.googleapis.com/maps/api/js?key=${
                key + libs
              }&callback=initMap`
            );
          
        }.bind(this),
        500
      );
    });
}

function initMap() {
  let mapClass = new StoreMaps(document.querySelector(".map-container "));
  mapClass.showMap();
  mapClass.showMarkers(window.locationsJSON);

  let nearestStores = new FindNearestStores(9);
  nearestStores.data = window.locationsJSON;
}

// from form submit
function onLocationSearch(e) {
  e.preventDefault();
  var address = e.target.elements[0].value;

  new LocationSearch(address).geocodeAddress();
  // geocodeAddress(address);
  //https://developers.google.com/maps/documentation/javascript/reference
}
