#!/usr/bin/env node

const fs   = require('fs'); 
const path = require('path'); 
const yargs = require("yargs");

/**
 * Render folder as tree
 * 
 * @param string currentPath
 * @param string itemPrefix 
 * @param string levelPrefix 
 */
function renderFolder(currentPath, itemPrefix = '', levelPrefix = '', level = 0) {
    console.log(itemPrefix + path.basename(currentPath));

    if (maxLevel != undefined && level >= maxLevel) {
        return;
    }

    let stat = fs.lstatSync(currentPath);

    //child items rendering
    if (stat.isDirectory()) {
        let files = fs.readdirSync(currentPath);
        for (let i = 0; i < files.length; i++) {            
            if (i < files.length - 1) {
                subitemPrefix = "\u251C--";
                sublevelPrefix = levelPrefix + "|   ";
            } else {
                //last item
                subitemPrefix = "\u2514--";
                sublevelPrefix = levelPrefix + "   ";
            }

            let childPath = currentPath + path.sep + files[i];
            renderFolder(childPath, levelPrefix + subitemPrefix, sublevelPrefix, level + 1);
        }
    }
}

//get options
const options = yargs
    .usage("Usage: PATH -d <depth>")
    .option("d", { alias: "depth", describe: "Show depth", type: "int", demandOption: false })
    .argv;

const pathParam = options._.pop()
const maxLevel = options.depth

try {
    if (fs.existsSync(pathParam)) {
        //call tree rendering
        renderFolder(pathParam);
    } else {
      console.log("Provided path does not exist.")
    }
} catch(e) {
    console.log("An error occurred:" + e)
}
