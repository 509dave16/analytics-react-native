"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateType = exports.PluginType = exports.EventType = void 0;

/**
 * Makes all the properties in an object optional
 */
let PluginType;
exports.PluginType = PluginType;

(function (PluginType) {
  PluginType["before"] = "before";
  PluginType["enrichment"] = "enrichment";
  PluginType["destination"] = "destination";
  PluginType["after"] = "after";
  PluginType["utility"] = "utility";
})(PluginType || (exports.PluginType = PluginType = {}));

let UpdateType;
exports.UpdateType = UpdateType;

(function (UpdateType) {
  UpdateType["initial"] = "initial";
  UpdateType["refresh"] = "refresh";
})(UpdateType || (exports.UpdateType = UpdateType = {}));

let EventType;
exports.EventType = EventType;

(function (EventType) {
  EventType["TrackEvent"] = "track";
  EventType["IdentifyEvent"] = "identify";
  EventType["ScreenEvent"] = "screen";
  EventType["GroupEvent"] = "group";
  EventType["AliasEvent"] = "alias";
})(EventType || (exports.EventType = EventType = {}));
//# sourceMappingURL=types.js.map