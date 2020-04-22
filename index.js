const path = require("path");
const exec = require('await-exec');

const getFileNameWithSize = size => {
    return `icon-${size}x${size}.png`;
};

const generateIcon = async (size, inputFilePath, outputFilePath) => {
    const fileName = getFileNameWithSize(size);
    const outputFile = path.join(getParentDirPath(outputFilePath), fileName);

    try {
        const command = `npx svgexport ${inputFilePath} ` +
            `${outputFile} ` +
            `${size}:${size}`;

        console.log(`Generating icon of size: ${size}`);
        await exec(command);
        console.log(`Generated icon: ${fileName}`);
    } catch (e) {
        console.log(e);
        throw new Error("Failed!");
    }
};

const getParentDirPath = (outputDirectoryPath) => {
    return path.join(outputDirectoryPath, "pwa_icons");
};
exports.getParentDirPath = getParentDirPath;

const generateParentDir = async outputDirectoryPath => {
    const dirName = getParentDirPath(outputDirectoryPath);

    try {
        await exec(`mkdir ${dirName}`);
    } catch (e) {
        console.log(e);
        throw new Error("Failed!");
    }
};

exports.generatePWAIcons = async (inputFilePath, outputFilePath) => {
    await generateParentDir(outputFilePath);

    const sizes = [96, 72, 128, 144, 152, 192, 384, 512];

    for (const size of sizes) {
        await generateIcon(size, inputFilePath, outputFilePath);
    }
};
