/**
 * ApiError: Custom error class for HTTP API responses.
 *
 */
export class ApiError {
  code: number;
  message: string;
  error?: Error | unknown;

  /**
   * Creates a new ApiError instance.
   * @param {number} code - HTTP status code
   * @param {string} message - Error message
   * @param {Error | unknown} [error] - Optional underlying error
   */
  constructor(code: number, message: string, error?: Error | unknown) {
    this.code = code;
    this.message = message;
    this.error = error;
  }

  /**
   * Returns a 400 Bad Request error.
   * @param {string} message - Detailed message
   */
  static badRequest(message: string) {
    return new ApiError(400, `Bad Request: ${message}`);
  }

  /**
   * Returns a 401 Unauthorised error.
   */
  static unauthorised() {
    return new ApiError(401, "Unauthorised Access");
  }

  /**
   * Returns a 403 Forbidden error.
   */
  static forbidden() {
    return new ApiError(403, "Forbidden Access");
  }

  /**
   * Returns a 404 Not Found error.
   */
  static notFound() {
    return new ApiError(404, "Resource Not Found");
  }

  /**
   * Returns a 413 Content Too Large error.
   * @param {string} message - Error message
   */
  static tooLarge(message: string) {
    return new ApiError(413, `Upload Failed: ${message}`);
  }

  /**
   * Returns a 422 Unprocessable Content error.
   * @param {string} message - Error message
   */
  static cannotProcess(message: string) {
    return new ApiError(422, `Upload Failed: ${message}`);
  }

  /**
   * Returns a 500 Internal Server Error and logs the underlying error.
   * @param {string} message - Detailed message
   * @param {Error | unknown} error - Underlying error
   */
  static internal(message: string, error: Error | unknown) {
    console.error(error);
    return new ApiError(500, `Internal Server Error: ${message}`, error);
  }
}

export default ApiError;
