 
		document.addEventListener('DOMContentLoaded', function (e) {
			$("#tableSearchResults").click(function (e) {

			var target = $( e.target );

			if (target.is("td")){
				var nextTD = $(e.target).next("td");
				var nextGlyph = nextTD.find("i");

				if (nextGlyph.hasClass("glyphicon-menu-up")) {
					showContractedIcon(nextGlyph);
				} else {
					showExpandedIcon(nextGlyph);
				}
			}

			if (target.is("i")){
				if (target.hasClass("glyphicon-menu-up")) {
					showContractedIcon(target);
				} else {
					showExpandedIcon(target);
				}
			}

				e.preventDefault();
			});


			function showExpandedIcon(ele) {
				ele.removeClass("glyphicon-menu-down").addClass("glyphicon-menu-up");
			}

			function showContractedIcon(ele) {
				ele.removeClass("glyphicon-menu-up").addClass("glyphicon-menu-down");
			}

		});
