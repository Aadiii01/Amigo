class ApiError extends Error {
  constructor(
    statusCode, // The HTTP status code for the error (e.g., 404, 500).
    message = "Something went wrong", // A default error message.
    errors = [], // Optional array of additional error details.
    stack = "" // Optional stack trace information.
  ) {
    super(message); // Call the parent Error constructor with the message.
    this.statusCode = statusCode; // The HTTP status code associated with the error.
    this.data = null; // Placeholder for any additional data (null in this case).
    this.message = message; // The error message (default: "Something went wrong").
    this.success = false; // Indicating that this is an error (false for errors).
    this.errors = errors; // An array of error details, useful for validation errors or multiple issues.

    // Handle the stack trace (useful for debugging):
    if (stack) {
      this.stack = stack; // If a stack trace is provided, use it.
    } else {
      // Automatically capture the stack trace from the point where the error was created:
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export {ApiError}