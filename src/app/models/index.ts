import fs from 'fs';
import mongoose from 'mongoose';
import { removeExtensionFromFile } from '../helper/removeExtensionFileName';

const modelsPath = `${__dirname}/`;

export  function loadModels(): void {
  /* * Load models dynamically */
  // Loop models path and loads every file as a model except this file
  fs.readdirSync(modelsPath).filter((file: string) => {
    // Take filename and remove last part (extension)
    const modelFile = removeExtensionFromFile(file);
    // Prevents loading of this file
    return modelFile !== 'index' ? require(`./${modelFile}`).default : null;
  });
}