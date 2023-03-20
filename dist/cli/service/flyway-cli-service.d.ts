import { FlywayVersion } from "../../internal/flyway-version";
import { FlywayExecutable } from "../flyway-cli";
export declare class FlywayCliService {
    static getFlywayCliDetails(directory: string): Promise<{
        version: FlywayVersion;
        hash: string;
    } | undefined>;
    static getFlywayCliHash(directory: string): Promise<string | undefined>;
    static getExecutableFromFlywayCli(directory: string): Promise<FlywayExecutable>;
    private static getFlywayCommandLineFiles;
}
