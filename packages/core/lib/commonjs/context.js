"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getContext = void 0;

var _reactNative = require("react-native");

var _package = _interopRequireDefault(require("../package.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getContext = async function () {
  let userTraits = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const {
    AnalyticsReactNative
  } = _reactNative.NativeModules;
  const {
    appName,
    appVersion,
    buildNumber,
    bundleId,
    locale,
    networkType,
    osName,
    osVersion,
    screenHeight,
    screenWidth,
    timezone,
    manufacturer,
    model,
    deviceName,
    deviceId,
    deviceType,
    screenDensity
  } = await AnalyticsReactNative.getContextInfo(config);
  const device = {
    id: deviceId,
    manufacturer: manufacturer,
    model: model,
    name: deviceName,
    type: deviceType
  };
  return {
    app: {
      build: buildNumber,
      name: appName,
      namespace: bundleId,
      version: appVersion
    },
    device,
    library: {
      name: _package.default.name,
      version: _package.default.version
    },
    locale,
    network: {
      cellular: networkType === 'cellular',
      wifi: networkType === 'wifi'
    },
    os: {
      name: osName,
      version: osVersion
    },
    screen: {
      width: screenWidth,
      height: screenHeight,
      density: screenDensity
    },
    timezone,
    traits: userTraits
  };
};

exports.getContext = getContext;
//# sourceMappingURL=context.js.map