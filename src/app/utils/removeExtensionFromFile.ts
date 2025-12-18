/**
 * Removes extension from file
 * @param {string} file - filename
 */
const removeExtensionFromFile = (file:any) => {
    return file.split('.').slice(0, -1).join('.').toString()
  }
  
export { removeExtensionFromFile }
  