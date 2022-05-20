"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendEvents = void 0;

var _jsBase = require("js-base64");

var _constants = require("./constants");

const sendEvents = async _ref => {
  let {
    config,
    events
  } = _ref;
  await fetch(_constants.batchApi, {
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

exports.sendEvents = sendEvents;
//# sourceMappingURL=api.js.map