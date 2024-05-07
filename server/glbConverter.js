const obj2gltf = require('obj2gltf');

async function convertFileToGLB(inputFilePath, outputFilePath) {
  return new Promise((resolve, reject) => {
    obj2gltf(inputFilePath, { separate: true, outputDirectory: outputFilePath })
    // console.log("in obj2gltf")
      .then(() => {
        console.log(`File ${inputFilePath} converted to GLB successfully.`);
        resolve(outputFilePath);
      })
      .catch(error => {
        console.error(`Error converting ${inputFilePath} to GLB:`, error);
        reject(error);
      });
    console.log("in obj2gltf")

  });
}

module.exports = { convertFileToGLB };
