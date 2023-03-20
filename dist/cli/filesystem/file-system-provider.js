"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystemFlywayCliProvider = void 0;
const promises_1 = require("fs/promises");
const path = require("path");
const flyway_version_1 = require("../../internal/flyway-version");
const types_1 = require("../../types/types");
const logger_1 = require("../../utility/logger");
const flyway_cli_1 = require("../flyway-cli");
const flyway_cli_provider_1 = require("../flyway-cli-provider");
const flyway_cli_service_1 = require("../service/flyway-cli-service");
class FileSystemFlywayCliProvider extends flyway_cli_provider_1.FlywayCliProvider {
    constructor(directory) {
        super();
        this.directory = directory;
    }
    /**
     *  Checks whether the provided directory is a matching Flyway CLI.
     *  Otherwise, checks nested directories to find a suitable Flyway CLI candidate.
     *  If no suitable CLI candidates are found, throws an exception.
     */
    async getFlywayCli(flywayVersion) {
        const existingVersionDetails = await flyway_cli_service_1.FlywayCliService.getFlywayCliDetails(this.directory);
        if (existingVersionDetails != null) {
            if (existingVersionDetails.version == flywayVersion) {
                const executable = await flyway_cli_service_1.FlywayCliService.getExecutableFromFlywayCli(this.directory);
                return new flyway_cli_1.FlywayCli(existingVersionDetails.version, types_1.FlywayCliSource.FILE_SYSTEM, this.directory, executable, existingVersionDetails.hash);
            }
            else {
                throw new Error(`Filesystem location is a Flyway CLI directory. However the Flyway CLI version is ${flyway_version_1.FlywayVersion[existingVersionDetails.version]} whereas the requested version is ${flyway_version_1.FlywayVersion[flywayVersion]}`);
            }
        }
        FileSystemFlywayCliProvider.logger.log(`Provided directory ${this.directory} is not a Flyway CLI. Searching nested directories to find a Flyway CLI candidate with version ${flyway_version_1.FlywayVersion[flywayVersion]}.`);
        const otherVersions = [];
        // Iterate through all child directories searching for CLI with matching version
        const directories = (await (0, promises_1.readdir)(this.directory, { withFileTypes: true }))
            .filter(file => file.isDirectory())
            .map(dir => path.join(this.directory, dir.name));
        const targetFlywayCli = (await Promise.all(directories.map(async (directory) => {
            const details = await flyway_cli_service_1.FlywayCliService.getFlywayCliDetails(directory);
            if (details == null) {
                return undefined;
            }
            if (this.flywayCliVersionsMatch(details.version, flywayVersion)) {
                return {
                    directory,
                    hash: details.hash
                };
            }
            else {
                otherVersions.push(details.version);
            }
        }))).find(directory => !!directory);
        if (targetFlywayCli == null) {
            const error = otherVersions.length == 0
                ? new Error(`No child directory of ${this.directory} is a Flyway CLI with version ${flyway_version_1.FlywayVersion[flywayVersion]}.`)
                : new Error(`No child directory of ${this.directory} is a Flyway CLI with version ${flyway_version_1.FlywayVersion[flywayVersion]}. Only found versions: ${otherVersions.map(version => flyway_version_1.FlywayVersion[version])}.`);
            throw error;
            // Suggest either enabling downloads or adding a new version to the source directory
        }
        const executable = await flyway_cli_service_1.FlywayCliService.getExecutableFromFlywayCli(targetFlywayCli.directory);
        return new flyway_cli_1.FlywayCli(flywayVersion, types_1.FlywayCliSource.FILE_SYSTEM, targetFlywayCli.directory, executable, targetFlywayCli.hash);
    }
    flywayCliVersionsMatch(version1, version2) {
        FileSystemFlywayCliProvider.logger.log(`Comparing Flyway versions. Target version: ${version2 && flyway_version_1.FlywayVersion[version2]}. Found version: ${version1 && flyway_version_1.FlywayVersion[version1]}.`);
        if (version1 == null || version2 == null) {
            return false;
        }
        return version1 == version2;
    }
}
exports.FileSystemFlywayCliProvider = FileSystemFlywayCliProvider;
FileSystemFlywayCliProvider.logger = (0, logger_1.getLogger)("FileSystemFlywayCliProvider");
//# sourceMappingURL=file-system-provider.js.map