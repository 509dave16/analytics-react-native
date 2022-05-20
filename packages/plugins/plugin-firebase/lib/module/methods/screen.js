import firebaseAnalytics from '@react-native-firebase/analytics';
export default (async event => {
  await firebaseAnalytics().logScreenView({
    screen_name: event.name,
    screen_class: event.name
  });
});
//# sourceMappingURL=screen.js.map