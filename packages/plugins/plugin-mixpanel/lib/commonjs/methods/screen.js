"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _track = _interopRequireDefault(require("./track"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (event, mixpanel, settings) => {
  var _event$properties;

  const callTrack = (eventName, properties) => {
    (0, _track.default)(eventName, properties, settings, mixpanel);
  };

  const properties = event.properties;

  if (settings.consolidatedPageCalls === true) {
    let eventName = 'Loaded a Screen';
    let name = event.name;

    if (name !== undefined) {
      properties[name] = name;
    }

    callTrack(eventName, properties);
  } else if (settings.trackAllPages === true) {
    let eventName = `Viewed ${event.name} Screen`;
    callTrack(eventName, properties);
  } else if (settings.trackNamedPages === true && event.name !== undefined) {
    let eventName = `Viewed ${event.name} Screen`;
    callTrack(eventName, properties);
  } else if (settings.trackCategorizedPages === true && ((_event$properties = event.properties) === null || _event$properties === void 0 ? void 0 : _event$properties.category) !== undefined) {
    let category = event.properties.category;
    let eventName = `Viewed ${category} Screen`;
    callTrack(eventName, properties);
  }
};

exports.default = _default;
//# sourceMappingURL=screen.js.map