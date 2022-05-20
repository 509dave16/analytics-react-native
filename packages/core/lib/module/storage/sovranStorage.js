function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { createStore, registerBridgeStore } from '@segment/sovran-react-native';
import deepmerge from 'deepmerge';
import { getUUID } from '../uuid';
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
    anonymousId: getUUID(),
    userId: undefined,
    traits: undefined
  }
};

/**
 * Global store for deeplink information
 * A single instance is needed for all SovranStorage objects since only one deeplink data exists at a time
 * No need to persist this information
 */
const deepLinkStore = createStore({
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


registerBridgeStore({
  store: deepLinkStore,
  actions: {
    'add-deepLink-data': addDeepLinkData
  }
});
export class SovranStorage {
  constructor(config) {
    _defineProperty(this, "storeId", void 0);

    _defineProperty(this, "storePersistor", void 0);

    _defineProperty(this, "readinessStore", void 0);

    _defineProperty(this, "contextStore", void 0);

    _defineProperty(this, "settingsStore", void 0);

    _defineProperty(this, "eventsStore", void 0);

    _defineProperty(this, "userInfoStore", void 0);

    _defineProperty(this, "deepLinkStore", deepLinkStore);

    _defineProperty(this, "fixAnonymousId", () => {
      const fixUnsubscribe = this.userInfoStore.subscribe(store => {
        if (store.userInfo.anonymousId === 'anonymousId') {
          this.userInfoStore.dispatch(state => {
            return {
              userInfo: { ...state.userInfo,
                anonymousId: getUUID()
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
            context: deepmerge(state.context, value)
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

    _defineProperty(this, "events", {
      get: () => this.eventsStore.getState().events,
      onChange: callback => this.eventsStore.subscribe(store => callback(store.events)),
      add: event => {
        const eventsToAdd = Array.isArray(event) ? event : [event];
        this.eventsStore.dispatch(state => ({
          events: [...state.events, ...eventsToAdd]
        }));
      },
      remove: event => {
        this.eventsStore.dispatch(state => {
          const eventsToRemove = Array.isArray(event) ? event : [event];

          if (eventsToRemove.length === 0 || state.events.length === 0) {
            return state;
          }

          const setToRemove = new Set(eventsToRemove);
          const filteredEvents = state.events.filter(e => !setToRemove.has(e));
          return {
            events: filteredEvents
          };
        });
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
    this.readinessStore = createStore({
      hasLoadedContext: false
    }, {
      persist: {
        storeId: DEFAULT_STORE_NAME,
        persistor: this.storePersistor
      }
    });
    this.contextStore = createStore({
      context: INITIAL_VALUES.context
    }, {
      persist: {
        storeId: `${this.storeId}-context`,
        persistor: this.storePersistor
      }
    });
    this.settingsStore = createStore({
      settings: INITIAL_VALUES.settings
    }, {
      persist: {
        storeId: `${this.storeId}-settings`,
        persistor: this.storePersistor
      }
    });
    this.eventsStore = createStore({
      events: INITIAL_VALUES.events
    }, {
      persist: {
        storeId: `${this.storeId}-events`,
        persistor: this.storePersistor
      }
    });
    this.userInfoStore = createStore({
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
//# sourceMappingURL=sovranStorage.js.map