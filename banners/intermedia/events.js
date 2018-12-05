   // mouse only stuff
   var EventsManager = (function (d) {
       "use strict";

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

       function _constructor() {
           // Object.assign( Car.prototype, EventDispatcher.prototype );
           // lets make it easy for removal
           this.bindings = {
               mouseDownBind: this.onCanvasMouseDown.bind(this),
               mouseMoveBind: this.onCanvasMouseMove.bind(this),
               mouseUpBind: this.onCanvasMouseUp.bind(this),
               imagesLoadedBind: this.onImagesLoaded.bind(this)
           };

           this.distance = 0;
           this.velocity = 0;
           this.timestamp = 0;
           this.mX = 0;

           this.canvas;
           this.mesh;

           this.speed = 0.016;

           this.targetRotation = 0;
           this.targetRotationOnMouseDown = 0;
           this.mouseXOnMouseDown = 0;
           this.windowHalfX = window.innerWidth / 2;
           this.windowHalfY = window.innerHeight / 2;

           this.lastMousePos = {
               x: 0,
               y: 0
           };

           window.addEventListener("onImagesLoaded", this.bindings.imagesLoadedBind, true);

           d.addEventListener('mouseleave', function () {
            Enabler.counter("mouseexited", true);
               broadcast_event("onCubeMouseLeave");
               this.killMouseEvents();
           }.bind(this), false);


           d.addEventListener('mouseenter', function () {
               Enabler.counter("mouseentered", true);
               broadcast_event("onCubeMouseEnter");
           }.bind(this), false);

       }


       _constructor.prototype = {
           init: function (ele, mesh) {
               this.canvas = ele;
               this.mesh = mesh;
               ele.addEventListener('mousedown', this.bindings.mouseDownBind, false);

           },
           onImagesLoaded: function () {
               window.removeEventListener('mousemove', this.bindings.imagesLoadedBind);
               console.log("onImagesLoaded >>>>>");
           },
           onCanvasMouseDown: function (e) {
               console.log("onCanvasMouseDown >>>>>");
               this.lastMousePos.x = e.clientX;
               this.lastMousePos.y = e.clientY;
               this.killMouseEvents();

               this.canvas.addEventListener('mousemove', this.bindings.mouseMoveBind, false);
               d.addEventListener('mouseup', this.bindings.mouseUpBind, false);

               this.mouseXOnMouseDown = e.clientX - this.windowHalfX;
               this.targetRotationOnMouseDown = this.mesh.rotation.y;

               broadcast_event("onCubeTouch");
               e.preventDefault();
           },

           onCanvasMouseMove: function (e) {
               var mouseX = e.clientX - this.windowHalfX;
               var targetRotation = this.targetRotationOnMouseDown + (mouseX - this.mouseXOnMouseDown) * this.speed;
               this.mesh.rotation.y = targetRotation;

               var now = Date.now();
               var currentmX = e.clientX; // or clientX

               var dt = now - this.timestamp;
               this.distance = Math.abs(currentmX - this.mX);
               this.velocity = Math.round(this.distance / dt * 1000);
               //    console.log(dt, this.distance, this.velocity);
               this.mX = currentmX;
               this.timestamp = now;
           },
           onCanvasMouseUp: function (e) {
               broadcast_event("onCubeTouchEnd");
               console.log(this.distance, this.velocity);
               this.killMouseEvents();
               // check for that click
               if (e.clientX == this.lastMousePos.x && e.clientY == this.lastMousePos.y) {
                   Enabler.exit("main-exit", "https://chocolatecoffeeshow.co.nz/")
               }


              

           },

           

           killMouseEvents: function () {
               // does this work on bound events
               // answer: https://stackoverflow.com/questions/28665784/how-to-remove-event-listener-of-a-object-with-bindthis
               this.canvas.removeEventListener('mousemove', this.bindings.mouseMoveBind);
               d.removeEventListener('mouseup', this.bindings.mouseUpBind);
           },

          




       }

       return _constructor
   })(document);