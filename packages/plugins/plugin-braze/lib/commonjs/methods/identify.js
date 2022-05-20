"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactNativeAppboySdk = _interopRequireDefault(require("react-native-appboy-sdk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = payload => {
  if (payload.userId) {
    _reactNativeAppboySdk.default.changeUser(payload.userId);
  }

  if (payload.traits.birthday) {
    const data = new Date(payload.traits.birthday);

    _reactNativeAppboySdk.default.setDateOfBirth(data.getFullYear(), // getMonth is zero indexed
    data.getMonth() + 1, data.getDate());
  }

  if (payload.traits.email) {
    _reactNativeAppboySdk.default.setEmail(payload.traits.email);
  }

  if (payload.traits.firstName) {
    _reactNativeAppboySdk.default.setFirstName(payload.traits.firstName);
  }

  if (payload.traits.lastName) {
    _reactNativeAppboySdk.default.setLastName(payload.traits.lastName);
  }

  if (payload.traits.gender) {
    const validGenders = ['m', 'f', 'n', 'o', 'p', 'u'];
    const isValidGender = validGenders.indexOf(payload.traits.gender) > -1;

    if (isValidGender) {
      _reactNativeAppboySdk.default.setGender(payload.traits.gender);
    }
  }

  if (payload.traits.phone) {
    _reactNativeAppboySdk.default.setPhoneNumber(payload.traits.phone);
  }

  if (payload.traits.address) {
    if (payload.traits.address.city) {
      _reactNativeAppboySdk.default.setHomeCity(payload.traits.address.city);
    }

    if (payload.traits.address.country) {
      _reactNativeAppboySdk.default.setCountry(payload.traits.address.country);
    }
  }

  const appBoyTraits = ['birthday', 'email', 'firstName', 'lastName', 'gender', 'phone', 'address'];
  Object.entries(payload.traits).forEach(_ref => {
    let [key, value] = _ref;

    if (appBoyTraits.indexOf(key) < 0) {
      _reactNativeAppboySdk.default.setCustomUserAttribute(key, value);
    }
  });
  return payload;
};

exports.default = _default;
//# sourceMappingURL=identify.js.map