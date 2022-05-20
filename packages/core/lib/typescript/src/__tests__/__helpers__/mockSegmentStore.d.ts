import type { DeepLinkData, Storage } from '../../storage';
import type { Context, DeepPartial, IntegrationSettings, SegmentAPIIntegrations, SegmentEvent, UserInfoState } from '../../types';
declare type Data = {
    isReady: boolean;
    events: SegmentEvent[];
    context?: DeepPartial<Context>;
    settings: SegmentAPIIntegrations;
    userInfo: UserInfoState;
    deepLinkData: DeepLinkData;
};
export declare class MockSegmentStore implements Storage {
    private data;
    private initialData;
    reset: () => void;
    constructor(initialData?: Partial<Data>);
    private callbacks;
    readonly isReady: {
        get: () => boolean;
        onChange: (_callback: (value: boolean) => void) => () => void;
    };
    readonly context: {
        get: () => {
            app?: DeepPartial<{
                build: string;
                name: string;
                namespace: string;
                version: string;
            }> | undefined;
            device?: DeepPartial<import("../../types").ContextDevice> | undefined;
            library?: DeepPartial<{
                name: string;
                version: string;
            }> | undefined;
            locale?: string | undefined;
            network?: DeepPartial<{
                cellular: boolean;
                wifi: boolean;
            }> | undefined;
            os?: DeepPartial<{
                name: string;
                version: string;
            }> | undefined;
            screen?: DeepPartial<{
                height: number;
                width: number;
                density?: number | undefined;
            }> | undefined;
            timezone?: string | undefined;
            traits?: DeepPartial<import("../../types").UserTraits> | undefined;
        };
        onChange: (callback: (value?: DeepPartial<Context> | undefined) => void) => () => void;
        set: (value: DeepPartial<Context>) => DeepPartial<Context>;
    };
    readonly settings: {
        get: () => SegmentAPIIntegrations;
        onChange: (callback: (value?: SegmentAPIIntegrations | undefined) => void) => () => void;
        set: (value: SegmentAPIIntegrations) => SegmentAPIIntegrations;
        add: (key: string, value: IntegrationSettings) => void;
    };
    readonly events: {
        get: () => SegmentEvent[];
        onChange: (callback: (value: SegmentEvent[]) => void) => () => void;
        add: (event: SegmentEvent | SegmentEvent[]) => void;
        remove: (event: SegmentEvent | SegmentEvent[]) => void;
    };
    readonly userInfo: {
        get: () => UserInfoState;
        onChange: (callback: (value: UserInfoState) => void) => () => void;
        set: (value: UserInfoState) => UserInfoState;
    };
    readonly deepLinkData: {
        get: () => DeepLinkData;
        set: (value: DeepLinkData) => void;
        onChange: (callback: (value: DeepLinkData) => void) => () => void;
    };
}
export {};
