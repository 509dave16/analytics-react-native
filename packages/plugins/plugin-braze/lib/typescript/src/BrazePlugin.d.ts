import { DestinationPlugin, IdentifyEventType, PluginType, TrackEventType } from '@segment/analytics-react-native';
export declare class BrazePlugin extends DestinationPlugin {
    type: PluginType;
    key: string;
    identify(event: IdentifyEventType): IdentifyEventType;
    track(event: TrackEventType): TrackEventType;
    flush(): void;
}
