import { Response } from "express";

/**
 * Handles error by printing to console in development env and builds and sends an error response
 * @param {Object} res - response object
 * @param {Object} err - error object
 */

interface ErrorResponse{
    code:number;
    message:string
}

const handleError = (res:Response, err :ErrorResponse) => {
    // Prints error in console
    // if (process.env.NODE_ENV === 'development') {
    //   console.log(err)
    // }
    // Sends error to user
    if(err.code !== null){
      err.code =200
    }
    res.status(err.code).json({
      success : false,
      result:  null,
      message: Array.isArray(err.message) ? err.message[0].msg : err.message
    })
  }
  
 export { handleError }
  