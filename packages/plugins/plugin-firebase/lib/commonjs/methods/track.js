"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _analytics = _interopRequireDefault(require("@react-native-firebase/analytics"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const mapEventNames = {
  'Product Clicked': 'select_content',
  'Product Viewed': 'view_item',
  'Product Added': 'add_to_cart',
  'Product Removed': 'remove_from_cart',
  'Checkout Started': 'begin_checkout',
  'Promotion Viewed': 'present_offer',
  'Payment Info Entered': 'add_payment_info',
  'Order Completed': 'ecommerce_purchase',
  'Order Refunded': 'purchase_refund',
  'Product List Viewed': 'view_item_list',
  'Product Added to Wishlist': 'add_to_wishlist',
  'Product Shared': 'share',
  'Cart Shared': 'share',
  'Products Searched': 'search'
};

var _default = async event => {
  const safeEventName = mapEventNames[event.event] || event.event.replace(/[^a-zA-Z0-9]/g, '_');
  await (0, _analytics.default)().logEvent(safeEventName, event.properties);
};

exports.default = _default;
//# sourceMappingURL=track.js.map