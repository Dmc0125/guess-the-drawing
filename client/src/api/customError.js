class CustomError extends Error {
  constructor(code = 'Generic error', status = 500, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }

    this.message = code;
    this.status = status;
  }
}

export default CustomError;
