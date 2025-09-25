export class ApiError {
  code: number;
  message: string;
  error?: Error;

  constructor(code: number, message: string, error?: Error) {
    this.code = code;
    this.message = message;
    this.error = error;
  }

  static badRequest(message: string) {
    return new ApiError(400, `Bad Request: ${message}`);
  }

  static notFound() {
    return new ApiError(404, "Resource Not Found");
  }

  static internal(message: string, error: Error) {
    console.error(error);
    return new ApiError(500, `Internal Server Error: ${message}`, error);
  }
}

export default ApiError;
