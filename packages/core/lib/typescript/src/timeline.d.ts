import { PluginType, SegmentEvent } from './types';
import type { Plugin } from './plugin';
declare type TimelinePlugins = {
    [key in PluginType]?: Plugin[];
};
export declare class Timeline {
    plugins: TimelinePlugins;
    add(plugin: Plugin): void;
    remove(plugin: Plugin): void;
    apply(closure: (plugin: Plugin) => void): void;
    process(incomingEvent: SegmentEvent): SegmentEvent | undefined;
    applyPlugins({ type, event }: {
        type: PluginType;
        event: SegmentEvent;
    }): SegmentEvent;
}
export {};
