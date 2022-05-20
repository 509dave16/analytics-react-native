export declare class Logger {
    isDisabled: boolean;
    constructor(isDisabled?: boolean);
    enable(): void;
    disable(): void;
    info(message?: any, ...optionalParams: any[]): void;
    warn(message?: any, ...optionalParams: any[]): void;
    error(message?: any, ...optionalParams: any[]): void;
}
export declare const createLogger: (isDisabled?: boolean | undefined) => Logger;
