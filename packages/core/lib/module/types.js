/**
 * Makes all the properties in an object optional
 */
export let PluginType;

(function (PluginType) {
  PluginType["before"] = "before";
  PluginType["enrichment"] = "enrichment";
  PluginType["destination"] = "destination";
  PluginType["after"] = "after";
  PluginType["utility"] = "utility";
})(PluginType || (PluginType = {}));

export let UpdateType;

(function (UpdateType) {
  UpdateType["initial"] = "initial";
  UpdateType["refresh"] = "refresh";
})(UpdateType || (UpdateType = {}));

export let EventType;

(function (EventType) {
  EventType["TrackEvent"] = "track";
  EventType["IdentifyEvent"] = "identify";
  EventType["ScreenEvent"] = "screen";
  EventType["GroupEvent"] = "group";
  EventType["AliasEvent"] = "alias";
})(EventType || (EventType = {}));
//# sourceMappingURL=types.js.map