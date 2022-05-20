import appsFlyer from 'react-native-appsflyer';
export default (event => {
  const userId = event.userId;

  if (userId && userId.length > 0) {
    appsFlyer.setCustomerUserId(userId);
  }

  const traits = event.traits;

  if (traits) {
    const aFTraits = {};

    if (traits.email) {
      aFTraits.email = traits.email;
    }

    if (traits.firstName) {
      aFTraits.firstName = traits.firstName;
    }

    if (traits.lastName) {
      aFTraits.lastName = traits.lastName;
    }

    if (traits.currencyCode) {
      appsFlyer.setCurrencyCode(String(traits.currencyCode));
    }

    appsFlyer.setAdditionalData(aFTraits);
  }
});
//# sourceMappingURL=identify.js.map