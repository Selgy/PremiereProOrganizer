
String.prototype.startsWith = function (searchStr) {
    return new RegExp("^" + searchStr).test(this);
}
function organizeFilesInProject(customNamesJSON, ignoredNames) {

    $.level = 1;
    var customNames = JSON.parse(customNamesJSON);
    var project = app.project;
    var root = project.rootItem;
  
    var screenshotBin = findOrCreateBin(customNames[0]);
    var musicAndSoundBin = findOrCreateBin(customNames[1]);
    var sequenceBin = findOrCreateBin(customNames[2]);
    var videoBin = findOrCreateBin(customNames[3]);
    var otherBin = findOrCreateBin(customNames[4]);
  
    var itemsToMove = [];
    var ignoredNamesArr = ignoredNames.split(";");
    for (var i = 0; i < root.children.numItems; i++) {
      var item = root.children[i];
      var parts = item.name.split(".");
      var extension = parts[parts.length - 1].toLowerCase();
      var folderPattern = /^\D+$/;
  
      // Ignore items with matching names
      var ignored = false;
      for (var j = 0; j < ignoredNamesArr.length; j++) {
        if (item.name == ignoredNamesArr[j]) {
          ignored = true;
          break;
        }
      }
      if (ignored) {
        continue;
      }
      if (item.name.startsWith(customNames[0]) ||
          item.name.startsWith(customNames[1]) ||
          item.name.startsWith(customNames[2]) ||
          item.name.startsWith(customNames[3]) ||
          item.name.startsWith(customNames[4])) {

        continue;
      }
      if (item.type == 1) {
        if (item.isSequence() || extension == "aep"|| extension == "aegraphic") {
          itemsToMove.push({item: item, bin: sequenceBin});
        } else if (extension == "mov" || extension == "mp4"|| extension == "mxf" ) {
          itemsToMove.push({item: item, bin: videoBin});
        } else if (extension == "mp3" || extension == "wav" || extension == "m4a" || extension == "aif"  ) {
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
        bin = project
        .rootItem.createBin(name);
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
    
    alert("the files have been organized.","PremiereProOrganizer");
    }