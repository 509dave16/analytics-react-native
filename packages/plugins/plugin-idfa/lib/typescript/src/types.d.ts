export declare enum TrackingStatus {
    Authorized = "authorized",
    Denied = "denied",
    NotDetermined = "notDetermined",
    Restricted = "restricted",
    Unknown = "unknown"
}
export declare type IdfaData = {
    adTrackingEnabled: boolean;
    advertisingId: string;
    trackingStatus: TrackingStatus;
};
