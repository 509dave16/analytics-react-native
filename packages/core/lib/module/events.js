import { getUUID } from './uuid';
import { EventType } from './types';
export const createTrackEvent = _ref => {
  let {
    event,
    properties = {}
  } = _ref;
  return {
    type: EventType.TrackEvent,
    event,
    properties
  };
};
export const createScreenEvent = _ref2 => {
  let {
    name,
    properties = {}
  } = _ref2;
  return {
    type: EventType.ScreenEvent,
    name,
    properties
  };
};
export const createIdentifyEvent = _ref3 => {
  let {
    userId,
    userTraits = {}
  } = _ref3;
  return {
    type: EventType.IdentifyEvent,
    userId: userId,
    traits: userTraits
  };
};
export const createGroupEvent = _ref4 => {
  let {
    groupId,
    groupTraits = {}
  } = _ref4;
  return {
    type: EventType.GroupEvent,
    groupId,
    traits: groupTraits
  };
};
export const createAliasEvent = _ref5 => {
  let {
    anonymousId,
    userId,
    newUserId
  } = _ref5;
  return {
    type: EventType.AliasEvent,
    userId: newUserId,
    previousId: userId || anonymousId
  };
};

const isAliasEvent = event => event.type === EventType.AliasEvent;

const isIdentifyEvent = event => event.type === EventType.IdentifyEvent;

export const applyRawEventData = (event, userInfo) => {
  var _event$integrations;

  return { ...event,
    anonymousId: userInfo.anonymousId,
    messageId: getUUID(),
    timestamp: new Date().toISOString(),
    integrations: (_event$integrations = event.integrations) !== null && _event$integrations !== void 0 ? _event$integrations : {},
    userId: isAliasEvent(event) || isIdentifyEvent(event) ? event.userId : userInfo.userId
  };
};
//# sourceMappingURL=events.js.map