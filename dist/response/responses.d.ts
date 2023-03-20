import { FlywayCommand } from "../types/types";
export declare type FlywayRawExecutionResponse = {
    success: boolean;
    response: string;
};
export declare type FlywayMigrateResponse = {
    initialSchemaVersion: string | undefined;
    targetSchemaVersion: string | undefined;
    schemaName: string;
    migrations: {
        category: string;
        version: string;
        description: string;
        type: string;
        filepath: string;
        executionTime: number;
    }[];
    migrationsExecuted: number;
    success: boolean;
    flywayVersion: string;
    database: string;
    warnings: Array<any>;
    operation: FlywayCommand;
};
export declare type FlywayCleanResponse = {
    schemasCleaned: Array<string>;
    schemasDropped: Array<string>;
    flywayVersion: string;
    database: string;
    warning: Array<any>;
    operation: FlywayCommand;
};
export declare type FlywayInfoResponse = {
    schemaVersion: string | undefined;
    schemaName: string;
    migrations: {
        category: string;
        version: string;
        description: string;
        type: string;
        installedOnUTC: string;
        state: string;
        undoable: string;
        filepath: string;
        installedBy: string;
        executionTime: number;
    }[];
    allSchemasEmpty: boolean;
    flywayVersion: string;
    database: string;
    warning: Array<any>;
    operation: FlywayCommand;
};
export declare type FlywayValidateResponse = {
    operation: FlywayCommand;
};
export declare type FlywayUndoResponse = {
    operation: FlywayCommand;
};
export declare type FlywayBaselineResponse = {
    operation: FlywayCommand;
};
export declare type FlywayRepairResponse = {
    operation: FlywayCommand;
};
export declare type FlywayResponse = FlywayMigrateResponse | FlywayCleanResponse | FlywayInfoResponse | FlywayValidateResponse | FlywayUndoResponse | FlywayBaselineResponse | FlywayRepairResponse;
export declare type FlywayErrorResponse = {
    errorCode?: string;
    message?: string;
    stackTrace?: string;
};
export declare type ParsedFlywayResponse<T extends FlywayResponse> = {
    error?: FlywayErrorResponse;
    flywayResponse?: T;
};
export declare type NodeFlywayResponse<T extends FlywayResponse> = {
    success: boolean;
    error?: FlywayErrorResponse;
    flywayResponse?: T;
    additionalDetails: {
        executionTime: number;
        flywayCli: {
            location: string;
            source: string;
            version: string;
            hash: string;
        };
    };
};
