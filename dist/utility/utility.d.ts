/// <reference types="node" />
export declare const findAllExecutableFilesInDirectory: (path: string) => Promise<import("fs").Dirent[]>;
export declare const canExecuteFile: (path: string) => Promise<boolean>;
export declare const hasFullPermissionsOnFile: (path: string) => Promise<boolean>;
export declare const isDefined: <T>(argument: T | undefined) => argument is T;
export declare const existsAndIsDirectory: (directory: string) => Promise<boolean>;
export declare const globPromise: (path: string) => Promise<string[]>;
