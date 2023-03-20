import { FlywayVersion } from "../internal/flyway-version";
import { FlywayCli } from "./flyway-cli";
export declare abstract class FlywayCliProvider {
    protected static logger: import("../utility/logger").Logger;
    abstract getFlywayCli(flywayVersion: FlywayVersion): Promise<FlywayCli | undefined>;
    chain(provider: FlywayCliProvider): FlywayCliProvider;
}
