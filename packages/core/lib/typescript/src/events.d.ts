import { GroupEventType, GroupTraits, IdentifyEventType, JsonMap, ScreenEventType, TrackEventType, UserTraits, AliasEventType, EventType, SegmentEvent, UserInfoState } from './types';
export declare const createTrackEvent: ({ event, properties, }: {
    event: string;
    properties?: JsonMap | undefined;
}) => TrackEventType;
export declare const createScreenEvent: ({ name, properties, }: {
    name: string;
    properties?: JsonMap | undefined;
}) => ScreenEventType;
export declare const createIdentifyEvent: ({ userId, userTraits, }: {
    userId?: string | undefined;
    userTraits?: UserTraits | undefined;
}) => IdentifyEventType;
export declare const createGroupEvent: ({ groupId, groupTraits, }: {
    groupId: string;
    groupTraits?: GroupTraits | undefined;
}) => GroupEventType;
export declare const createAliasEvent: ({ anonymousId, userId, newUserId, }: {
    anonymousId: string;
    userId?: string | undefined;
    newUserId: string;
}) => AliasEventType;
export declare const applyRawEventData: (event: SegmentEvent, userInfo: UserInfoState) => {
    anonymousId: string;
    messageId: string;
    timestamp: string;
    integrations: import("./types").SegmentAPIIntegrations;
    userId: string | undefined;
    type: EventType.TrackEvent;
    event: string;
    properties?: JsonMap | undefined;
    context?: import("./types").DeepPartial<import("./types").Context> | undefined;
    _metadata?: import("./types").DestinationMetadata | undefined;
} | {
    anonymousId: string;
    messageId: string;
    timestamp: string;
    integrations: import("./types").SegmentAPIIntegrations;
    userId: string | undefined;
    type: EventType.ScreenEvent;
    name: string;
    properties: JsonMap;
    context?: import("./types").DeepPartial<import("./types").Context> | undefined;
    _metadata?: import("./types").DestinationMetadata | undefined;
} | {
    anonymousId: string;
    messageId: string;
    timestamp: string;
    integrations: import("./types").SegmentAPIIntegrations;
    userId: string | undefined;
    type: EventType.IdentifyEvent;
    traits: UserTraits;
    context?: import("./types").DeepPartial<import("./types").Context> | undefined;
    _metadata?: import("./types").DestinationMetadata | undefined;
} | {
    anonymousId: string;
    messageId: string;
    timestamp: string;
    integrations: import("./types").SegmentAPIIntegrations;
    userId: string | undefined;
    type: EventType.GroupEvent;
    groupId: string;
    traits: GroupTraits;
    context?: import("./types").DeepPartial<import("./types").Context> | undefined;
    _metadata?: import("./types").DestinationMetadata | undefined;
} | {
    anonymousId: string;
    messageId: string;
    timestamp: string;
    integrations: import("./types").SegmentAPIIntegrations;
    userId: string | undefined;
    type: EventType.AliasEvent;
    previousId: string;
    context?: import("./types").DeepPartial<import("./types").Context> | undefined;
    _metadata?: import("./types").DestinationMetadata | undefined;
};
