"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadEvents = void 0;

var _jsBase = require("js-base64");

var _constants = require("./constants");

const uploadEvents = async _ref => {
  let {
    config,
    events
  } = _ref;
  const requestUrl = config.proxy || _constants.batchApi;
  await fetch(requestUrl, {
    method: 'POST',
    body: JSON.stringify({
      batch: events,
      sentAt: new Date().toISOString(),
      writeKey: config.writeKey
    }),
    headers: {
      'Authorization': `Basic ${_jsBase.Base64.encode(`${config.writeKey}:`)}`,
      'Content-Type': 'text/plain'
    }
  });
};

exports.uploadEvents = uploadEvents;
//# sourceMappingURL=api.js.map