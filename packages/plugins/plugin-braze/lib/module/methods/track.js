import ReactAppboy from 'react-native-appboy-sdk';
export default (payload => {
  if (payload.event === 'Install Attributed') {
    var _payload$properties;

    if ((_payload$properties = payload.properties) !== null && _payload$properties !== void 0 && _payload$properties.campaign) {
      const attributionData = payload.properties.campaign;
      const network = attributionData.source;
      const campaign = attributionData.name;
      const adGroup = attributionData.ad_group;
      const creative = attributionData.ad_creative;
      ReactAppboy.setAttributionData(network, campaign, adGroup, creative);
    }
  }

  const revenue = extractRevenue(payload.properties, 'revenue');

  if (revenue || payload.event === 'Order Completed') {
    var _payload$properties2;

    // Make USD as the default currency.
    let currency = 'USD';

    if (typeof ((_payload$properties2 = payload.properties) === null || _payload$properties2 === void 0 ? void 0 : _payload$properties2.currency) === 'string' && payload.properties.currency.length === 3) {
      currency = payload.properties.currency;
    }

    if (payload.properties) {
      const appBoyProperties = Object.assign({}, payload.properties);
      delete appBoyProperties.currency;
      delete appBoyProperties.revenue;

      if (appBoyProperties.products) {
        const products = appBoyProperties.products.slice(0);
        delete appBoyProperties.products;
        products.forEach(product => {
          const productDict = Object.assign({}, product);
          const productId = productDict.productId;
          const productRevenue = extractRevenue(productDict, 'price');
          const productQuantity = productDict.quantity;
          delete productDict.productId;
          delete productDict.price;
          delete productDict.quantity;
          let productProperties = Object.assign({}, appBoyProperties, productDict);
          ReactAppboy.logPurchase(productId, String(productRevenue), currency, productQuantity, productProperties);
        });
      } else {
        ReactAppboy.logPurchase(payload.event, String(revenue), currency, 1, appBoyProperties);
      }
    } else {
      ReactAppboy.logPurchase(payload.event, String(revenue), currency, 1);
    }
  } else {
    ReactAppboy.logCustomEvent(payload.event, payload.properties);
  }

  return payload;
});

const extractRevenue = (properties, key) => {
  if (!properties) {
    return 0;
  }

  const revenue = properties[key];

  if (revenue) {
    switch (typeof revenue) {
      case 'string':
        return parseFloat(revenue);

      case 'number':
        return revenue;

      default:
        return 0;
    }
  } else {
    return 0;
  }
};
//# sourceMappingURL=track.js.map