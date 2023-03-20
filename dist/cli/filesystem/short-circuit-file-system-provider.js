"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortCircuitFileSystemFlywayCliProvider = void 0;
const flyway_version_1 = require("../../internal/flyway-version");
const types_1 = require("../../types/types");
const logger_1 = require("../../utility/logger");
const flyway_cli_1 = require("../flyway-cli");
const flyway_cli_provider_1 = require("../flyway-cli-provider");
const flyway_cli_service_1 = require("../service/flyway-cli-service");
class ShortCircuitFileSystemFlywayCliProvider extends flyway_cli_provider_1.FlywayCliProvider {
    constructor(directory) {
        super();
        this.directory = directory;
    }
    async getFlywayCli(flywayVersion) {
        const cliDetails = await flyway_cli_service_1.FlywayCliService.getFlywayCliDetails(this.directory);
        if (cliDetails == null) {
            throw new Error(`Provided directory is not a Flyway CLI. Ensure that the provided directory path points to a Flyway CLI. The execution strategy is set to ${types_1.FlywayCliStrategy[types_1.FlywayCliStrategy.LOCAL_CLI_ONLY_OPTIMIZED]} meaning that the process immediately fails if no CLI is found.`);
        }
        if (flywayVersion != cliDetails.version) {
            throw new Error(`Provided directory is a Flyway CLI, but the CLI version: ${flyway_version_1.FlywayVersion[cliDetails.version]} doesn't match the specified version: ${flyway_version_1.FlywayVersion[flywayVersion]}. Either replace the Flyway CLI locally with the desired version, or update the target version using the static builder on the Flyway class in your Node.js app. `);
        }
        const executable = await flyway_cli_service_1.FlywayCliService.getExecutableFromFlywayCli(this.directory);
        ShortCircuitFileSystemFlywayCliProvider.logger.log(`Successfully found a Flyway CLI with path: ${this.directory} using the optimized local CLI strategy.`);
        return new flyway_cli_1.FlywayCli(flywayVersion, types_1.FlywayCliSource.FILE_SYSTEM, this.directory, executable, cliDetails.hash);
    }
}
exports.ShortCircuitFileSystemFlywayCliProvider = ShortCircuitFileSystemFlywayCliProvider;
ShortCircuitFileSystemFlywayCliProvider.logger = (0, logger_1.getLogger)("ShortCircuitFileSystemFlywayCliProvider");
//# sourceMappingURL=short-circuit-file-system-provider.js.map