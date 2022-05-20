import { DestinationPlugin, IdentifyEventType, PluginType, TrackEventType, UpdateType, SegmentAPISettings } from '@segment/analytics-react-native';
export declare class AppsflyerPlugin extends DestinationPlugin {
    type: PluginType;
    key: string;
    private settings;
    private hasRegisteredInstallCallback;
    private hasRegisteredDeepLinkCallback;
    private hasInitialized;
    update(settings: SegmentAPISettings, _: UpdateType): void;
    identify(event: IdentifyEventType): IdentifyEventType;
    track(event: TrackEventType): TrackEventType;
    registerConversionCallback: () => void;
    registerDeepLinkCallback: () => void;
}
