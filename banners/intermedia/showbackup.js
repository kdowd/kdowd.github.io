!(function trackBackup() {
    console.log("showing backup...")
    Enabler.counter("showingBackup", true);
    console.log("%c 2. MEDIAWORKS: backup js loaded ", 'background: green; color: #FFFFFF');
})()


function showBackup(url) {
    Enabler.counter("showingBackup");

    var handElement = document.querySelector(".hand");
    var handIconElement = document.querySelector(".hand-icon");

    if (!!handElement) {
        handElement.style.display = "none";
    }

    if (!!handIconElement) {
        handIconElement.style.display = "none";
    }

    var myimage = new Image();
    myimage.onload = function (e) {
        var parent = document.querySelector(".adbanner");
        if (!!parent) {
            parent.appendChild(myimage);

            parent.addEventListener("click", function (e) {
                Enabler.exit("MREC Backup Exit", url);
            }, false);
        }



    }
    myimage.src = Enabler.getUrl("backup.jpg");
    myimage.style.cssText = "cursor: pointer; position: absolute; top: 0; left: 0; z-index: 100;";
}