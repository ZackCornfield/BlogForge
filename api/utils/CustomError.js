/**
 * CustomError class - Custom error class to handle errors  
 * @extends Error
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message
 * @constructor
 */
class CustomError extends Error {
    constructor(statusCode = 500, message = 'Internal server error') {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor); // Capturing stack trace, excluding constructor call from it.      
    }
}

module.exports = CustomError;