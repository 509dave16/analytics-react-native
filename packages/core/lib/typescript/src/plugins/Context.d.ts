import { PlatformPlugin } from '../plugin';
import { PluginType, SegmentEvent } from '../types';
export declare class InjectContext extends PlatformPlugin {
    type: PluginType;
    execute(event: SegmentEvent): {
        context: {
            app?: import("../types").DeepPartial<{
                build: string;
                name: string;
                namespace: string;
                version: string;
            }> | undefined;
            device?: import("../types").DeepPartial<import("../types").ContextDevice> | undefined;
            library?: import("../types").DeepPartial<{
                name: string;
                version: string;
            }> | undefined;
            locale?: string | undefined;
            network?: import("../types").DeepPartial<{
                cellular: boolean;
                wifi: boolean;
            }> | undefined;
            os?: import("../types").DeepPartial<{
                name: string;
                version: string;
            }> | undefined;
            screen?: import("../types").DeepPartial<{
                height: number;
                width: number;
                density?: number | undefined;
            }> | undefined;
            timezone?: string | undefined;
            traits?: import("../types").DeepPartial<import("../types").UserTraits> | undefined;
        };
        type: import("../types").EventType.TrackEvent;
        event: string;
        properties?: import("../types").JsonMap | undefined;
        anonymousId?: string | undefined;
        messageId?: string | undefined;
        userId?: string | undefined;
        timestamp?: string | undefined;
        integrations?: import("../types").SegmentAPIIntegrations | undefined;
        _metadata?: import("../types").DestinationMetadata | undefined;
    } | {
        context: {
            app?: import("../types").DeepPartial<{
                build: string;
                name: string;
                namespace: string;
                version: string;
            }> | undefined;
            device?: import("../types").DeepPartial<import("../types").ContextDevice> | undefined;
            library?: import("../types").DeepPartial<{
                name: string;
                version: string;
            }> | undefined;
            locale?: string | undefined;
            network?: import("../types").DeepPartial<{
                cellular: boolean;
                wifi: boolean;
            }> | undefined;
            os?: import("../types").DeepPartial<{
                name: string;
                version: string;
            }> | undefined;
            screen?: import("../types").DeepPartial<{
                height: number;
                width: number;
                density?: number | undefined;
            }> | undefined;
            timezone?: string | undefined;
            traits?: import("../types").DeepPartial<import("../types").UserTraits> | undefined;
        };
        type: import("../types").EventType.ScreenEvent;
        name: string;
        properties: import("../types").JsonMap;
        anonymousId?: string | undefined;
        messageId?: string | undefined;
        userId?: string | undefined;
        timestamp?: string | undefined;
        integrations?: import("../types").SegmentAPIIntegrations | undefined;
        _metadata?: import("../types").DestinationMetadata | undefined;
    } | {
        context: {
            app?: import("../types").DeepPartial<{
                build: string;
                name: string;
                namespace: string;
                version: string;
            }> | undefined;
            device?: import("../types").DeepPartial<import("../types").ContextDevice> | undefined;
            library?: import("../types").DeepPartial<{
                name: string;
                version: string;
            }> | undefined;
            locale?: string | undefined;
            network?: import("../types").DeepPartial<{
                cellular: boolean;
                wifi: boolean;
            }> | undefined;
            os?: import("../types").DeepPartial<{
                name: string;
                version: string;
            }> | undefined;
            screen?: import("../types").DeepPartial<{
                height: number;
                width: number;
                density?: number | undefined;
            }> | undefined;
            timezone?: string | undefined;
            traits?: import("../types").DeepPartial<import("../types").UserTraits> | undefined;
        };
        type: import("../types").EventType.IdentifyEvent;
        traits: import("../types").UserTraits;
        anonymousId?: string | undefined;
        messageId?: string | undefined;
        userId?: string | undefined;
        timestamp?: string | undefined;
        integrations?: import("../types").SegmentAPIIntegrations | undefined;
        _metadata?: import("../types").DestinationMetadata | undefined;
    } | {
        context: {
            app?: import("../types").DeepPartial<{
                build: string;
                name: string;
                namespace: string;
                version: string;
            }> | undefined;
            device?: import("../types").DeepPartial<import("../types").ContextDevice> | undefined;
            library?: import("../types").DeepPartial<{
                name: string;
                version: string;
            }> | undefined;
            locale?: string | undefined;
            network?: import("../types").DeepPartial<{
                cellular: boolean;
                wifi: boolean;
            }> | undefined;
            os?: import("../types").DeepPartial<{
                name: string;
                version: string;
            }> | undefined;
            screen?: import("../types").DeepPartial<{
                height: number;
                width: number;
                density?: number | undefined;
            }> | undefined;
            timezone?: string | undefined;
            traits?: import("../types").DeepPartial<import("../types").UserTraits> | undefined;
        };
        type: import("../types").EventType.GroupEvent;
        groupId: string;
        traits: import("../types").GroupTraits;
        anonymousId?: string | undefined;
        messageId?: string | undefined;
        userId?: string | undefined;
        timestamp?: string | undefined;
        integrations?: import("../types").SegmentAPIIntegrations | undefined;
        _metadata?: import("../types").DestinationMetadata | undefined;
    } | {
        context: {
            app?: import("../types").DeepPartial<{
                build: string;
                name: string;
                namespace: string;
                version: string;
            }> | undefined;
            device?: import("../types").DeepPartial<import("../types").ContextDevice> | undefined;
            library?: import("../types").DeepPartial<{
                name: string;
                version: string;
            }> | undefined;
            locale?: string | undefined;
            network?: import("../types").DeepPartial<{
                cellular: boolean;
                wifi: boolean;
            }> | undefined;
            os?: import("../types").DeepPartial<{
                name: string;
                version: string;
            }> | undefined;
            screen?: import("../types").DeepPartial<{
                height: number;
                width: number;
                density?: number | undefined;
            }> | undefined;
            timezone?: string | undefined;
            traits?: import("../types").DeepPartial<import("../types").UserTraits> | undefined;
        };
        type: import("../types").EventType.AliasEvent;
        userId?: string | undefined;
        previousId: string;
        anonymousId?: string | undefined;
        messageId?: string | undefined;
        timestamp?: string | undefined;
        integrations?: import("../types").SegmentAPIIntegrations | undefined;
        _metadata?: import("../types").DestinationMetadata | undefined;
    };
}
