require.config({
	baseUrl: "./src/js",
	paths: {
		"TweenMax": "TweenMax.min",
		"Main": "main",
		"SVGEngine": "svgengine",
		"IconGroup": "icongroup",
		"LaunchMap": "showGoogleMap",
		"Amplify": "amplify.core.min"

	},
	config: {
		utils: {
			build: (function () {
				var currentHost = window.location.hostname;
				return (currentHost === "localhost" || currentHost === "127.0.0.1") ? true : false;
			})(),
			networkpath: ""

		}
	},
	map: {
		"*": {}
	}
});