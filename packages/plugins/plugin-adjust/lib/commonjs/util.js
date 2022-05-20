"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mappedCustomEventToken = exports.extract = void 0;

const mappedCustomEventToken = (eventName, settings) => {
  let result = null;
  const tokens = settings === null || settings === void 0 ? void 0 : settings.customEvents;

  if (tokens) {
    result = tokens[eventName];
  }

  return result;
};

exports.mappedCustomEventToken = mappedCustomEventToken;

const extract = function (key, properties) {
  let defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  let result = defaultValue;

  if (!properties) {
    return result;
  }

  Object.entries(properties).forEach(_ref => {
    let [propKey, propValue] = _ref;

    // not sure if this comparison is actually necessary,
    // but existed in the old destination so ...
    if (key.toLowerCase() === propKey.toLowerCase()) {
      result = propValue;
    }
  });
  return result;
};

exports.extract = extract;
//# sourceMappingURL=util.js.map