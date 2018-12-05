define(["TweenMax", "LaunchMap"], function (TweenMax, Map) {
	"use strict";

	//kevin.dowd@gmail.com 
	console.log("MainFiring");
	var biopath = "./cv/kdowd_cv.pdf"

	function isMatchMedia() {
		return (("matchMedia" in window) ? true : false);
	}

	function attachNavigationEvents() {
		console.log("attachNavigationEvents");
		var headEle = document.querySelector("#header-container");

		headEle.addEventListener("mousedown", function (e) {

			if (e.target.id.indexOf("nav") === -1) {
				return;
			}

			switch (e.target.id) {
			case "nav-details":
				Map.init();
				break;
			case "nav-bio":
				downloadBio();
				break;
			}
		}, true);
	}

	function downloadBio() {

		var strWindowFeatures = "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes";
		window.open(biopath, "_blank", strWindowFeatures);
	}

	function getParameterByName(name, url) {
		if (!url) url = window.location.href;
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
			results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	}

	return {

		isTouchable: function (eventName) {
			var el = document.createElement('div');
			eventName = 'on' + eventName;
			var isSupported = (eventName in el);
			if (!isSupported) {
				el.setAttribute(eventName, 'return;');
				isSupported = typeof el[eventName] == 'function';
			}
			el = null;
			return isSupported;
		},

		checkBrowser: function () {
			// we only care about FF because it scales SVG groups very slowly / esp with opacity < 100 
			var brwsr = "";
			var n = window.navigator;
			var c = n.userAgent.search("Chrome");
			var f = n.userAgent.search("Firefox");
			var m8 = n.userAgent.search("MSIE 8.0");
			var m9 = n.userAgent.search("MSIE 9.0");
			var saf = n.userAgent.search("Safari");
			if (c > -1) {
				brwsr = "Chrome";
			} else if (f > -1) {
				brwsr = "Firefox";
			} else if (m9 > -1) {
				brwsr = "MSIE 9.0";
			} else if (m8 > -1) {
				brwsr = "MSIE 8.0";
			}
			return brwsr;
		},

		init: function () {
			console.log("MainInited check qs");
			if (getParameterByName("all") === null) {
				var tempEle = document.querySelector("#firstclient");
				if (!!tempEle) {
					//tempEle.style.display = "none";
				}
			}
			attachNavigationEvents();
		}
	};
});