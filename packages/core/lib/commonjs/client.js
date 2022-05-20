"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAnalytics = exports.createClient = exports.AnalyticsProvider = void 0;

var _react = _interopRequireWildcard(require("react"));

var _constants = require("./constants");

var _logger = require("./logger");

var _analytics = require("./analytics");

var _storage = require("./storage");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const createClient = config => {
  const logger = (0, _logger.createLogger)();

  if (typeof (config === null || config === void 0 ? void 0 : config.debug) === 'boolean') {
    if (config.debug) {
      logger.enable();
    } else {
      logger.disable();
    }
  }

  const clientConfig = { ..._constants.defaultConfig,
    ...config
  };
  const segmentStore = new _storage.SovranStorage({
    storeId: config.writeKey,
    storePersistor: config.storePersistor
  });
  const client = new _analytics.SegmentClient({
    config: clientConfig,
    logger,
    store: segmentStore
  });
  client.init();
  return client;
};

exports.createClient = createClient;
const Context = /*#__PURE__*/(0, _react.createContext)(null);

const AnalyticsProvider = _ref => {
  let {
    client,
    children
  } = _ref;

  if (!client) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(Context.Provider, {
    value: client
  }, children);
};

exports.AnalyticsProvider = AnalyticsProvider;

const useAnalytics = () => {
  const client = (0, _react.useContext)(Context);

  if (!client) {
    console.error('Segment client not configured!', 'To use the useAnalytics() hook, pass an initialized Segment client into the AnalyticsProvider'); // @ts-ignore

    return {};
  }

  return {
    screen: function () {
      return client.screen(...arguments);
    },
    track: function () {
      return client.track(...arguments);
    },
    identify: function () {
      return client.identify(...arguments);
    },
    flush: () => client.flush(),
    group: function () {
      return client.group(...arguments);
    },
    alias: function () {
      return client.alias(...arguments);
    },
    reset: function () {
      return client.reset(...arguments);
    }
  };
};

exports.useAnalytics = useAnalytics;
//# sourceMappingURL=client.js.map