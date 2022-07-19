/// <reference types="react" />
import type { Config, ClientMethods } from './types';
import { SegmentClient } from './analytics';
export declare const createClient: (config: Config) => SegmentClient;
export declare const AnalyticsProvider: ({ client, children, }: {
    client?: SegmentClient | undefined;
    children?: any;
}) => JSX.Element | null;
export declare const useAnalytics: () => ClientMethods;
