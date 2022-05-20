import { DestinationPlugin, IdentifyEventType, PluginType, ScreenEventType, TrackEventType } from '@segment/analytics-react-native';
export declare class FirebasePlugin extends DestinationPlugin {
    type: PluginType;
    key: string;
    identify(event: IdentifyEventType): IdentifyEventType;
    track(event: TrackEventType): TrackEventType;
    screen(event: ScreenEventType): ScreenEventType;
    reset(): void;
}
