import { FlywayBaselineResponse, FlywayCleanResponse, FlywayInfoResponse, FlywayMigrateResponse, FlywayRepairResponse, FlywayValidateResponse, NodeFlywayResponse } from "../response/responses";
import { ExecutionOptions, FlywayConfig } from "../types/types";
import { FlywayVersion } from "./flyway-version";
export declare class FlywayInternal {
    static migrate(config: FlywayConfig, version: FlywayVersion, executionOptions?: ExecutionOptions): Promise<NodeFlywayResponse<FlywayMigrateResponse>>;
    static clean(config: FlywayConfig, version: FlywayVersion, executionOptions?: ExecutionOptions): Promise<NodeFlywayResponse<FlywayCleanResponse>>;
    static info(config: FlywayConfig, version: FlywayVersion, executionOptions?: ExecutionOptions): Promise<NodeFlywayResponse<FlywayInfoResponse>>;
    static validate(config: FlywayConfig, version: FlywayVersion, executionOptions?: ExecutionOptions): Promise<NodeFlywayResponse<FlywayValidateResponse>>;
    static baseline(config: FlywayConfig, version: FlywayVersion, executionOptions?: ExecutionOptions): Promise<NodeFlywayResponse<FlywayBaselineResponse>>;
    static repair(config: FlywayConfig, version: FlywayVersion, executionOptions?: ExecutionOptions): Promise<NodeFlywayResponse<FlywayRepairResponse>>;
    static install(location: string, version: FlywayVersion): Promise<NodeFlywayResponse<any>["additionalDetails"]>;
    private static executeFlywayCommand;
    private static getCli;
}
