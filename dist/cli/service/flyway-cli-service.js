"use strict";
/*
    Given a directory path, determine if this is a flyway CLI and the version
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlywayCliService = void 0;
const promises_1 = require("fs/promises");
const path_1 = require("path");
const flyway_version_1 = require("../../internal/flyway-version");
const utility_1 = require("../../utility/utility");
const md5 = require("md5");
const flyway_cli_1 = require("../flyway-cli");
class FlywayCliService {
    static async getFlywayCliDetails(directory) {
        if (!(0, utility_1.existsAndIsDirectory)(directory)) {
            return undefined;
        }
        const hash = await this.getFlywayCliHash(directory);
        if (hash == undefined) {
            return undefined;
        }
        try {
            return {
                version: (0, flyway_version_1.getFlywayCliVersionForHash)(hash),
                hash
            };
        }
        catch (err) {
            console.log(err);
            return undefined;
        }
    }
    static async getFlywayCliHash(directory) {
        const paths = await FlywayCliService.getFlywayCommandLineFiles(directory);
        if (paths.length == 0) {
            return undefined;
        }
        if (paths.length > 1) {
            throw new Error("Expected single filepath.");
        }
        const content = await (0, promises_1.readFile)(paths[0]);
        if (content == null) {
            throw new Error();
        }
        return md5(content);
    }
    static async getExecutableFromFlywayCli(directory) {
        const executableFiles = await (0, utility_1.findAllExecutableFilesInDirectory)(directory);
        if (executableFiles.length == 0) {
            throw new Error(`Unable to find an executable Flyway CLI in target directory: ${directory}`);
        }
        if (executableFiles.length > 1) {
            const executableFilesWithCorrectName = executableFiles.filter(file => file.name.includes("flyway"));
            if (executableFilesWithCorrectName.length > 1) {
                throw new Error(`Expecting only one executable Flyway CLI to be found. Instead found multiple executable files: ${executableFiles.map(ex => ex.name)}`);
            }
            else {
                (0, path_1.join)(directory, executableFilesWithCorrectName[0].name);
            }
        }
        return new flyway_cli_1.FlywayExecutable((0, path_1.join)(directory, executableFiles[0].name));
    }
    static async getFlywayCommandLineFiles(directory) {
        const paths_a = await (0, utility_1.globPromise)(`${directory}/lib/community/flyway-commandline-*.jar`);
        const paths_b = await (0, utility_1.globPromise)(`${directory}/lib/flyway-commandline-*.jar`);
        return paths_a.concat(paths_b);
    }
}
exports.FlywayCliService = FlywayCliService;
//# sourceMappingURL=flyway-cli-service.js.map