var CubeManager = (function () {
    "use strict";

    function cube_constructor() {
        this.initialDelay = 4000;
        this.$delay = 4000;
        this.baseSpeed = 0.016;
        this.speed = this.baseSpeed;
        this.touching = false;
        this.viewFaceTimeout;
        this.animationBind = this.animate.bind(this);


        window.addEventListener("onCubeTouch", this.onTouched.bind(this), true);
        window.addEventListener("onCubeTouchEnd", this.onTouchEnd.bind(this), true);
        window.addEventListener("onCubeMouseLeave", this.onMouseLeave.bind(this), true);
        window.addEventListener("onCubeMouseEnter", this.onMouseEnter.bind(this), true);
        window.addEventListener("onImagesLoaded", this.firstplay.bind(this), true);



        Object.defineProperty(this, "cube_camera", {
            enumerable: true,
            configurable: false,
            set: function (o) {
                this.$camera = o;
            }
        });


        Object.defineProperty(this, "cube_scene", {
            enumerable: true,
            configurable: false,
            set: function (o) {
                this.$scene = o;
            }
        });


        Object.defineProperty(this, "cube_mesh", {
            enumerable: true,
            configurable: false,
            set: function (o) {
                this.$mesh = o;
            }
        });

        Object.defineProperty(this, "initial_cube_rotation", {
            enumerable: true,
            configurable: false,
            set: function (n) {
                this.$initialCubeRotation = n;
                this.$mesh.rotation.set(0, n, 0);
                this.$renderer.render(this.$scene, this.$camera);
                // needs this prodding/short delay to render sometimes

            }
        });


        Object.defineProperty(this, "cube_renderer", {
            enumerable: true,
            configurable: false,
            set: function (o) {
                this.$renderer = o;

            }
        });

    }

    // put these in utils
    function broadcast_data(name, data) {
        // there is a polyfill for this
        var evt = new CustomEvent(name, {
            'detail': data
        }, true, false);
        window.document.dispatchEvent(evt);
    }

    function broadcast_event(name) {
        var evt = null;
        try {
            evt = new Event(name);
        } catch (error) {
            evt = document.createEvent("Event");
            evt.initEvent(name, true, false);
        }
        window.dispatchEvent(evt);
    }

    cube_constructor.prototype = {
        broadcast_data: function (name, data) {
            // there is a polyfill for this
            var evt = new CustomEvent(name, {
                'detail': data
            }, true, false);
            window.document.dispatchEvent(evt);
        },
        show: function () {
            // does this work ?
            this.$mesh.rotation.y -= 0.008;
            this.$renderer.render(this.$scene, this.$camera);
        },
        firstplay: function(){
            window.removeEventListener("onImagesLoaded", this.firstplay);

            this.$mesh.rotation.y -= this.speed;
            this.$renderer.render(this.$scene, this.$camera);

            window.setTimeout(function(){this.animate()}.bind(this), this.initialDelay);
        },
        play: function () {
        
            this.animate();
        },

        get_degrees: function () {
            return ((THREE.Math.radToDeg(this.$mesh.rotation.y)) >> 0) //% 360;
        },
        bump_cube_forward: function () {
            //console.log("bump_cube_forward");
            this.$mesh.rotation.set(0, this.$mesh.rotation.y -= 0.033, 0);
            this.speed = this.baseSpeed;
        },

        onMouseEnter: function () {
            // this.speed = 0;
        },

        onMouseLeave: function () {
            this.touching = false;
            this.speed = this.baseSpeed;
        },

        onTouched: function (e) {
            //console.log("onTouched");
            this.touching = true;
            this.destroyStall();
            this.speed = 0;
        },
        onTouchEnd: function (e) {
            // //console.log("end roation = ", this.get_degrees() % 360);
            this.touching = false;
            this.speed = this.baseSpeed;
        },
        destroyStall: function () {
            //console.log(this.viewFaceTimeout,  " this.viewFaceTimeout")
            window.clearTimeout(this.viewFaceTimeout);
            this.viewFaceTimeout = null;
        },

        stallCube: function () {
            this.speed = 0;

            if (!this.viewFaceTimeout && !this.touching) {
                this.viewFaceTimeout = setTimeout(function () {
                    this.destroyStall();
                    this.bump_cube_forward();
                }.bind(this), this.$delay);
            }
        },


        animate: function () {
            // //console.log(((this.$mesh.getWorldRotation().y * 180 / Math.PI) >> 0));

            var deg = this.get_degrees() % 360;
            deg = Math.abs(deg);
            // //console.log(deg);


            switch (deg) {
                case (90):
                    //Enabler.counter("showFaceOne", true);
                    this.broadcast_data("onNewCubeFace", 1);
                    this.stallCube();
                   
                    break;
                case (180):
                    //Enabler.counter("showFaceTwo", true);
                    this.broadcast_data("onNewCubeFace", 2);
                    this.stallCube();
                  
                    break;
                case (270):
                    //Enabler.counter("showFaceThree", true);
                    this.broadcast_data("onNewCubeFace", 3);
                    this.stallCube();
                  
                    break;
                case (359):
                    //Enabler.counter("showFaceFour", true);
                    this.broadcast_data("onNewCubeFace", 4);
                    this.stallCube();
                   
                    break;
            }
            // //console.log(this.viewFaceTimeout, " -- " )

            this.$mesh.rotation.y -= this.speed;
            this.$renderer.render(this.$scene, this.$camera);
            requestAnimationFrame(this.animationBind);
        }

    }



    return cube_constructor
})();




// ********************************************************************************

var UpdateManager = (function () {
    "use strict";

    function update_constructor() {
        window.addEventListener("onNewCubeFace", this.onNewCubeface.bind(this), true);
        this.currentFace = 0;
        this.allAnimationsDone = false;
        this.speed = 20;


    }


    update_constructor.prototype = {
        fadeEndFrame: function () {
            // because we are loopin
            var el = document.querySelector(".cube-end-frame");
            el.style.opacity = "0.0";
        },

        typeWriter: function (text, element, i, fnCallback) {

            if (i < (text.length)) {

                element.innerHTML = text.substring(0, i + 1);

                setTimeout(function () {
                    this.typeWriter(text, element, i + 1, fnCallback)
                }.bind(this), this.speed);
            } else if (typeof fnCallback == 'function') {
                setTimeout(fnCallback, this.speed*2);
            }
        },

        isTyping: function () {

        },

        hideAllFaces: function () {
            var temp = document.querySelectorAll(".message");

            if (temp.length) {
                var asArray = Array.prototype.slice.call(temp, 0);

                for (var i = 0; i < asArray.length; i++) {
                    var ele = asArray[i]
                    ele.classList.add("message-hide");
                }
            }


        },
        onNewCubeface: function (e) {
            //console.log("side = ", e.detail);

            var el = document.querySelector(".message-1");
            if (this.currentFace === e.detail || this.allAnimationsDone) return;
            this.currentFace = e.detail;
            this.hideAllFaces();
            this.fadeEndFrame();

            switch (true) {
                case (e.detail == 1):
                    
                    el.style.display = "block";
                    var sp = el.querySelector("span");
                    el.classList.add("message-show");
                    this.typeWriter(" The Cloud, Queens Wharf, Auckland.", sp, 0, function () {
                        //console.log("end type text");
                    });

                    break;
                case (e.detail == 2):
        
                    var sp = el.querySelector("span");
                    el.classList.add("message-show");

                    this.typeWriter(" 6 & 7 October 2018. Tickets on sale now! ", sp, 0, function () {
                        //console.log("end type text");
                    });

                    break;
                case (e.detail == 3):

   
                    var sp = el.querySelector("span");
                    el.classList.add("message-show");
                    this.typeWriter(" NZ’s biggest celebration of chocolate, coffee and tasty treats! ", sp, 0, function () {
                        //console.log("end type text");
                    });

                    break;
                case (e.detail == 4):
                    // this.allAnimationsDone = true;
                   
                    el.style.display = "none";
                    el = document.querySelector(".cube-end-frame");
                    el.style.opacity = "1"

                    break;
            }

        }
    }

    return update_constructor
})()


var um = new UpdateManager();