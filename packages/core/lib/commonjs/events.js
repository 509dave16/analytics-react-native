"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTrackEvent = exports.createScreenEvent = exports.createIdentifyEvent = exports.createGroupEvent = exports.createAliasEvent = exports.applyRawEventData = void 0;

var _uuid = require("./uuid");

var _types = require("./types");

const createTrackEvent = _ref => {
  let {
    event,
    properties = {}
  } = _ref;
  return {
    type: _types.EventType.TrackEvent,
    event,
    properties
  };
};

exports.createTrackEvent = createTrackEvent;

const createScreenEvent = _ref2 => {
  let {
    name,
    properties = {}
  } = _ref2;
  return {
    type: _types.EventType.ScreenEvent,
    name,
    properties
  };
};

exports.createScreenEvent = createScreenEvent;

const createIdentifyEvent = _ref3 => {
  let {
    userId,
    userTraits = {}
  } = _ref3;
  return {
    type: _types.EventType.IdentifyEvent,
    userId: userId,
    traits: userTraits
  };
};

exports.createIdentifyEvent = createIdentifyEvent;

const createGroupEvent = _ref4 => {
  let {
    groupId,
    groupTraits = {}
  } = _ref4;
  return {
    type: _types.EventType.GroupEvent,
    groupId,
    traits: groupTraits
  };
};

exports.createGroupEvent = createGroupEvent;

const createAliasEvent = _ref5 => {
  let {
    anonymousId,
    userId,
    newUserId
  } = _ref5;
  return {
    type: _types.EventType.AliasEvent,
    userId: newUserId,
    previousId: userId || anonymousId
  };
};

exports.createAliasEvent = createAliasEvent;

const isAliasEvent = event => event.type === _types.EventType.AliasEvent;

const isIdentifyEvent = event => event.type === _types.EventType.IdentifyEvent;

const applyRawEventData = (event, userInfo) => {
  var _event$integrations;

  return { ...event,
    anonymousId: userInfo.anonymousId,
    messageId: (0, _uuid.getUUID)(),
    timestamp: new Date().toISOString(),
    integrations: (_event$integrations = event.integrations) !== null && _event$integrations !== void 0 ? _event$integrations : {},
    userId: isAliasEvent(event) || isIdentifyEvent(event) ? event.userId : userInfo.userId
  };
};

exports.applyRawEventData = applyRawEventData;
//# sourceMappingURL=events.js.map