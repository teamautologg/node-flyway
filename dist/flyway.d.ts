import { FlywayVersion } from "./internal/flyway-version";
import { FlywayBaselineResponse, FlywayCleanResponse, FlywayInfoResponse, FlywayMigrateResponse, FlywayRepairResponse, FlywayValidateResponse, NodeFlywayResponse } from "./response/responses";
import { ExecutionOptions, FlywayConfig, FlywayOptionalConfig } from "./types/types";
export declare class Flyway {
    private config;
    private executionOptions?;
    private debug?;
    private static defaultVersion;
    constructor(config: FlywayConfig, executionOptions?: ExecutionOptions | undefined, debug?: boolean | undefined);
    migrate(config?: FlywayOptionalConfig): Promise<NodeFlywayResponse<FlywayMigrateResponse>>;
    clean(config?: FlywayOptionalConfig): Promise<NodeFlywayResponse<FlywayCleanResponse>>;
    info(config?: FlywayOptionalConfig): Promise<NodeFlywayResponse<FlywayInfoResponse>>;
    validate(config?: FlywayOptionalConfig): Promise<NodeFlywayResponse<FlywayValidateResponse>>;
    baseline(config?: FlywayOptionalConfig): Promise<NodeFlywayResponse<FlywayBaselineResponse>>;
    repair(config?: FlywayOptionalConfig): Promise<NodeFlywayResponse<FlywayRepairResponse>>;
    static install(location?: string, version?: FlywayVersion, debug?: boolean): Promise<NodeFlywayResponse<any>["additionalDetails"]>;
    private mergeConfig;
}
