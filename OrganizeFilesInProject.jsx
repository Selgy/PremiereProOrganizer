function organizeFilesInProject(customNamesJSON) {
    var customNames = JSON.parse(customNamesJSON);
    var project = app.project;
    var root = project.rootItem;

    var screenshotBin = findOrCreateBin("1 - " + customNames[0]);
    var musicAndSoundBin = findOrCreateBin("2 - " + customNames[1]);
    var sequenceBin = findOrCreateBin("3 - " + customNames[2]);
    var videoBin = findOrCreateBin("4 - " + customNames[3]);
    var otherBin = findOrCreateBin("5 - " + customNames[4]);

    var itemsToMove = [];

    for (var i = 0; i < root.children.numItems; i++) {
        var item = root.children[i];
        var parts = item.name.split(".");
        var extension = parts[parts.length - 1].toLowerCase();
        var folderPattern = /^\D+$/;

        if (item.name.startsWith("1 - " + customNames[0]) ||
            item.name.startsWith("2 - " + customNames[1]) ||
            item.name.startsWith("3 - " + customNames[2]) ||
            item.name.startsWith("4 - " + customNames[3]) ||
            item.name.startsWith("5 - " + customNames[4])) {
            continue;
        }

        if (item.type == 1) {
            if (item.isSequence() || extension == "aep") {
                itemsToMove.push({item: item, bin: sequenceBin});
            } else if (extension == "mov" || extension == "mp4"|| extension == "mxf" ) {
                itemsToMove.push({item: item, bin: videoBin});
            } else if (extension == "mp3" || extension == "wav" ) {
                itemsToMove.push({item: item, bin: musicAndSoundBin});
            } else if (extension == "jpg" || extension == "jpeg" || extension == "png" || extension == "psd" || extension == "webp") {
                itemsToMove.push({item: item, bin: screenshotBin});
            } else {
                itemsToMove.push({item: item, bin: otherBin});
            }
        } else if (item.type == 5) { 
            itemsToMove.push({item: item, bin: otherBin});
        } else {
            itemsToMove.push({item: item, bin: otherBin});
        }
    }

    for (var j = 0; j < itemsToMove.length; j++) {
        itemsToMove[j].item.moveBin(itemsToMove[j].bin);
    }

    function findOrCreateBin(name) {
        var bin = findBin(root, name);
        if (!bin) {
            bin = project.rootItem.createBin(name);
        }
        return bin;
    }

    function findBin(parentItem, name) {
        for (var i = 0; i < parentItem.children.numItems; i++) {
            var item = parentItem.children[i];
        if (item.type === 2 && item.name === name) {
            return item;
        }
    }
    return null;
}
alert("Le script a bien été exécuté et les fichiers ont été organisés.");
//app.project.showMessage("Le script a bien été exécuté et les fichiers ont été organisés.");
}