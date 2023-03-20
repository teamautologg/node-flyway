import { FlywayCliSource, FlywayCommand, FlywayConfig } from "../types/types";
import { FlywayVersion } from "../internal/flyway-version";
import { FlywayRawExecutionResponse } from "../response/responses";
export declare class FlywayCli {
    readonly version: FlywayVersion;
    readonly source: FlywayCliSource;
    readonly location: string;
    readonly executable: FlywayExecutable;
    readonly hash: string;
    constructor(version: FlywayVersion, source: FlywayCliSource, location: string, executable: FlywayExecutable, hash: string);
}
export declare class FlywayExecutable {
    readonly path: string;
    private static readonly logger;
    constructor(path: string);
    execute(flywayCommand: FlywayCommand, config: FlywayConfig): Promise<FlywayRawExecutionResponse>;
}
