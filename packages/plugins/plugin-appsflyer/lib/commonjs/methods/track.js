"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactNativeAppsflyer = _interopRequireDefault(require("react-native-appsflyer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = event => {
  const properties = event.properties || {};
  const revenue = extractRevenue('revenue', properties);
  const currency = extractCurrency('currency', properties, 'USD');

  if (revenue && currency) {
    const otherProperties = Object.entries(properties).filter(_ref => {
      let [key] = _ref;
      return key !== 'revenue' && key !== 'currency';
    }).reduce((acc, _ref2) => {
      let [key, val] = _ref2;
      acc[key] = val;
      return acc;
    }, {});

    _reactNativeAppsflyer.default.logEvent(event.event, { ...otherProperties,
      af_revenue: revenue,
      af_currency: currency
    });
  } else {
    _reactNativeAppsflyer.default.logEvent(event.event, properties);
  }
};

exports.default = _default;

const extractRevenue = (key, properties) => {
  if (!properties[key]) {
    return null;
  }

  switch (typeof properties[key]) {
    case 'number':
      return properties[key];

    case 'string':
      return parseFloat(properties[key]);

    default:
      return null;
  }
};

const extractCurrency = (key, properties, defaultCurrency) => {
  return properties[key] || defaultCurrency;
};
//# sourceMappingURL=track.js.map