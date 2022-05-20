import type { Logger } from './logger';
import type { DestinationPlugin, PlatformPlugin, Plugin } from './plugin';
import type { DeepLinkData, Settable, Watchable } from './storage';
import { Config, Context, DeepPartial, GroupTraits, JsonMap, PluginType, SegmentAPIIntegrations, SegmentAPISettings, SegmentEvent, UpdateType, UserInfoState, UserTraits } from './types';
declare type OnContextLoadCallback = (type: UpdateType) => void | Promise<void>;
export declare class SegmentClient {
    private config;
    private store;
    private appState;
    private appStateSubscription;
    logger: Logger;
    private flushInterval;
    private watchers;
    private destroyed;
    private isPendingUpload;
    private isAddingPlugins;
    private timeline;
    private pendingEvents;
    private pluginsToAdd;
    private isInitialized;
    private isContextLoaded;
    private onContextLoadedCallback;
    get platformPlugins(): PlatformPlugin[];
    /**
     * Access or subscribe to client context
     */
    readonly context: Watchable<DeepPartial<Context> | undefined> & Settable<DeepPartial<Context>>;
    /**
     * Access or subscribe to adTrackingEnabled (also accesible from context)
     */
    readonly adTrackingEnabled: Watchable<boolean>;
    /**
     * Access or subscribe to integration settings
     */
    readonly settings: Watchable<SegmentAPIIntegrations | undefined>;
    /**
     * Access or suscribe to the events in the timeline
     */
    readonly events: Watchable<SegmentEvent[]>;
    /**
     * Access or subscribe to user info (anonymousId, userId, traits)
     */
    readonly userInfo: Watchable<UserInfoState>;
    readonly deepLinkData: Watchable<DeepLinkData>;
    /**
     * Returns the plugins currently loaded in the timeline
     * @param ofType Type of plugins, defaults to all
     * @returns List of Plugin objects
     */
    getPlugins(ofType?: PluginType): readonly Plugin[];
    /**
     * Retrieves a copy of the current client configuration
     */
    getConfig(): {
        writeKey: string;
        debug?: boolean | undefined;
        flushAt?: number | undefined;
        flushInterval?: number | undefined;
        trackAppLifecycleEvents?: boolean | undefined;
        maxBatchSize?: number | undefined;
        trackDeepLinks?: boolean | undefined;
        defaultSettings?: SegmentAPISettings | undefined;
        autoAddSegmentDestination?: boolean | undefined;
        collectDeviceId?: boolean | undefined; /**
         * Access or subscribe to client context
         */
        storePersistor?: import("@segment/sovran-react-native").Persistor | undefined;
    };
    constructor({ config, logger, store, }: {
        config: Config;
        logger: Logger;
        store: any;
    });
    /**
     * Initializes the client plugins, settings and subscribers.
     * Can only be called once.
     */
    init(): Promise<void>;
    fetchSettings(): Promise<void>;
    /**
     * Clears all subscriptions to the store
     */
    private unsubscribeStorageWatchers;
    /**
     * There is no garbage collection in JS, which means that any listeners, timeouts and subscriptions
     * would run until the application closes
     *
     * This method exists in case the user for some reason needs to recreate the class instance during runtime.
     * In this case, they should run client.cleanup() to destroy the listeners in the old client before creating a new one.
     *
     * There is a Stage 3 EMCAScript proposal to add a user-defined finalizer, which we could potentially switch to if
     * it gets approved: https://github.com/tc39/proposal-weakrefs#finalizers
     */
    cleanup(): void;
    private setupInterval;
    private setupStorageSubscribers;
    private setupLifecycleEvents;
    /**
       Applies the supplied closure to the currently loaded set of plugins.
       NOTE: This does not apply to plugins contained within DestinationPlugins.
  
       - Parameter closure: A closure that takes an plugin to be operated on as a parameter.
  
    */
    apply(closure: (plugin: Plugin) => void): void;
    /**
     * Adds a new plugin to the currently loaded set.
     * @param {{ plugin: Plugin, settings?: SegmentAPISettings }} Plugin to be added. Settings are optional if you want to force a configuration instead of the Segment Cloud received one
     */
    add({ plugin, settings, }: {
        plugin: Plugin;
        settings?: Plugin extends DestinationPlugin ? SegmentAPISettings : never;
    }): void;
    private addPlugin;
    /**
       Removes and unloads plugins with a matching name from the system.
  
       - Parameter pluginName: An plugin name.
    */
    remove({ plugin }: {
        plugin: Plugin;
    }): void;
    process(incomingEvent: SegmentEvent): void;
    private trackDeepLinks;
    private trackDeepLinkEvent;
    /**
     * Executes when the state store is initialized.
     * @param isReady
     */
    private onStorageReady;
    flush(debounceInterval?: boolean): Promise<void>;
    screen(name: string, options?: JsonMap): void;
    track(eventName: string, options?: JsonMap): void;
    identify(userId?: string, userTraits?: UserTraits): void;
    group(groupId: string, groupTraits?: GroupTraits): void;
    alias(newUserId: string): void;
    queueEvent(event: SegmentEvent): void;
    removeEvents(event: SegmentEvent | SegmentEvent[]): void;
    /**
     * Called once when the client is first created
     *
     * Detect and save the the currently installed application version
     * Send application lifecycle events if trackAppLifecycleEvents is enabled
     *
     * Exactly one of these events will be sent, depending on the current and previous version:s
     * Application Installed - no information on the previous version, so it's a fresh install
     * Application Updated - the previous detected version is different from the current version
     * Application Opened - the previously detected version is same as the current version
     */
    private checkInstalledVersion;
    /**
     * AppState event listener. Called whenever the app state changes.
     *
     * Send application lifecycle events if trackAppLifecycleEvents is enabled.
     *
     * Application Opened - only when the app state changes from 'inactive' or 'background' to 'active'
     *   The initial event from 'unknown' to 'active' is handled on launch in checkInstalledVersion
     * Application Backgrounded - when the app state changes from 'inactive' or 'background' to 'active
     *
     * @param nextAppState 'active', 'inactive', 'background' or 'unknown'
     */
    private handleAppStateChange;
    reset(resetAnonymousId?: boolean): void;
    /**
     * Registers a callback for when the client has loaded the device context. This happens at the startup of the app, but
     * it is handy for plugins that require context data during configure as it guarantees the context data is available.
     *
     * If the context is already loaded it will call the callback immediately.
     *
     * @param callback Function to call when context is ready.
     */
    onContextLoaded(callback: OnContextLoadCallback): void;
}
export {};
