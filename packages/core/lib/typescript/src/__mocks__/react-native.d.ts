/// <reference types="jest" />
import type { PlatformOSType } from 'react-native';
export declare const AppState: {
    addEventListener: jest.Mock<any, any>;
    removeEventListener: jest.Mock<any, any>;
};
export declare const Linking: {
    getInitialURL: jest.Mock<any, any>;
    addEventListener: jest.Mock<any, any>;
};
export declare const NativeModules: {
    AnalyticsReactNative: {
        getContextInfo: jest.Mock<any, any>;
    };
    Sovran: {
        getConstants: () => {
            ON_STORE_ACTION: string;
        };
    };
};
export declare const Platform: {
    select: <T>(specifics: {
        ios?: T | undefined;
        android?: T | undefined;
        macos?: T | undefined;
        windows?: T | undefined;
        web?: T | undefined;
        native?: T | undefined;
    } & {
        default: T;
    }) => T;
};
export declare class NativeEventEmitter {
    constructor();
    addListener: () => jest.Mock<any, any>;
    removeListener: () => jest.Mock<any, any>;
    removeAllListeners: () => jest.Mock<any, any>;
}
