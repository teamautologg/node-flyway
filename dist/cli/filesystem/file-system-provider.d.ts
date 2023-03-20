import { FlywayVersion } from "../../internal/flyway-version";
import { FlywayCli } from "../flyway-cli";
import { FlywayCliProvider } from "../flyway-cli-provider";
export declare class FileSystemFlywayCliProvider extends FlywayCliProvider {
    private directory;
    protected static logger: import("../../utility/logger").Logger;
    constructor(directory: string);
    /**
     *  Checks whether the provided directory is a matching Flyway CLI.
     *  Otherwise, checks nested directories to find a suitable Flyway CLI candidate.
     *  If no suitable CLI candidates are found, throws an exception.
     */
    getFlywayCli(flywayVersion: FlywayVersion): Promise<FlywayCli | undefined>;
    private flywayCliVersionsMatch;
}
