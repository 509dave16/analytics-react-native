import type { Config, SegmentEvent } from './types';
export declare const sendEvents: ({ config, events, }: {
    config: Config;
    events: SegmentEvent[];
}) => Promise<void>;
