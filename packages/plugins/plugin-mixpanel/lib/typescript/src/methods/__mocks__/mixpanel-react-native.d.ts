/// <reference types="jest" />
export declare const initMock: jest.Mock<any, any>;
export declare const setServerMock: jest.Mock<any, any>;
export declare const identifyMock: jest.Mock<any, any>;
export declare const aliasMock: jest.Mock<any, any>;
export declare const trackMock: jest.Mock<any, any>;
export declare const trackWithGroupsMock: jest.Mock<any, any>;
export declare const setGroupMock: jest.Mock<any, any>;
export declare class Mixpanel {
    token: string;
    constructor(token: string);
    init: jest.Mock<any, any>;
    setServerURL: jest.Mock<any, any>;
    setLoggingEnabled: jest.Mock<any, any>;
    setUseIpAddressForGeolocation: jest.Mock<any, any>;
    hasOptedOutTracking: jest.Mock<any, any>;
    optInTracking: jest.Mock<any, any>;
    optOutTracking: jest.Mock<any, any>;
    identify: jest.Mock<any, any>;
    alias: jest.Mock<any, any>;
    track: jest.Mock<any, any>;
    getPeople: () => People;
    trackWithGroups: jest.Mock<any, any>;
    setGroup: jest.Mock<any, any>;
    getGroup: () => MixpanelGroup;
    addGroup: jest.Mock<any, any>;
    removeGroup: jest.Mock<any, any>;
    deleteGroup: jest.Mock<any, any>;
    registerSuperProperties: jest.Mock<any, any>;
    registerSuperPropertiesOnce: jest.Mock<any, any>;
    unregisterSuperProperty: jest.Mock<any, any>;
    getSuperProperties: jest.Mock<any, any>;
    clearSuperProperties: jest.Mock<any, any>;
    timeEvent: jest.Mock<any, any>;
    eventElapsedTime: jest.Mock<any, any>;
    reset: jest.Mock<any, any>;
    getDistinctId: jest.Mock<Promise<string>, []>;
    flush: jest.Mock<any, any>;
}
export declare class People {
    set: jest.Mock<any, any>;
    setOnce: jest.Mock<any, any>;
    increment: jest.Mock<any, any>;
    append: jest.Mock<any, any>;
    union: jest.Mock<any, any>;
    remove: jest.Mock<any, any>;
    unset: jest.Mock<any, any>;
    trackCharge: jest.Mock<any, any>;
    clearCharges: jest.Mock<any, any>;
    deleteUser: jest.Mock<any, any>;
}
export declare class MixpanelGroup {
    set: jest.Mock<any, any>;
    setOnce: jest.Mock<any, any>;
    unset: jest.Mock<any, any>;
    remove: jest.Mock<any, any>;
    union: jest.Mock<any, any>;
}
