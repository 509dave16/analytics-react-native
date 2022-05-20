function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { EventPlugin, EventType, PluginType } from '@segment/analytics-react-native';
export class AmplitudeSessionPlugin extends EventPlugin {
  constructor() {
    super(...arguments);

    _defineProperty(this, "type", PluginType.enrichment);

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
//# sourceMappingURL=AmplitudeSessionPlugin.js.map