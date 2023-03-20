import debug from "debug";
export declare type Logger = {
    log: debug.Debugger;
};
export declare type LoggerType = "default" | "integration-test";
export declare const getLogger: (loggerName: string, loggerType?: LoggerType) => Logger;
export declare const enableLogging: (loggerType?: LoggerType) => void;
