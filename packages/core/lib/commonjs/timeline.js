"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Timeline = void 0;

var _types = require("./types");

var _util = require("./util");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Timeline {
  constructor() {
    _defineProperty(this, "plugins", {});
  }

  add(plugin) {
    var _plugin$analytics, _plugin$analytics2;

    const {
      type
    } = plugin;

    if (this.plugins[type]) {
      var _this$plugins$type;

      (_this$plugins$type = this.plugins[type]) === null || _this$plugins$type === void 0 ? void 0 : _this$plugins$type.push(plugin);
    } else {
      this.plugins[type] = [plugin];
    }

    const settings = (_plugin$analytics = plugin.analytics) === null || _plugin$analytics === void 0 ? void 0 : _plugin$analytics.settings.get();
    let hasInitialSettings = false;

    if (settings !== undefined) {
      plugin.update({
        integrations: settings
      }, _types.UpdateType.initial);
      hasInitialSettings = true;
    }

    (_plugin$analytics2 = plugin.analytics) === null || _plugin$analytics2 === void 0 ? void 0 : _plugin$analytics2.settings.onChange(newSettings => {
      if (newSettings !== undefined) {
        plugin.update({
          integrations: newSettings
        }, hasInitialSettings ? _types.UpdateType.refresh : _types.UpdateType.initial);
        hasInitialSettings = true;
      }
    });
  }

  remove(plugin) {
    const plugins = this.plugins[plugin.type];

    if (plugins) {
      const index = plugins.findIndex(f => f === plugin);

      if (index > -1) {
        plugins.splice(index, 1);
      }
    }
  }

  apply(closure) {
    (0, _util.getAllPlugins)(this).forEach(plugin => closure(plugin));
  }

  process(incomingEvent) {
    // apply .before and .enrichment types first ...
    const beforeResult = this.applyPlugins({
      type: _types.PluginType.before,
      event: incomingEvent
    });

    if (beforeResult === undefined) {
      return;
    } // .enrichment here is akin to source middleware in the old analytics-ios.


    const enrichmentResult = this.applyPlugins({
      type: _types.PluginType.enrichment,
      event: beforeResult
    }); // once the event enters a destination, we don't want
    // to know about changes that happen there. those changes
    // are to only be received by the destination.

    this.applyPlugins({
      type: _types.PluginType.destination,
      event: enrichmentResult
    }); // apply .after plugins ...

    let afterResult = this.applyPlugins({
      type: _types.PluginType.after,
      event: enrichmentResult
    });
    return afterResult;
  }

  applyPlugins(_ref) {
    let {
      type,
      event
    } = _ref;
    let result = event;
    const plugins = this.plugins[type];

    if (plugins) {
      plugins.forEach(plugin => {
        if (result) {
          result = plugin.execute(result);
        }
      });
    }

    return result;
  }

}

exports.Timeline = Timeline;
//# sourceMappingURL=timeline.js.map