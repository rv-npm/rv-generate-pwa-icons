#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const { getParentDirPath, generatePWAIcons } = require('./index');

const checkIfPathExists = (providedPath) => {
    if (fs.existsSync(providedPath) === false) {
        console.log(`%cInvalid path: ${providedPath}`, 'color: red');
        process.exit(2);
    }
}

let inputFilePath;
if (process.argv.length === 2) {
    console.log("Please provide path of input SVG and output file path")
    process.exit(1);
} else {
    inputFilePath = process.argv[2];
    checkIfPathExists(inputFilePath);

    // Path is of a directory
    if (fs.lstatSync(inputFilePath).isDirectory()) {
        console.log(`%cProvided path is of a directory`, 'color: red');
        process.exit(3);
    }

    // not a valid SVG
    if (path.extname(inputFilePath) !== '.svg') {
        console.log(`%cProvided path is not a valid SVG`, 'color: red');
        process.exit(4);
    }
}

let outputFilePath;
if (process.argv.length === 3) {
    outputFilePath = process.cwd();
} else {
    outputFilePath = process.argv[3];
    checkIfPathExists(outputFilePath);

    // Path is not of a directory
    if (fs.lstatSync(outputFilePath).isDirectory() === false) {
        console.log(`%cProvided path is not of a directory`, 'color: red');
        process.exit(3);
    }
}

generatePWAIcons(inputFilePath, outputFilePath).then(() => {
    const outputLocation = getParentDirPath(outputFilePath);
    console.log(`Find your icons at: ${outputLocation}`);
});
