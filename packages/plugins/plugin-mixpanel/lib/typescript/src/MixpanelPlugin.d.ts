import { DestinationPlugin, PluginType, TrackEventType, ScreenEventType, SegmentAPISettings, UpdateType, IdentifyEventType, GroupEventType, AliasEventType } from '@segment/analytics-react-native';
export declare const EU_SERVER = "api.eu.mixpanel.com";
export declare class MixpanelPlugin extends DestinationPlugin {
    type: PluginType;
    key: string;
    trackScreens: boolean;
    private mixpanel;
    private settings;
    private isInitialized;
    update(settings: SegmentAPISettings, _: UpdateType): void;
    identify(event: IdentifyEventType): IdentifyEventType;
    track(event: TrackEventType): TrackEventType;
    screen(event: ScreenEventType): ScreenEventType;
    group(event: GroupEventType): GroupEventType;
    alias(event: AliasEventType): AliasEventType;
    flush(): void;
    reset(): void;
}
