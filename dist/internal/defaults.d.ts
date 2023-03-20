import { FlywayCliStrategy } from "../types/types";
import { FlywayVersion } from "./flyway-version";
export declare const DEFAULT_FLYWAY_CLI_DIRECTORY: string;
export declare const DEFAULT_FLYWAY_CLI_STRATEGY = FlywayCliStrategy.LOCAL_CLI_WITH_DOWNLOAD_FALLBACK;
export declare const DEFAULT_FLYWAY_VERSION = FlywayVersion["V9.0.0"];
