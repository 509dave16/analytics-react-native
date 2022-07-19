function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { createStore } from '@segment/sovran-react-native';
import { defaultConfig } from '../constants';
import { UtilityPlugin } from '../plugin';
import { PluginType } from '../types';
/**
 * This plugin manages a queue where all events get added to after timeline processing.
 * It takes a onFlush callback to trigger any action particular to your destination sending events.
 * It can autotrigger a flush of the queue when it reaches the config flushAt limit.
 */

export class QueueFlushingPlugin extends UtilityPlugin {
  // Gets executed last to keep the queue after all timeline processing is done

  /**
   * @param onFlush callback to execute when the queue is flushed (either by reaching the limit or manually) e.g. code to upload events to your destination
   */
  constructor(onFlush) {
    super();

    _defineProperty(this, "type", PluginType.after);

    _defineProperty(this, "isPendingUpload", false);

    _defineProperty(this, "queueStore", void 0);

    _defineProperty(this, "unsubscribe", void 0);

    _defineProperty(this, "onFlush", void 0);

    this.onFlush = onFlush;
  }

  configure(analytics) {
    var _analytics$getConfig, _this$unsubscribe;

    super.configure(analytics);
    const config = (_analytics$getConfig = analytics === null || analytics === void 0 ? void 0 : analytics.getConfig()) !== null && _analytics$getConfig !== void 0 ? _analytics$getConfig : defaultConfig; // Create its own storage per SegmentDestination instance to support multiple instances

    this.queueStore = createStore({
      events: []
    }, {
      persist: {
        storeId: `${config.writeKey}-events`,
        persistor: config.storePersistor
      }
    }); // Setup subscribers to flush the events

    (_this$unsubscribe = this.unsubscribe) === null || _this$unsubscribe === void 0 ? void 0 : _this$unsubscribe.call(this);
    this.unsubscribe = this.queueStore.subscribe(_ref => {
      let {
        events
      } = _ref;

      if (events.length >= config.flushAt) {
        this.flush();
      }
    });
  }

  execute(event) {
    var _this$queueStore;

    (_this$queueStore = this.queueStore) === null || _this$queueStore === void 0 ? void 0 : _this$queueStore.dispatch(state => {
      const events = [...state.events, event];
      return {
        events
      };
    });
    return event;
  }
  /**
   * Calls the onFlush callback with the events in the queue
   */


  async flush() {
    var _this$queueStore$getS, _this$queueStore2;

    const events = (_this$queueStore$getS = (_this$queueStore2 = this.queueStore) === null || _this$queueStore2 === void 0 ? void 0 : _this$queueStore2.getState().events) !== null && _this$queueStore$getS !== void 0 ? _this$queueStore$getS : [];

    if (!this.isPendingUpload) {
      try {
        this.isPendingUpload = true;
        await this.onFlush(events);
      } finally {
        this.isPendingUpload = false;
      }
    }
  }
  /**
   * Removes one or multiple events from the queue
   * @param events events to remove
   */


  dequeue(events) {
    var _this$queueStore3;

    return (_this$queueStore3 = this.queueStore) === null || _this$queueStore3 === void 0 ? void 0 : _this$queueStore3.dispatch(state => {
      const eventsToRemove = Array.isArray(events) ? events : [events];

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

}
//# sourceMappingURL=QueueFlushingPlugin.js.map