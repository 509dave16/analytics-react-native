import { Adjust, AdjustEvent } from 'react-native-adjust';
import { extract, mappedCustomEventToken } from '../util';
export default ((event, settings) => {
  const anonId = event.anonymousId;

  if (anonId && anonId.length > 0) {
    Adjust.addSessionPartnerParameter('anonymous_id', anonId);
  }

  const token = mappedCustomEventToken(event.event, settings);

  if (token) {
    const adjEvent = new AdjustEvent(token);
    const properties = event.properties;

    if (properties) {
      Object.entries(properties).forEach(_ref => {
        let [key, value] = _ref;
        adjEvent.addCallbackParameter(key, value);
      });
      const revenue = extract('revenue', properties);
      const currency = extract('currency', properties, 'USD');
      const orderId = extract('orderId', properties);

      if (revenue && currency) {
        adjEvent.setRevenue(revenue, currency);
      }

      if (orderId) {
        adjEvent.setTransactionId(orderId);
      }
    }

    Adjust.trackEvent(adjEvent);
  }
});
//# sourceMappingURL=track.js.map