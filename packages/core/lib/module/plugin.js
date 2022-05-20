function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Timeline } from './timeline';
import { EventType, PluginType } from './types';
export class Plugin {
  constructor() {
    _defineProperty(this, "type", PluginType.utility);

    _defineProperty(this, "analytics", undefined);
  }

  configure(analytics) {
    this.analytics = analytics;
  } // @ts-ignore


  update(settings, type) {// do nothing by default, user can override.
  }

  execute(event) {
    // do nothing.
    return event;
  }

  shutdown() {// do nothing by default, user can override.
  }

}
export class EventPlugin extends Plugin {
  execute(event) {
    if (event === undefined) {
      return event;
    }

    let result = event;

    switch (result.type) {
      case EventType.IdentifyEvent:
        result = this.identify(result);
        break;

      case EventType.TrackEvent:
        result = this.track(result);
        break;

      case EventType.ScreenEvent:
        result = this.screen(result);
        break;

      case EventType.AliasEvent:
        result = this.alias(result);
        break;

      case EventType.GroupEvent:
        result = this.group(result);
        break;
    }

    return result;
  } // Default implementations that forward the event. This gives plugin
  // implementors the chance to interject on an event.


  identify(event) {
    return event;
  }

  track(event) {
    return event;
  }

  screen(event) {
    return event;
  }

  alias(event) {
    return event;
  }

  group(event) {
    return event;
  }

  flush() {}

  reset() {}

}
export class DestinationPlugin extends EventPlugin {
  constructor() {
    super(...arguments);

    _defineProperty(this, "type", PluginType.destination);

    _defineProperty(this, "key", '');

    _defineProperty(this, "timeline", new Timeline());
  }

  hasSettings() {
    var _this$analytics, _this$analytics$setti;

    return ((_this$analytics = this.analytics) === null || _this$analytics === void 0 ? void 0 : (_this$analytics$setti = _this$analytics.settings.get()) === null || _this$analytics$setti === void 0 ? void 0 : _this$analytics$setti[this.key]) !== undefined;
  }

  isEnabled(event) {
    var _event$integrations;

    let customerDisabled = false;

    if (((_event$integrations = event.integrations) === null || _event$integrations === void 0 ? void 0 : _event$integrations[this.key]) === false) {
      customerDisabled = true;
    }

    return this.hasSettings() && !customerDisabled;
  }
  /**
     Adds a new plugin to the currently loaded set.
      - Parameter plugin: The plugin to be added.
     - Returns: Returns the name of the supplied plugin.
  */


  add(plugin) {
    const analytics = this.analytics;

    if (analytics) {
      plugin.configure(analytics);
    }

    this.timeline.add(plugin);
    return plugin;
  }
  /**
     Applies the supplied closure to the currently loaded set of plugins.
      - Parameter closure: A closure that takes an plugin to be operated on as a parameter.
  */


  apply(closure) {
    this.timeline.apply(closure);
  }

  configure(analytics) {
    this.analytics = analytics;
    this.apply(plugin => {
      plugin.configure(analytics);
    });
  }
  /**
     Removes and unloads plugins with a matching name from the system.
      - Parameter pluginName: An plugin name.
  */


  remove(plugin) {
    this.timeline.remove(plugin);
  }

  execute(event) {
    if (!this.isEnabled(event)) {
      return undefined;
    } // Apply before and enrichment plugins


    const beforeResult = this.timeline.applyPlugins({
      type: PluginType.before,
      event
    });

    if (beforeResult === undefined) {
      return;
    }

    const enrichmentResult = this.timeline.applyPlugins({
      type: PluginType.enrichment,
      event: beforeResult
    }); // Now send the event to the destination by executing the normal flow of an EventPlugin

    super.execute(enrichmentResult); // apply .after plugins

    let afterResult = this.timeline.applyPlugins({
      type: PluginType.after,
      event: enrichmentResult
    });
    return afterResult;
  }

}
export class UtilityPlugin extends EventPlugin {} // For internal platform-specific bits

export class PlatformPlugin extends Plugin {}
//# sourceMappingURL=plugin.js.map