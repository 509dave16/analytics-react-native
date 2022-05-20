"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _analyticsReactNative = require("@segment/analytics-react-native");

var _reactNativeFbsdkNext = require("react-native-fbsdk-next");

var _parameterMapping = require("./parameterMapping");

// FB Event Names must be <= 40 characters
const MAX_CHARACTERS_EVENT_NAME = 40;
const mappedPropNames = (0, _analyticsReactNative.generateMapTransform)(_parameterMapping.mapEventProps, _parameterMapping.transformMap);

const sanitizeName = name => {
  //Facebook expects '_' instead of '.'
  let sanitizedName = name.replace('.', '_');
  return sanitizedName.substring(0, MAX_CHARACTERS_EVENT_NAME);
};

const sanitizeEvent = event => {
  var _event$properties$pro, _ref, _event$timestamp;

  let products = (_event$properties$pro = event.properties.products) !== null && _event$properties$pro !== void 0 ? _event$properties$pro : [];
  const productCount = (_ref = event.properties.fb_num_items || products.length) !== null && _ref !== void 0 ? _ref : 0;
  let params = {};
  let logTime = (_event$timestamp = event.timestamp) !== null && _event$timestamp !== void 0 ? _event$timestamp : undefined;
  Object.keys(event.properties).forEach(property => {
    if (Object.values(_parameterMapping.mapEventProps).some(fbProp => fbProp === property)) {
      params[property] = event.properties[property];
    }
  });
  return { ...params,
    fb_num_items: productCount,
    _logTime: logTime,
    _appVersion: event.context.app.version
  };
};

var _default = event => {
  var _ref2;

  const safeEvent = mappedPropNames(event);
  let convertedName = safeEvent.event;
  let safeName = sanitizeName(convertedName);
  let safeProps = sanitizeEvent(safeEvent);
  const currency = (_ref2 = safeProps.fb_currency) !== null && _ref2 !== void 0 ? _ref2 : 'USD';

  if (safeProps._valueToSum !== undefined) {
    let purchasePrice = safeProps._valueToSum;

    _reactNativeFbsdkNext.AppEventsLogger.logPurchase(purchasePrice, currency, safeProps);
  } else {
    _reactNativeFbsdkNext.AppEventsLogger.logEvent(safeName, safeProps);
  }
};

exports.default = _default;
//# sourceMappingURL=track.js.map