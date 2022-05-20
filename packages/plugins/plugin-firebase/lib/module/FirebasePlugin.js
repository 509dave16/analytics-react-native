function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { DestinationPlugin, PluginType } from '@segment/analytics-react-native';
import identify from './methods/identify';
import screen from './methods/screen';
import track from './methods/track';
import reset from './methods/reset';
export class FirebasePlugin extends DestinationPlugin {
  constructor() {
    super(...arguments);

    _defineProperty(this, "type", PluginType.destination);

    _defineProperty(this, "key", 'Firebase');
  }

  identify(event) {
    identify(event);
    return event;
  }

  track(event) {
    track(event);
    return event;
  }

  screen(event) {
    screen(event);
    return event;
  }

  reset() {
    reset();
  }

}
//# sourceMappingURL=FirebasePlugin.js.map