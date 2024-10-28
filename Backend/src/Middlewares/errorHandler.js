// Centralized error-handling middleware
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500; // Default to 500 if statusCode isn't set
  
    // Structure of the error response
    res.status(statusCode).json({
      success: false,
      message: err.message || "Internal Server Error", // Send the message from ApiError or default to "Internal Server Error"
      errors: err.errors || [], // Any additional error details if present
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined, // Show stack trace only in development mode
    });
  };
  
  export default errorHandler;
  