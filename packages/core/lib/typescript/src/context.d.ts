import type { Context, UserTraits } from './types';
interface GetContextConfig {
    collectDeviceId?: boolean;
}
export declare const getContext: (userTraits?: UserTraits, config?: GetContextConfig) => Promise<Context>;
export {};
