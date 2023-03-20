"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlywayInternal = void 0;
const flyway_cli_provider_factory_1 = require("../cli/flyway-cli-provider-factory");
const json_to_response_1 = require("../response/json-to-response");
const types_1 = require("../types/types");
const defaults_1 = require("./defaults");
const flyway_version_1 = require("./flyway-version");
class FlywayInternal {
    static async migrate(config, version, executionOptions) {
        return FlywayInternal.executeFlywayCommand("migrate", json_to_response_1.ConvertJsonToResponse.toFlywayMigrateResponse, config, version, executionOptions);
    }
    static async clean(config, version, executionOptions) {
        return FlywayInternal.executeFlywayCommand("clean", json_to_response_1.ConvertJsonToResponse.toFlywayCleanResponse, config, version, executionOptions);
    }
    static async info(config, version, executionOptions) {
        return FlywayInternal.executeFlywayCommand("info", json_to_response_1.ConvertJsonToResponse.toFlywayInfoResponse, config, version, executionOptions);
    }
    static async validate(config, version, executionOptions) {
        return FlywayInternal.executeFlywayCommand("validate", json_to_response_1.ConvertJsonToResponse.toFlywayValidateResponse, config, version, executionOptions);
    }
    static async baseline(config, version, executionOptions) {
        return FlywayInternal.executeFlywayCommand("baseline", json_to_response_1.ConvertJsonToResponse.toFlywayBaselineResponse, config, version, executionOptions);
    }
    static async repair(config, version, executionOptions) {
        return FlywayInternal.executeFlywayCommand("repair", json_to_response_1.ConvertJsonToResponse.toFlywayRepairResponse, config, version, executionOptions);
    }
    static async install(location, version) {
        const startTimestamp = Date.now();
        const cli = await FlywayInternal.getCli(types_1.FlywayCliStrategy.DOWNLOAD_CLI_ONLY, location, version);
        const executionTime = Date.now() - startTimestamp;
        return {
            executionTime,
            flywayCli: {
                location: cli.location,
                source: types_1.FlywayCliSource[cli.source],
                version: flyway_version_1.FlywayVersion[cli.version],
                hash: cli.hash
            }
        };
    }
    static async executeFlywayCommand(command, responseMapper, // Link command / T
    config, version, executionOptions) {
        const startTimestamp = Date.now();
        const cli = await FlywayInternal.getCli((executionOptions === null || executionOptions === void 0 ? void 0 : executionOptions.flywayCliStrategy) || defaults_1.DEFAULT_FLYWAY_CLI_STRATEGY, (executionOptions === null || executionOptions === void 0 ? void 0 : executionOptions.flywayCliLocation) || defaults_1.DEFAULT_FLYWAY_CLI_DIRECTORY, version);
        const rawResponse = await cli.executable.execute(command, config);
        const executionTime = Date.now() - startTimestamp;
        const parsedResponse = responseMapper(rawResponse.response);
        return Object.assign(Object.assign({ success: rawResponse.success }, parsedResponse), { additionalDetails: {
                executionTime,
                flywayCli: {
                    location: cli.location,
                    source: types_1.FlywayCliSource[cli.source],
                    version: flyway_version_1.FlywayVersion[cli.version],
                    hash: cli.hash
                }
            } });
    }
    static async getCli(strategy, location, version) {
        const flywayCliProvider = flyway_cli_provider_factory_1.FlywayCliProviderFactory.createFlywayCliProvider(strategy, location);
        const cli = await flywayCliProvider.getFlywayCli(version);
        if (cli == null) {
            throw new Error("Unable to source Flyway CLI.");
        }
        return cli;
    }
}
exports.FlywayInternal = FlywayInternal;
//# sourceMappingURL=flyway-internal.js.map