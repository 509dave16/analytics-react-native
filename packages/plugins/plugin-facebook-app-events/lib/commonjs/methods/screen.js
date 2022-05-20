"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactNativeFbsdkNext = require("react-native-fbsdk-next");

const PREFIX = 'Viewed';
const SUFFIX = 'Screen';
const MAX_CHARACTERS_EVENT_NAME = 40 - PREFIX.length - SUFFIX.length;

const sanitizeName = name => {
  let trimmedName = name.substring(0, MAX_CHARACTERS_EVENT_NAME);
  return `${PREFIX} ${trimmedName} ${SUFFIX}`;
};

const sanitizeEvent = event => {
  var _event$properties;

  let properties = (_event$properties = event.properties) !== null && _event$properties !== void 0 ? _event$properties : {};
  return { ...properties
  };
};

var _default = async event => {
  let name = sanitizeName(event.name);
  let params = sanitizeEvent(event);

  _reactNativeFbsdkNext.AppEventsLogger.logEvent(name, params);
};

exports.default = _default;
//# sourceMappingURL=screen.js.map