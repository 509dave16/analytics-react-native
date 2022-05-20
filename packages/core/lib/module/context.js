import { NativeModules } from 'react-native';
import packageJson from '../package.json';
export const getContext = async function () {
  let userTraits = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const {
    AnalyticsReactNative
  } = NativeModules;
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
      name: packageJson.name,
      version: packageJson.version
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
//# sourceMappingURL=context.js.map