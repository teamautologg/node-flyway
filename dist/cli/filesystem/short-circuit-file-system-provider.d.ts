import { FlywayVersion } from "../../internal/flyway-version";
import { FlywayCli } from "../flyway-cli";
import { FlywayCliProvider } from "../flyway-cli-provider";
export declare class ShortCircuitFileSystemFlywayCliProvider extends FlywayCliProvider {
    private directory;
    protected static logger: import("../../utility/logger").Logger;
    constructor(directory: string);
    getFlywayCli(flywayVersion: FlywayVersion): Promise<FlywayCli>;
}
