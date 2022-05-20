import firebaseAnalytics from '@react-native-firebase/analytics';
export default (async event => {
  await firebaseAnalytics().setUserId(event.userId);

  if (event.traits) {
    await firebaseAnalytics().setUserProperties(event.traits);
  }
});
//# sourceMappingURL=identify.js.map