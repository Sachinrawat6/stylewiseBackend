const ApiError = require("../../utils/ApiError")

const globalErrorHandler = (err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode || 500)
            .json({
                success: false,
                statusCode: err.statusCode || 500,
                message: err.message || "Something went wrong",
                errors: err.errors || [],
                stack: process.env.NODE_ENV === "development" ? err.stack : undefined
            });
    }

    return res.status(500).json({
        success: false,
        statusCode: 500,
        message: err.message || "Internal Server Error",
        errors: [],
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined
    })
}

module.exports = globalErrorHandler;