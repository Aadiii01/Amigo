class ApiFeature {
  constructor(query, queryString) {
    (this.query = query), // Receives the Mongoose query object
    (this.queryString = queryString); // Receives the request query parameters (e.g., from URL)
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryString.page) || 1; // Determines the current page
    const skip = (currentPage - 1) * resultPerPage; // Calculates the number of documents to skip
    this.query = this.query.limit(resultPerPage).skip(skip); // Applies pagination to the query
    return this; // Returns this object to allow method chaining
  }
}

export default ApiFeature;
