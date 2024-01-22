class ResponseHandler {
  constructor(message, success, data, code) {
    this.message = message || "Everything are succesfully";
    this.success = success || true;
    this.data = data || [];
    this.code = code || 1;
  }

  getResponse() {
    if (this.data.length > 0 || Object.keys(this.data).length > 0) {
      return {
        message: this.message,
        success: this.success,
        data: this.data,
        code: this.code,
      };
    } else {
      return {
        message: this.message,
        success: this.success,
        code: this.code,
      };
    }
  }

  getError() {
    return {
      message: this.message,
      success: false,
    };
  }
}

module.exports = ResponseHandler;
