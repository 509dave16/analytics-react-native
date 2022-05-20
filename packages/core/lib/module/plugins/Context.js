function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { PlatformPlugin } from '../plugin';
import { PluginType } from '../types';
export class InjectContext extends PlatformPlugin {
  constructor() {
    super(...arguments);

    _defineProperty(this, "type", PluginType.before);
  }

  execute(event) {
    return { ...event,
      context: { ...event.context,
        ...this.analytics.context.get()
      }
    };
  }

}
//# sourceMappingURL=Context.js.map