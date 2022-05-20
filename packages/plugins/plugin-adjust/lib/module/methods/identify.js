import { Adjust } from 'react-native-adjust';
export default (event => {
  const userId = event.userId;

  if (userId && userId.length > 0) {
    Adjust.addSessionPartnerParameter('user_id', userId);
  }

  const anonId = event.anonymousId;

  if (anonId && anonId.length > 0) {
    Adjust.addSessionPartnerParameter('anonymous_id', anonId);
  }
});
//# sourceMappingURL=identify.js.map