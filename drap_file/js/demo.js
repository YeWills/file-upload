
var droptarget;
function setStatus(text) {
    document.getElementById("status").innerHTML = text;
}
function handleDragEnter(evt) {
    var files = evt.dataTransfer.files;
    if (files)
        setStatus("There are " + evt.dataTransfer.files.length +
            " files in this drag.");
    else
        setStatus("There are unknown items in this drag.");

    droptarget.className = "highlighted";
    evt.stopPropagation();
    evt.preventDefault();
    return false;
}

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    return false;
}

function handleDragLeave(evt) {
    setStatus("Drag files into this area.");
    droptarget.className = "validtarget";
    return false;
}

function handleDrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    var filelist = evt.dataTransfer.files;
    var message = "There were " + filelist.length + " files dropped.";
    message += "<ol>";
    [].forEach.call(filelist, function(file) {
        message += "<li>";
        message += "<strong>" + file.name + "</strong> ";
        message += "(<em>" + file.type + "</em>) : ";
        message += "size: " + file.size + " bytes - ";
        message += "modified: " + file.lastModifiedDate;
        message += "</li>";
    });
    message += "</ol>";
    setStatus(message);
    droptarget.className = "validtarget";
    var preview = document.getElementById("preview");
    for (var i = filelist.length - 1; i >= 0; i--) {
        var file = filelist[i];
        var imageType = /image.*/;
        if (file.type.match(imageType)) {
            var img = document.createElement("img"); 
            img.classList.add("obj");
            img.file = file;
            preview.append(img);
            var reader = new FileReader();
            reader.onload = (function(aimg) {
                return function(e) {
                    aimg.src = e.target.result;
                };
            })(img);
            reader.readAsDataURL(file);
        }
    }
    return false;
}

function loadDemo() {
    droptarget = document.getElementById("droptarget");
    droptarget.className = "validtarget";
    droptarget.addEventListener("dragenter", handleDragEnter, false);
    droptarget.addEventListener("dragover", handleDragOver, false);
    droptarget.addEventListener("dragleave", handleDragLeave, false);
    droptarget.addEventListener("drop", handleDrop, false);
    setStatus("Drag files into this area.");
}

window.addEventListener("load", loadDemo, false);
