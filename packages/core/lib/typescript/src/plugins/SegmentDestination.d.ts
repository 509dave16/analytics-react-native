import { DestinationPlugin } from '../plugin';
import { PluginType, SegmentEvent } from '../types';
import type { SegmentClient } from '../analytics';
export declare const SEGMENT_DESTINATION_KEY = "Segment.io";
export declare class SegmentDestination extends DestinationPlugin {
    type: PluginType;
    key: string;
    private sendEvents;
    private readonly queuePlugin;
    configure(analytics: SegmentClient): void;
    execute(event: SegmentEvent): SegmentEvent | undefined;
    flush(): Promise<void>;
}
