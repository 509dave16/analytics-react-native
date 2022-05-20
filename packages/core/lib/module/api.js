import { Base64 } from 'js-base64';
import { batchApi } from './constants';
export const sendEvents = async _ref => {
  let {
    config,
    events
  } = _ref;
  await fetch(batchApi, {
    method: 'POST',
    body: JSON.stringify({
      batch: events,
      sentAt: new Date().toISOString(),
      writeKey: config.writeKey
    }),
    headers: {
      'Authorization': `Basic ${Base64.encode(`${config.writeKey}:`)}`,
      'Content-Type': 'text/plain'
    }
  });
};
//# sourceMappingURL=api.js.map