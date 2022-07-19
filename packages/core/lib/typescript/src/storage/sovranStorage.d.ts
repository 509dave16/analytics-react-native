import type { SegmentAPIIntegrations, IntegrationSettings, DeepPartial, Context, UserInfoState } from '..';
import type { Storage, StorageConfig, DeepLinkData } from './types';
export declare class SovranStorage implements Storage {
    private storeId;
    private storePersistor?;
    private readinessStore;
    private contextStore;
    private settingsStore;
    private userInfoStore;
    private deepLinkStore;
    constructor(config: StorageConfig);
    /**
     * This is a fix for users that have started the app with the anonymousId set to 'anonymousId' bug
     */
    private fixAnonymousId;
    readonly isReady: {
        get: () => boolean;
        onChange: (callback: (value: boolean) => void) => import("@segment/sovran-react-native").Unsubscribe;
    };
    readonly context: {
        get: () => DeepPartial<Context>;
        onChange: (callback: (value?: DeepPartial<Context> | undefined) => void) => import("@segment/sovran-react-native").Unsubscribe;
        set: (value: DeepPartial<Context>) => Promise<DeepPartial<Context>>;
    };
    readonly settings: {
        get: () => SegmentAPIIntegrations;
        onChange: (callback: (value?: SegmentAPIIntegrations | undefined) => void) => import("@segment/sovran-react-native").Unsubscribe;
        set: (value: SegmentAPIIntegrations) => Promise<SegmentAPIIntegrations>;
        add: (key: string, value: IntegrationSettings) => void;
    };
    readonly userInfo: {
        get: () => UserInfoState;
        onChange: (callback: (value: UserInfoState) => void) => import("@segment/sovran-react-native").Unsubscribe;
        set: (value: UserInfoState) => Promise<UserInfoState>;
    };
    readonly deepLinkData: {
        get: () => DeepLinkData;
        onChange: (callback: (value: DeepLinkData) => void) => import("@segment/sovran-react-native").Unsubscribe;
    };
}
