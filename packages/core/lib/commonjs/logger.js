"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createLogger = exports.Logger = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Logger {
  constructor() {
    let isDisabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : process.env.NODE_ENV === 'production';

    _defineProperty(this, "isDisabled", void 0);

    this.isDisabled = isDisabled;
  }

  enable() {
    this.isDisabled = false;
  }

  disable() {
    this.isDisabled = true;
  }

  info(message) {
    if (!this.isDisabled) {
      for (var _len = arguments.length, optionalParams = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        optionalParams[_key - 1] = arguments[_key];
      }

      console.info(message, ...optionalParams);
    }
  }

  warn(message) {
    if (!this.isDisabled) {
      for (var _len2 = arguments.length, optionalParams = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        optionalParams[_key2 - 1] = arguments[_key2];
      }

      console.warn(message, ...optionalParams);
    }
  }

  error(message) {
    if (!this.isDisabled) {
      for (var _len3 = arguments.length, optionalParams = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        optionalParams[_key3 - 1] = arguments[_key3];
      }

      console.error(message, ...optionalParams);
    }
  }

}

exports.Logger = Logger;

const createLogger = isDisabled => new Logger(isDisabled);

exports.createLogger = createLogger;
//# sourceMappingURL=logger.js.map