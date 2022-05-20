"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AmplitudeSessionPlugin = void 0;

var _analyticsReactNative = require("@segment/analytics-react-native");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class AmplitudeSessionPlugin extends _analyticsReactNative.EventPlugin {
  constructor() {
    super(...arguments);

    _defineProperty(this, "type", _analyticsReactNative.PluginType.enrichment);

    _defineProperty(this, "key", 'Actions Amplitude');

    _defineProperty(this, "active", false);

    _defineProperty(this, "sessionId", Date.now());

    _defineProperty(this, "sessionTimer", false);

    _defineProperty(this, "insertSession", event => {
      const returnEvent = event;
      const integrations = event.integrations;
      returnEvent.integrations = { ...integrations,
        [this.key]: {
          session_id: this.sessionId
        }
      };
      return returnEvent;
    });

    _defineProperty(this, "resetTimer", () => {
      this.sessionTimer = false;
      this.sessionId = -1;
    });

    _defineProperty(this, "startSession", () => {
      const maxSessionTime = 300000;
      setTimeout(() => this.resetTimer(), maxSessionTime);
      this.sessionId = Date.now();
      this.sessionTimer = true;
    });

    _defineProperty(this, "handleTimer", () => {
      if (!this.sessionTimer) {
        this.startSession();
      }

      return;
    });
  }

  update(settings, _) {
    let integrations = settings.integrations;

    if (this.key in integrations) {
      this.active = true;
      this.startSession();
    }
  }

  execute(event) {
    if (!this.active) {
      return event;
    }

    this.handleTimer();
    let result = event;

    switch (result.type) {
      case _analyticsReactNative.EventType.IdentifyEvent:
        result = this.identify(result);
        break;

      case _analyticsReactNative.EventType.TrackEvent:
        result = this.track(result);
        break;

      case _analyticsReactNative.EventType.ScreenEvent:
        result = this.screen(result);
        break;

      case _analyticsReactNative.EventType.AliasEvent:
        result = this.alias(result);
        break;

      case _analyticsReactNative.EventType.GroupEvent:
        result = this.group(result);
        break;
    }

    return result;
  }

  identify(event) {
    return this.insertSession(event);
  }

  track(event) {
    return this.insertSession(event);
  }

  screen(event) {
    return this.insertSession(event);
  }

  group(event) {
    return this.insertSession(event);
  }

  alias(event) {
    return this.insertSession(event);
  }

}

exports.AmplitudeSessionPlugin = AmplitudeSessionPlugin;
//# sourceMappingURL=AmplitudeSessionPlugin.js.map