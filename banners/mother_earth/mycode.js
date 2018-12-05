console.log(">>>>>>>>>>>>>>>>>>> MyCode is Loaded >>>>>>>>>>>>>>>>>>>>>>>>>");

var BUGZ;

function getClose() {
    var closeButton = document.getElementById("close-comp");
    if (!!closeButton) {

        closeButton.style.zIndex = "150";

        closeButton.addEventListener("click", function(e) {
            Enabler.counter("userClosedExpandable", 1);
            killAllBugs();
            e.preventDefault();
            e.stopImmediatePropagation();
        }, !!0)
    } else {
        // problem, let collapse and exit;
        Enabler.requestCollapse();
    }
}


function getReplay() {
    var replayButton = document.getElementById("replay-comp");
    if (!!replayButton) {
        replayButton.addEventListener("click", function(e) {
            Enabler.counter("userReplayedExpandable", 1);
        }, false);
    }
}

function killAllBugs() {

    if (typeof BUGZ === "object") {
        BUGZ.killAll();
        setTimeout(forceClose, 750);
        return;
    }

    Enabler.requestCollapse();
}

function forceClose() {
    Enabler.requestCollapse();
}

Enabler.addEventListener("onBannerPageVisible", function(e) {
    console.log('>>>>>>>>>>>>>>>>>>> onBannerPageVisible >>>>>>>>>>>>>>>>>>>>>>>>>');
    getReplay();
}, true);


Enabler.addEventListener("onExpandedPageVisible", function(e) {
    console.log('>>>>>>>>>>>>>>>>>>> onExpandedPageVisible >>>>>>>>>>>>>>>>>>>>>>>>>');
    // can query the page stack now
    getClose();
    BUGZ = new SpiderController({ "id": "bee-container", "minTimeBetweenMultipy": 10, "zoom": 9, minSpeed: 8, maxSpeed: 18, "minDelay": 0, "maxDelay": 10, "minBugs": 4, "maxBugs": 6, "imageSprite": 'bees_spritesheet.png', "mouseOver": 'fly', "monitorMouseMovement": false, "maxWiggleDeg": 6, "canDie": false });
    // BUGZ = new SpiderController({ "id": "bee-container", "minTimeBetweenMultipy": 100, "zoom": 8, "minDelay": 200, "maxDelay": 400, "minBugs": 16, "maxBugs": 18, "imageSprite": 'mybees.png', "bugWidth": 109, "bugHeight": 90, "num_frames": 7, "mouseOver": 'fly', "monitorMouseMovement": false, "maxWiggleDeg": 6, "canDie": false });


}, true);



Enabler.addEventListener("onExpandStart", function() {
    console.log('>>>>>>>>>>>>>>>>>>> onExpandStart >>>>>>>>>>>>>>>>>>>>>>>>>');
}, true);


Enabler.addEventListener("onCollapsing", function() {
    console.log('>>>>>>>>>>>>>>>>>>> onCollapsing >>>>>>>>>>>>>>>>>>>>>>>>>');
    if (typeof BUGZ === "object") {
        var allbugs = BUGZ.bugs.length;
        allbugs--;
        BUGZ.stop();

        for (var i = allbugs; i >= 0; i--) {
            var thebug = BUGZ.bugs[i];
            thebug.remove();
        }
    }
}, true);