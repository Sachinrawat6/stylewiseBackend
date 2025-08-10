class ApiError extends Error {
    constructor(statusCode, message = "An error occurred", errors = [], stack = "") {
        super(message);

        this.name = this.constructor.name; // Error ka naam set karo
        this.statusCode = statusCode;
        this.errors = Array.isArray(errors) ? errors : [errors]; // Ensure array

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

module.exports = ApiError;
