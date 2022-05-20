import { AppEventsLogger } from 'react-native-fbsdk-next';
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

export default (async event => {
  let name = sanitizeName(event.name);
  let params = sanitizeEvent(event);
  AppEventsLogger.logEvent(name, params);
});
//# sourceMappingURL=screen.js.map