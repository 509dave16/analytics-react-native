import type { Config, SegmentEvent } from './types';
export declare const uploadEvents: ({ config, events, }: {
    config: Config;
    events: SegmentEvent[];
}) => Promise<void>;
