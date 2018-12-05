define(["TweenMax"], function (TweenMax) {
	"use strict";
	console.log("mapFiring");
	var mapContainerPointer = document.querySelector('#map-parent');
	var mapContainerPointerTop = getComputedStyle(mapContainerPointer).getPropertyValue("top");
	var closeMapPointer = document.querySelector('#closeMap');
	var mapDetailsPointer = document.querySelector('#contact-map-details');
	var lightsoutPointer = document.querySelector('#lightsout');

	var googleMapsLoaded = false;


	if (!!lightsoutPointer) {
		lightsoutPointer.addEventListener("mousedown", closeGoogleMaps, false)
	};

	if (!!closeMapPointer) {
		closeMapPointer.addEventListener("mousedown", closeGoogleMaps, false)
	};

	showMapContainer(false);




	function closeGoogleMaps(e) {
		TweenMax.to(mapContainerPointer, 1, {
			top: "-100%",
			overwrite: "all",
			ease: Power4.easeOut,
			onStart: function (e) {
				lightsoutPointer.classList.toggle("hidelightsout");
			},
			onComplete: function (e) {
				showMapContainer(false);
			}

		});
		e.stopImmediatePropagation();
	}

	function showMapContainer(b) {
		if (!!mapContainerPointer) {
			var temp = (b === true) ? "block" : "none";
			mapContainerPointer.style.display = temp;
		}
	}


	function showMap(e) {
		var windowHeight = window.innerHeight || document.documentElement.clientHeight

		if (getComputedStyle(mapContainerPointer).getPropertyValue("top")) {

			var mapHeight = getComputedStyle(mapContainerPointer).getPropertyValue("height");
			var mapDetailsHeight = getComputedStyle(mapDetailsPointer).getPropertyValue("height");
			//var scrollTopOffset = (window.pageYOffset || document.scrollTop)  - (document.clientTop || 0);
			mapHeight = parseInt(mapHeight) + parseInt(mapDetailsHeight);
			var percentToMoveInt = ((mapHeight / windowHeight) * 100) >> 0;
			var percentToMoveString = percentToMoveInt + "%";

			console.log(percentToMoveString);
		}



		var maptween = TweenMax.to(mapContainerPointer, 1, {
			top: "10%",
			overwrite: "all",
			ease: Power4.easeOut,
			onStart: function (e) {
				lightsoutPointer.classList.toggle("hidelightsout");
				//addGoogleMapsScript("//maps.googleapis.com/maps/api/js?key=AIzaSyB5gd_h1xWnN6q96bRSOMBDpCRGSyQCeSM&callback=initMap");
				showMapContainer(true);
				addGoogleMapsScript("//maps.googleapis.com/maps/api/js?key=AIzaSyBZ8wif6UyU1TsryPovA5T8IZhYGS714LU&callback=initMap");

			},
			onComplete: function (e) {

			}
		});
	};



	function addGoogleMapsScript(src) {
		if (googleMapsLoaded) return
		var s = document.createElement('script');
		var t;

		s.setAttribute('src', src);
		s.setAttribute("async", true);


		s.onload = function () {
			googleMapsLoaded = true;
			console.log("google maps loaded");
		};
		t = document.getElementsByTagName('script')[0];
		t.parentNode.insertBefore(s, t);
		//document.body.appendChild(s);
	}

	return {
		init: function () {
			showMap();
		}
	};
});