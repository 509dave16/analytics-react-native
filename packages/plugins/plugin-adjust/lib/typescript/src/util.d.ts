import type { SegmentAdjustSettings } from '../../../core/src/types';
export declare const mappedCustomEventToken: (eventName: string, settings: SegmentAdjustSettings) => string | null;
export declare const extract: <T>(key: string, properties: {
    [key: string]: any;
}, defaultValue?: T | null) => T | null;
