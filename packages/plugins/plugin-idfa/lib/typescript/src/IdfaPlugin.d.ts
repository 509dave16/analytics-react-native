import { Plugin, PluginType } from '@segment/analytics-react-native';
import type { SegmentClient } from '../../../core/src/analytics';
export declare class IdfaPlugin extends Plugin {
    type: PluginType;
    configure(analytics: SegmentClient): void;
    getTrackingStatus(): void;
}
