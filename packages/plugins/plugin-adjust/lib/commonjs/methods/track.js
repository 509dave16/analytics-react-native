"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactNativeAdjust = require("react-native-adjust");

var _util = require("../util");

var _default = (event, settings) => {
  const anonId = event.anonymousId;

  if (anonId && anonId.length > 0) {
    _reactNativeAdjust.Adjust.addSessionPartnerParameter('anonymous_id', anonId);
  }

  const token = (0, _util.mappedCustomEventToken)(event.event, settings);

  if (token) {
    const adjEvent = new _reactNativeAdjust.AdjustEvent(token);
    const properties = event.properties;

    if (properties) {
      Object.entries(properties).forEach(_ref => {
        let [key, value] = _ref;
        adjEvent.addCallbackParameter(key, value);
      });
      const revenue = (0, _util.extract)('revenue', properties);
      const currency = (0, _util.extract)('currency', properties, 'USD');
      const orderId = (0, _util.extract)('orderId', properties);

      if (revenue && currency) {
        adjEvent.setRevenue(revenue, currency);
      }

      if (orderId) {
        adjEvent.setTransactionId(orderId);
      }
    }

    _reactNativeAdjust.Adjust.trackEvent(adjEvent);
  }
};

exports.default = _default;
//# sourceMappingURL=track.js.map