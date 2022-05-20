import { DestinationPlugin, PluginType, TrackEventType, ScreenEventType, SegmentAPISettings, UpdateType } from '@segment/analytics-react-native';
import type { SegmentClient } from '@segment/analytics-react-native/src/analytics';
export declare class FacebookAppEventsPlugin extends DestinationPlugin {
    type: PluginType;
    key: string;
    trackScreens: boolean;
    configure(analytics: SegmentClient): Promise<void>;
    update(settings: SegmentAPISettings, _: UpdateType): void;
    track(event: TrackEventType): TrackEventType;
    screen(event: ScreenEventType): ScreenEventType;
}
