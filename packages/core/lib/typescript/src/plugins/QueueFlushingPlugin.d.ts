import type { SegmentClient } from '../analytics';
import { UtilityPlugin } from '../plugin';
import { PluginType, type SegmentEvent } from '../types';
/**
 * This plugin manages a queue where all events get added to after timeline processing.
 * It takes a onFlush callback to trigger any action particular to your destination sending events.
 * It can autotrigger a flush of the queue when it reaches the config flushAt limit.
 */
export declare class QueueFlushingPlugin extends UtilityPlugin {
    type: PluginType;
    private isPendingUpload;
    private queueStore;
    private unsubscribe;
    private onFlush;
    /**
     * @param onFlush callback to execute when the queue is flushed (either by reaching the limit or manually) e.g. code to upload events to your destination
     */
    constructor(onFlush: (events: SegmentEvent[]) => Promise<void>);
    configure(analytics: SegmentClient): void;
    execute(event: SegmentEvent): SegmentEvent | undefined;
    /**
     * Calls the onFlush callback with the events in the queue
     */
    flush(): Promise<void>;
    /**
     * Removes one or multiple events from the queue
     * @param events events to remove
     */
    dequeue(events: SegmentEvent | SegmentEvent[]): Promise<{
        events: SegmentEvent[];
    }> | undefined;
}
