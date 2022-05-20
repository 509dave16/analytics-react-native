"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactNativeAppsflyer = _interopRequireDefault(require("react-native-appsflyer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = event => {
  const userId = event.userId;

  if (userId && userId.length > 0) {
    _reactNativeAppsflyer.default.setCustomerUserId(userId);
  }

  const traits = event.traits;

  if (traits) {
    const aFTraits = {};

    if (traits.email) {
      aFTraits.email = traits.email;
    }

    if (traits.firstName) {
      aFTraits.firstName = traits.firstName;
    }

    if (traits.lastName) {
      aFTraits.lastName = traits.lastName;
    }

    if (traits.currencyCode) {
      _reactNativeAppsflyer.default.setCurrencyCode(String(traits.currencyCode));
    }

    _reactNativeAppsflyer.default.setAdditionalData(aFTraits);
  }
};

exports.default = _default;
//# sourceMappingURL=identify.js.map