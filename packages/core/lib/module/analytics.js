function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import deepmerge from 'deepmerge';
import allSettled from 'promise.allsettled';
import { AppState } from 'react-native';
import { settingsCDN } from './constants';
import { getContext } from './context';
import { applyRawEventData, createAliasEvent, createGroupEvent, createIdentifyEvent, createScreenEvent, createTrackEvent } from './events';
import { InjectContext } from './plugins/Context';
import { SegmentDestination } from './plugins/SegmentDestination';
import { Timeline } from './timeline';
import { PluginType, UpdateType } from './types';
import { getPluginsWithFlush, getPluginsWithReset } from './util';
import { getUUID } from './uuid'; // Important! We need to polyfill Promise.allSettled because it's not supported in RN (https://github.com/facebook/react-native/issues/30236)

allSettled.shim();
export class SegmentClient {
  // the config parameters for the client - a merge of user provided and default options
  // Storage
  // current app state
  // subscription for propagating changes to appState
  // logger
  // internal time to know when to flush, ticks every second
  // unsubscribe watchers for the store
  // whether the user has called cleanup
  get platformPlugins() {
    const plugins = []; // add context plugin as well as it's platform specific internally.
    // this must come first.

    plugins.push(new InjectContext()); // setup lifecycle if desired

    if (this.config.trackAppLifecycleEvents) {// todo: more plugins!
    }

    return plugins;
  } // Watchables

  /**
   * Access or subscribe to client context
   */


  /**
   * Returns the plugins currently loaded in the timeline
   * @param ofType Type of plugins, defaults to all
   * @returns List of Plugin objects
   */
  getPlugins(ofType) {
    var _ref;

    const plugins = { ...this.timeline.plugins
    };

    if (ofType !== undefined) {
      var _plugins$ofType;

      return [...((_plugins$ofType = plugins[ofType]) !== null && _plugins$ofType !== void 0 ? _plugins$ofType : [])];
    }

    return (_ref = [...this.getPlugins(PluginType.before), ...this.getPlugins(PluginType.enrichment), ...this.getPlugins(PluginType.utility), ...this.getPlugins(PluginType.destination), ...this.getPlugins(PluginType.after)]) !== null && _ref !== void 0 ? _ref : [];
  }
  /**
   * Retrieves a copy of the current client configuration
   */


  getConfig() {
    return { ...this.config
    };
  }

  constructor(_ref2) {
    let {
      config,
      logger,
      store
    } = _ref2;

    _defineProperty(this, "config", void 0);

    _defineProperty(this, "store", void 0);

    _defineProperty(this, "appState", 'unknown');

    _defineProperty(this, "appStateSubscription", void 0);

    _defineProperty(this, "logger", void 0);

    _defineProperty(this, "flushInterval", null);

    _defineProperty(this, "watchers", []);

    _defineProperty(this, "destroyed", false);

    _defineProperty(this, "isAddingPlugins", false);

    _defineProperty(this, "timeline", void 0);

    _defineProperty(this, "pendingEvents", []);

    _defineProperty(this, "pluginsToAdd", []);

    _defineProperty(this, "isInitialized", false);

    _defineProperty(this, "isContextLoaded", false);

    _defineProperty(this, "onContextLoadedCallback", void 0);

    _defineProperty(this, "context", void 0);

    _defineProperty(this, "adTrackingEnabled", void 0);

    _defineProperty(this, "settings", void 0);

    _defineProperty(this, "userInfo", void 0);

    _defineProperty(this, "deepLinkData", void 0);

    this.logger = logger;
    this.config = config;
    this.store = store;
    this.timeline = new Timeline(); // Initialize the watchables

    this.context = {
      get: this.store.context.get,
      set: this.store.context.set,
      onChange: this.store.context.onChange
    };
    this.adTrackingEnabled = {
      get: () => {
        var _this$store$context$g, _this$store$context$g2, _this$store$context$g3;

        return (_this$store$context$g = (_this$store$context$g2 = this.store.context.get()) === null || _this$store$context$g2 === void 0 ? void 0 : (_this$store$context$g3 = _this$store$context$g2.device) === null || _this$store$context$g3 === void 0 ? void 0 : _this$store$context$g3.adTrackingEnabled) !== null && _this$store$context$g !== void 0 ? _this$store$context$g : false;
      },
      onChange: callback => this.store.context.onChange(context => {
        var _context$device$adTra, _context$device;

        callback((_context$device$adTra = context === null || context === void 0 ? void 0 : (_context$device = context.device) === null || _context$device === void 0 ? void 0 : _context$device.adTrackingEnabled) !== null && _context$device$adTra !== void 0 ? _context$device$adTra : false);
      })
    };
    this.settings = {
      get: this.store.settings.get,
      onChange: this.store.settings.onChange
    };
    this.userInfo = {
      get: this.store.userInfo.get,
      onChange: this.store.userInfo.onChange
    };
    this.deepLinkData = {
      get: this.store.deepLinkData.get,
      onChange: this.store.deepLinkData.onChange
    }; // Watch for isReady so that we can handle any pending events
    // Delays events processing in the timeline until the store is ready to prevent missing data injected from the plugins

    this.store.isReady.onChange(value => this.onStorageReady(value)); // add segment destination plugin unless
    // asked not to via configuration.

    if (this.config.autoAddSegmentDestination) {
      const segmentDestination = new SegmentDestination();
      this.add({
        plugin: segmentDestination
      });
    } // Setup platform specific plugins


    this.platformPlugins.forEach(plugin => this.add({
      plugin: plugin
    }));
  }
  /**
   * Initializes the client plugins, settings and subscribers.
   * Can only be called once.
   */


  async init() {
    if (this.isInitialized) {
      this.logger.warn('SegmentClient already initialized');
      return;
    }

    await this.fetchSettings(); // flush any stored events

    this.flush(false); // set up the timer/subscription for knowing when to flush events

    this.setupInterval();
    this.setupStorageSubscribers(); // set up tracking for lifecycle events

    this.setupLifecycleEvents(); // check if the app was opened from a deep link

    await this.trackDeepLinks(); // save the current installed version

    await this.checkInstalledVersion();
    this.isInitialized = true;
  }

  async fetchSettings() {
    const settingsEndpoint = `${settingsCDN}/${this.config.writeKey}/settings`;

    try {
      const res = await fetch(settingsEndpoint);
      const resJson = await res.json();
      const integrations = resJson.integrations;
      this.logger.info(`Received settings from Segment succesfully.`);
      this.store.settings.set(integrations);
    } catch {
      this.logger.warn(`Could not receive settings from Segment. ${this.config.defaultSettings ? 'Will use the default settings.' : 'Device mode destinations will be ignored unless you specify default settings in the client config.'}`);

      if (this.config.defaultSettings) {
        this.store.settings.set(this.config.defaultSettings);
      }
    }
  }
  /**
   * Clears all subscriptions to the store
   */


  unsubscribeStorageWatchers() {
    if (this.watchers.length > 0) {
      for (const unsubscribe of this.watchers) {
        try {
          unsubscribe();
        } catch (e) {
          this.logger.error(e);
        }
      }
    }
  }
  /**
   * There is no garbage collection in JS, which means that any listeners, timeouts and subscriptions
   * would run until the application closes
   *
   * This method exists in case the user for some reason needs to recreate the class instance during runtime.
   * In this case, they should run client.cleanup() to destroy the listeners in the old client before creating a new one.
   *
   * There is a Stage 3 EMCAScript proposal to add a user-defined finalizer, which we could potentially switch to if
   * it gets approved: https://github.com/tc39/proposal-weakrefs#finalizers
   */


  cleanup() {
    var _this$appStateSubscri;

    if (this.flushInterval) {
      clearInterval(this.flushInterval);
    }

    this.unsubscribeStorageWatchers();
    (_this$appStateSubscri = this.appStateSubscription) === null || _this$appStateSubscri === void 0 ? void 0 : _this$appStateSubscri.remove();
    this.destroyed = true;
    this.isInitialized = false;
  }

  setupInterval() {
    if (this.flushInterval !== null && this.flushInterval !== undefined) {
      clearInterval(this.flushInterval);
    }

    this.flushInterval = setTimeout(() => {
      this.flush();
    }, this.config.flushInterval * 1000);
  }

  setupStorageSubscribers() {
    this.unsubscribeStorageWatchers();
  }

  setupLifecycleEvents() {
    var _this$appStateSubscri2;

    (_this$appStateSubscri2 = this.appStateSubscription) === null || _this$appStateSubscri2 === void 0 ? void 0 : _this$appStateSubscri2.remove();
    this.appStateSubscription = AppState.addEventListener('change', nextAppState => {
      this.handleAppStateChange(nextAppState);
    });
  }
  /**
     Applies the supplied closure to the currently loaded set of plugins.
     NOTE: This does not apply to plugins contained within DestinationPlugins.
      - Parameter closure: A closure that takes an plugin to be operated on as a parameter.
   */


  apply(closure) {
    this.timeline.apply(closure);
  }
  /**
   * Adds a new plugin to the currently loaded set.
   * @param {{ plugin: Plugin, settings?: IntegrationSettings }} Plugin to be added. Settings are optional if you want to force a configuration instead of the Segment Cloud received one
   */


  add(_ref3) {
    let {
      plugin,
      settings
    } = _ref3;

    // plugins can either be added immediately or
    // can be cached and added later during the next state update
    // this is to avoid adding plugins before network requests made as part of setup have resolved
    if (settings !== undefined && plugin.type === PluginType.destination) {
      this.store.settings.add(plugin.key, settings);
    }

    if (!this.store.isReady.get()) {
      this.pluginsToAdd.push(plugin);
    } else {
      this.addPlugin(plugin);
    }
  }

  addPlugin(plugin) {
    plugin.configure(this);
    this.timeline.add(plugin);
  }
  /**
     Removes and unloads plugins with a matching name from the system.
      - Parameter pluginName: An plugin name.
  */


  remove(_ref4) {
    let {
      plugin
    } = _ref4;
    this.timeline.remove(plugin);
  }

  process(incomingEvent) {
    const event = applyRawEventData(incomingEvent, this.store.userInfo.get());

    if (this.store.isReady.get() === true) {
      this.timeline.process(event);
    } else {
      this.pendingEvents.push(event);
    }
  }

  async trackDeepLinks() {
    if (this.getConfig().trackDeepLinks === true) {
      const deepLinkProperties = this.store.deepLinkData.get();
      this.trackDeepLinkEvent(deepLinkProperties);
      this.store.deepLinkData.onChange(data => {
        this.trackDeepLinkEvent(data);
      });
    }
  }

  trackDeepLinkEvent(deepLinkProperties) {
    if (deepLinkProperties.url !== '') {
      const event = createTrackEvent({
        event: 'Deep Link Opened',
        properties: { ...deepLinkProperties
        }
      });
      this.process(event);
      this.logger.info('TRACK (Deep Link Opened) event saved', event);
    }
  }
  /**
   * Executes when the state store is initialized.
   * @param isReady
   */


  onStorageReady(isReady) {
    if (isReady) {
      // Add all plugins awaiting store
      if (this.pluginsToAdd.length > 0 && !this.isAddingPlugins) {
        this.isAddingPlugins = true;

        try {
          // start by adding the plugins
          this.pluginsToAdd.forEach(plugin => {
            this.addPlugin(plugin);
          }); // now that they're all added, clear the cache
          // this prevents this block running for every update

          this.pluginsToAdd = [];
        } finally {
          this.isAddingPlugins = false;
        }
      } // Send all events in the queue


      for (const e of this.pendingEvents) {
        this.timeline.process(e);
      }

      this.pendingEvents = [];
    }
  }

  async flush() {
    let debounceInterval = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    if (this.destroyed) {
      return;
    }

    if (debounceInterval) {
      // Reset interval
      this.setupInterval();
    }

    const promises = [];
    getPluginsWithFlush(this.timeline).forEach(plugin => {
      promises.push(plugin.flush());
    });
    await Promise.allSettled(promises);
    return Promise.resolve();
  }

  screen(name, options) {
    const event = createScreenEvent({
      name,
      properties: options
    });
    this.process(event);
    this.logger.info('SCREEN event saved', event);
  }

  track(eventName, options) {
    const event = createTrackEvent({
      event: eventName,
      properties: options
    });
    this.process(event);
    this.logger.info('TRACK event saved', event);
  }

  identify(userId, userTraits) {
    const userInfo = this.store.userInfo.get();
    const {
      traits: currentUserTraits
    } = userInfo;
    const mergedTraits = { ...currentUserTraits,
      ...userTraits
    };
    const event = createIdentifyEvent({
      userId,
      userTraits: mergedTraits
    });
    this.store.userInfo.set({ ...userInfo,
      userId: userId !== null && userId !== void 0 ? userId : userInfo.userId,
      traits: mergedTraits
    });
    this.process(event);
    this.logger.info('IDENTIFY event saved', event);
  }

  group(groupId, groupTraits) {
    const event = createGroupEvent({
      groupId,
      groupTraits
    });
    this.process(event);
    this.logger.info('GROUP event saved', event);
  }

  alias(newUserId) {
    const {
      anonymousId,
      userId
    } = this.userInfo.get();
    const event = createAliasEvent({
      anonymousId,
      userId,
      newUserId
    });
    this.store.userInfo.set({ ...this.store.userInfo.get(),
      userId: newUserId
    });
    this.process(event);
    this.logger.info('ALIAS event saved', event);
  }
  /**
   * Called once when the client is first created
   *
   * Detect and save the the currently installed application version
   * Send application lifecycle events if trackAppLifecycleEvents is enabled
   *
   * Exactly one of these events will be sent, depending on the current and previous version:s
   * Application Installed - no information on the previous version, so it's a fresh install
   * Application Updated - the previous detected version is different from the current version
   * Application Opened - the previously detected version is same as the current version
   */


  async checkInstalledVersion() {
    const context = await getContext(undefined, this.config);
    const previousContext = this.store.context.get(); // Only overwrite the previous context values to preserve any values that are added by enrichment plugins like IDFA

    await this.store.context.set(deepmerge(previousContext !== null && previousContext !== void 0 ? previousContext : {}, context)); // Only callback during the intial context load

    if (this.onContextLoadedCallback !== undefined && !this.isContextLoaded) {
      this.onContextLoadedCallback(UpdateType.initial);
    }

    this.isContextLoaded = true;

    if (!this.config.trackAppLifecycleEvents) {
      return;
    }

    if ((previousContext === null || previousContext === void 0 ? void 0 : previousContext.app) === undefined) {
      const event = createTrackEvent({
        event: 'Application Installed',
        properties: {
          version: context.app.version,
          build: context.app.build
        }
      });
      this.process(event);
      this.logger.info('TRACK (Application Installed) event saved', event);
    } else if (context.app.version !== previousContext.app.version) {
      const event = createTrackEvent({
        event: 'Application Updated',
        properties: {
          version: context.app.version,
          build: context.app.build,
          previous_version: previousContext.app.version,
          previous_build: previousContext.app.build
        }
      });
      this.process(event);
      this.logger.info('TRACK (Application Updated) event saved', event);
    }

    const event = createTrackEvent({
      event: 'Application Opened',
      properties: {
        from_background: false,
        version: context.app.version,
        build: context.app.build
      }
    });
    this.process(event);
    this.logger.info('TRACK (Application Opened) event saved', event);
  }
  /**
   * AppState event listener. Called whenever the app state changes.
   *
   * Send application lifecycle events if trackAppLifecycleEvents is enabled.
   *
   * Application Opened - only when the app state changes from 'inactive' or 'background' to 'active'
   *   The initial event from 'unknown' to 'active' is handled on launch in checkInstalledVersion
   * Application Backgrounded - when the app state changes from 'inactive' or 'background' to 'active
   *
   * @param nextAppState 'active', 'inactive', 'background' or 'unknown'
   */


  handleAppStateChange(nextAppState) {
    if (this.config.trackAppLifecycleEvents) {
      if (['inactive', 'background'].includes(this.appState) && nextAppState === 'active') {
        var _context$app, _context$app2;

        const context = this.store.context.get();
        const event = createTrackEvent({
          event: 'Application Opened',
          properties: {
            from_background: true,
            version: context === null || context === void 0 ? void 0 : (_context$app = context.app) === null || _context$app === void 0 ? void 0 : _context$app.version,
            build: context === null || context === void 0 ? void 0 : (_context$app2 = context.app) === null || _context$app2 === void 0 ? void 0 : _context$app2.build
          }
        });
        this.process(event);
        this.logger.info('TRACK (Application Opened) event saved', event);
      } else if (this.appState === 'active' && ['inactive', 'background'].includes(nextAppState)) {
        const event = createTrackEvent({
          event: 'Application Backgrounded'
        });
        this.process(event);
        this.logger.info('TRACK (Application Backgrounded) event saved', event);
      }
    }

    this.appState = nextAppState;
  }

  reset() {
    let resetAnonymousId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    const anonymousId = resetAnonymousId === true ? getUUID() : this.store.userInfo.get().anonymousId;
    this.store.userInfo.set({
      anonymousId,
      userId: undefined,
      traits: undefined
    });
    getPluginsWithReset(this.timeline).forEach(plugin => plugin.reset());
    this.logger.info('Client has been reset');
  }
  /**
   * Registers a callback for when the client has loaded the device context. This happens at the startup of the app, but
   * it is handy for plugins that require context data during configure as it guarantees the context data is available.
   *
   * If the context is already loaded it will call the callback immediately.
   *
   * @param callback Function to call when context is ready.
   */


  onContextLoaded(callback) {
    this.onContextLoadedCallback = callback;

    if (this.isContextLoaded) {
      this.onContextLoadedCallback(UpdateType.initial);
    }
  }

}
//# sourceMappingURL=analytics.js.map