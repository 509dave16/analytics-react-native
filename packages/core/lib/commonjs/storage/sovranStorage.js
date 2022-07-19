"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SovranStorage = void 0;

var _sovranReactNative = require("@segment/sovran-react-native");

var _deepmerge = _interopRequireDefault(require("deepmerge"));

var _uuid = require("../uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// NOTE: Not exported from @segment/sovran-react-native. Must explicitly declare here.
// Also this fallback is used in store.ts in @segment/sovran-react-native yet "storeId" is required.
const DEFAULT_STORE_NAME = 'default';
const INITIAL_VALUES = {
  isReady: true,
  events: [],
  eventsToRetry: [],
  context: {},
  settings: {},
  userInfo: {
    anonymousId: (0, _uuid.getUUID)(),
    userId: undefined,
    traits: undefined
  }
};

/**
 * Global store for deeplink information
 * A single instance is needed for all SovranStorage objects since only one deeplink data exists at a time
 * No need to persist this information
 */
const deepLinkStore = (0, _sovranReactNative.createStore)({
  referring_application: '',
  url: ''
});
/**
 * Action to set the referring app and link url
 * @param deepLinkData referring app and link url
 */

const addDeepLinkData = deepLinkData => () => {
  return {
    referring_application: deepLinkData.referring_application,
    url: deepLinkData.url
  };
};
/**
 * Registers the deeplink store to listen to native events
 */


(0, _sovranReactNative.registerBridgeStore)({
  store: deepLinkStore,
  actions: {
    'add-deepLink-data': addDeepLinkData
  }
});

class SovranStorage {
  constructor(config) {
    _defineProperty(this, "storeId", void 0);

    _defineProperty(this, "storePersistor", void 0);

    _defineProperty(this, "readinessStore", void 0);

    _defineProperty(this, "contextStore", void 0);

    _defineProperty(this, "settingsStore", void 0);

    _defineProperty(this, "userInfoStore", void 0);

    _defineProperty(this, "deepLinkStore", deepLinkStore);

    _defineProperty(this, "fixAnonymousId", () => {
      const fixUnsubscribe = this.userInfoStore.subscribe(store => {
        if (store.userInfo.anonymousId === 'anonymousId') {
          this.userInfoStore.dispatch(state => {
            return {
              userInfo: { ...state.userInfo,
                anonymousId: (0, _uuid.getUUID)()
              }
            };
          });
        }

        fixUnsubscribe();
      });
    });

    _defineProperty(this, "isReady", {
      get: () => {
        const ready = this.readinessStore.getState();
        return ready.hasLoadedContext;
      },
      onChange: callback => {
        return this.readinessStore.subscribe(store => {
          if (store.hasLoadedContext) {
            callback(true);
          }
        });
      }
    });

    _defineProperty(this, "context", {
      get: () => this.contextStore.getState().context,
      onChange: callback => this.contextStore.subscribe(store => callback(store.context)),
      set: async value => {
        const {
          context
        } = await this.contextStore.dispatch(state => {
          return {
            context: (0, _deepmerge.default)(state.context, value)
          };
        });
        return context;
      }
    });

    _defineProperty(this, "settings", {
      get: () => this.settingsStore.getState().settings,
      onChange: callback => this.settingsStore.subscribe(store => callback(store.settings)),
      set: async value => {
        const {
          settings
        } = await this.settingsStore.dispatch(state => {
          return {
            settings: { ...state.settings,
              ...value
            }
          };
        });
        return settings;
      },
      add: (key, value) => {
        this.settingsStore.dispatch(state => ({
          settings: { ...state.settings,
            [key]: value
          }
        }));
      }
    });

    _defineProperty(this, "userInfo", {
      get: () => this.userInfoStore.getState().userInfo,
      onChange: callback => this.userInfoStore.subscribe(store => callback(store.userInfo)),
      set: async value => {
        const {
          userInfo
        } = await this.userInfoStore.dispatch(state => ({
          userInfo: { ...state.userInfo,
            ...value
          }
        }));
        return userInfo;
      }
    });

    _defineProperty(this, "deepLinkData", {
      get: () => this.deepLinkStore.getState(),
      onChange: callback => this.deepLinkStore.subscribe(callback)
    });

    this.storeId = config.storeId;
    this.storePersistor = config.storePersistor;
    this.readinessStore = (0, _sovranReactNative.createStore)({
      hasLoadedContext: false
    }, {
      persist: {
        storeId: DEFAULT_STORE_NAME,
        persistor: this.storePersistor
      }
    });
    this.contextStore = (0, _sovranReactNative.createStore)({
      context: INITIAL_VALUES.context
    }, {
      persist: {
        storeId: `${this.storeId}-context`,
        persistor: this.storePersistor
      }
    });
    this.settingsStore = (0, _sovranReactNative.createStore)({
      settings: INITIAL_VALUES.settings
    }, {
      persist: {
        storeId: `${this.storeId}-settings`,
        persistor: this.storePersistor
      }
    });
    this.userInfoStore = (0, _sovranReactNative.createStore)({
      userInfo: INITIAL_VALUES.userInfo
    }, {
      persist: {
        storeId: `${this.storeId}-userInfo`,
        persistor: this.storePersistor
      }
    });
    this.fixAnonymousId(); // Wait for context to be loaded

    const unsubscribeContext = this.contextStore.subscribe(store => {
      if (store.context !== INITIAL_VALUES.context) {
        this.readinessStore.dispatch(state => ({ ...state,
          hasLoadedContext: true
        }));
        unsubscribeContext();
      }
    });
  }
  /**
   * This is a fix for users that have started the app with the anonymousId set to 'anonymousId' bug
   */


}

exports.SovranStorage = SovranStorage;
//# sourceMappingURL=sovranStorage.js.map