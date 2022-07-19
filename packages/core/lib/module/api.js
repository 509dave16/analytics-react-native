import { Base64 } from 'js-base64';
import { batchApi } from './constants';
export const uploadEvents = async _ref => {
  let {
    config,
    events
  } = _ref;
  const requestUrl = config.proxy || batchApi;
  await fetch(requestUrl, {
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