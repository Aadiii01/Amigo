class ApiResponse {
  constructor(statusCode, data, message = "Success", totalCount) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
    this.totalCount = totalCount;
  }
}

export { ApiResponse };
