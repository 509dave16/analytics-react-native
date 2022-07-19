import type { Persistor } from '@segment/sovran-react-native';
export declare type JsonValue = boolean | number | string | null | JsonList | JsonMap | undefined;
export interface JsonMap {
    [key: string]: JsonValue;
    [index: number]: JsonValue;
}
export interface JsonList extends Array<JsonValue> {
}
export declare type SegmentEvent = TrackEventType | ScreenEventType | IdentifyEventType | GroupEventType | AliasEventType;
interface BaseEventType {
    anonymousId?: string;
    messageId?: string;
    userId?: string;
    timestamp?: string;
    context?: PartialContext;
    integrations?: SegmentAPIIntegrations;
    _metadata?: DestinationMetadata;
}
export interface TrackEventType extends BaseEventType {
    type: EventType.TrackEvent;
    event: string;
    properties?: JsonMap;
}
export interface ScreenEventType extends BaseEventType {
    type: EventType.ScreenEvent;
    name: string;
    properties: JsonMap;
}
export interface IdentifyEventType extends BaseEventType {
    type: EventType.IdentifyEvent;
    traits?: UserTraits;
}
export interface GroupEventType extends BaseEventType {
    type: EventType.GroupEvent;
    groupId: string;
    traits?: GroupTraits;
}
export interface AliasEventType extends BaseEventType {
    type: EventType.AliasEvent;
    userId?: string;
    previousId: string;
}
export declare type UserTraits = JsonMap & {
    address?: {
        city?: string;
        country?: string;
        postalCode?: string;
        state?: string;
        street?: string;
    };
    age?: number;
    avatar?: string;
    birthday?: string;
    company?: {
        name?: string;
        id?: string | number;
        industry?: string;
        employee_count?: number;
        plan?: string;
    };
    createdAt?: string;
    description?: string;
    email?: string;
    firstName?: string;
    gender?: string;
    id?: string;
    lastName?: string;
    name?: string;
    phone?: string;
    title?: string;
    username?: string;
    website?: string;
};
export declare type GroupTraits = JsonMap & {
    address?: {
        city?: string;
        country?: string;
        postalCode?: string;
        state?: string;
        street?: string;
    };
    avatar?: string;
    createdAt?: string;
    description?: string;
    email?: string;
    employees?: string;
    id?: string;
    industry?: string;
    name?: string;
    phone?: string;
    website?: string;
    plan?: string;
};
export declare type Config = {
    writeKey: string;
    debug?: boolean;
    flushAt?: number;
    flushInterval?: number;
    trackAppLifecycleEvents?: boolean;
    maxBatchSize?: number;
    trackDeepLinks?: boolean;
    defaultSettings?: SegmentAPISettings;
    autoAddSegmentDestination?: boolean;
    collectDeviceId?: boolean;
    storePersistor?: Persistor;
    proxy?: string;
};
export declare type ClientMethods = {
    screen: (name: string, properties?: JsonMap) => void;
    track: (event: string, properties?: JsonMap) => void;
    identify: (userId?: string, userTraits?: UserTraits) => void;
    flush: () => Promise<void>;
    group: (groupId: string, groupTraits?: GroupTraits) => void;
    alias: (newUserId: string) => void;
    reset: (resetAnonymousId?: boolean) => void;
};
declare type ContextApp = {
    build: string;
    name: string;
    namespace: string;
    version: string;
};
export declare type ContextDevice = {
    id?: string;
    manufacturer: string;
    model: string;
    name: string;
    type: string;
    adTrackingEnabled?: boolean;
    advertisingId?: string;
    trackingStatus?: string;
    token?: string;
};
declare type ContextLibrary = {
    name: string;
    version: string;
};
declare type ContextNetwork = {
    cellular: boolean;
    wifi: boolean;
};
declare type ContextOS = {
    name: string;
    version: string;
};
declare type ContextScreen = {
    height: number;
    width: number;
    density?: number;
};
export declare type Context = {
    app: ContextApp;
    device: ContextDevice;
    library: ContextLibrary;
    locale: string;
    network: ContextNetwork;
    os: ContextOS;
    screen: ContextScreen;
    timezone: string;
    traits: UserTraits;
};
/**
 * Makes all the properties in an object optional
 */
export declare type DeepPartial<T> = {
    [Property in keyof T]?: Property extends {} ? DeepPartial<T[Property]> : T[Property];
};
export declare type PartialContext = DeepPartial<Context>;
export declare type NativeContextInfo = {
    appName: string;
    appVersion: string;
    buildNumber: string;
    bundleId: string;
    locale: string;
    networkType: string;
    osName: string;
    osVersion: string;
    screenHeight: number;
    screenWidth: number;
    screenDensity?: number;
    timezone: string;
    manufacturer: string;
    model: string;
    deviceName: string;
    deviceId?: string;
    deviceType: string;
    adTrackingEnabled?: boolean;
    advertisingId?: string;
};
export declare type SegmentAPIIntegration = {
    apiKey: string;
    apiHost: string;
};
declare type SegmentAmplitudeIntegration = {
    session_id: number;
};
export declare type SegmentAdjustSettings = {
    appToken: string;
    setEnvironmentProduction?: boolean;
    setEventBufferingEnabled?: boolean;
    trackAttributionData?: boolean;
    setDelay?: boolean;
    customEvents?: {
        [key: string]: string;
    };
    delayTime?: number;
};
export declare type IntegrationSettings = SegmentAPIIntegration | SegmentAmplitudeIntegration | SegmentAdjustSettings | Record<string, any> | boolean;
export declare type SegmentAPIIntegrations = {
    [key: string]: IntegrationSettings;
};
export declare type SegmentAPISettings = {
    integrations: SegmentAPIIntegrations;
};
export declare type DestinationMetadata = {
    bundled: string[];
    unbundled: string[];
    bundledIds: string[];
};
export declare enum PluginType {
    'before' = "before",
    'enrichment' = "enrichment",
    'destination' = "destination",
    'after' = "after",
    'utility' = "utility"
}
export declare enum UpdateType {
    'initial' = "initial",
    'refresh' = "refresh"
}
export declare enum EventType {
    'TrackEvent' = "track",
    'IdentifyEvent' = "identify",
    'ScreenEvent' = "screen",
    'GroupEvent' = "group",
    'AliasEvent' = "alias"
}
export declare type UserInfoState = {
    anonymousId: string;
    userId?: string;
    traits?: UserTraits | GroupTraits;
};
export {};
