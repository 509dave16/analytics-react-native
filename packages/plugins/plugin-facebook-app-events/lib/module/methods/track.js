import { generateMapTransform } from '@segment/analytics-react-native';
import { AppEventsLogger } from 'react-native-fbsdk-next';
import { mapEventProps, transformMap } from './parameterMapping'; // FB Event Names must be <= 40 characters

const MAX_CHARACTERS_EVENT_NAME = 40;
const mappedPropNames = generateMapTransform(mapEventProps, transformMap);

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
    if (Object.values(mapEventProps).some(fbProp => fbProp === property)) {
      params[property] = event.properties[property];
    }
  });
  return { ...params,
    fb_num_items: productCount,
    _logTime: logTime,
    _appVersion: event.context.app.version
  };
};

export default (event => {
  var _ref2;

  const safeEvent = mappedPropNames(event);
  let convertedName = safeEvent.event;
  let safeName = sanitizeName(convertedName);
  let safeProps = sanitizeEvent(safeEvent);
  const currency = (_ref2 = safeProps.fb_currency) !== null && _ref2 !== void 0 ? _ref2 : 'USD';

  if (safeProps._valueToSum !== undefined) {
    let purchasePrice = safeProps._valueToSum;
    AppEventsLogger.logPurchase(purchasePrice, currency, safeProps);
  } else {
    AppEventsLogger.logEvent(safeName, safeProps);
  }
});
//# sourceMappingURL=track.js.map