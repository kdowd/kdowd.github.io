console.log("hello from main");



var TypingManager = (function() {
    "use strict";

    function typing_constructor() {
        this.speed = 100;
        this.onStartTypingBinding = this.onStartTyping.bind(this);
        window.addEventListener("onStartTyping", this.onStartTypingBinding, true);
    }


    typing_constructor.prototype = {
        onStartTyping: function() {
            // because we are loopin
        },

        typeWriter: function(text, element, i, fnCallback) {
            if (i < (text.length)) {
                element.innerHTML = text.substring(0, i + 1);

                setTimeout(function() {
                    this.typeWriter(text, element, i + 1, fnCallback)
                }.bind(this), this.speed);
            } else if (typeof fnCallback == 'function') {
                setTimeout(fnCallback, this.speed);
            }
        },

        startTyping: function(element) {
            if (!!element && element.innerText.length > 0 ) {
                var thetext = element.innerText;
                element.innerText = "";
                this.typeWriter(thetext, element, 0, function() {
                    console.log("end type text");
                });
            }



        }
    }

    return typing_constructor
})();


function initTyping() {
    var tm = new TypingManager();
    tm.startTyping(document.querySelector(".h1-responsive-massive-extra"));
}




function onClick(e) {
    e.preventDefault();
    var data = e.target.getAttribute("data-anchor");


    data = (typeof data === "string") && data.trim();
    var testElement = "." + data;
    window.theelement = document.querySelector(testElement);

    if (!!theelement) {
        console.log("onClicked", theelement);

        theelement.scrollIntoView({
            //One of "auto", "instant", or "smooth". Defaults to "auto".
            behavior: "smooth",
            // One of "start", "center", "end", or "nearest".Defaults to "center".
            block: "start",
            // One of "start", "center", "end", or "nearest".Defaults to "nearest".
            inline: "nearest"
        });

        setTimeout(function() {
            window.location.hash = data
        }.bind(this), 100);
    }

    return false;
}

function checkHambuger() {
    // Get all "navbar-burger" elements
    var navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any navbar burgers
    if (navbarBurgers.length > 0) {

        // Add a click event on each of them
        navbarBurgers.forEach(function(el) {
            el.addEventListener('click', function() {

                // Get the target from the "data-target" attribute
                var target = el.dataset.target;
                var ele = document.getElementById(target);

                // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                el.classList.toggle('is-active');
                ele.classList.toggle('is-active');

            });
        });
    }
}


function main(e) {

    var navwrapper = document.querySelector(".navbar-end");
    if (!!navwrapper) {
        navwrapper.addEventListener("click", onClick, false);
    }
    checkHambuger();
    initTyping();

}
document.addEventListener("DOMContentLoaded", main, false);