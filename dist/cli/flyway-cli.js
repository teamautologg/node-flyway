"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlywayExecutable = exports.FlywayCli = void 0;
const shelljs_1 = require("shelljs");
const flyway_command_line_options_1 = require("../internal/flyway-command-line-options");
const logger_1 = require("../utility/logger");
class FlywayCli {
    constructor(version, source, location, executable, hash) {
        this.version = version;
        this.source = source;
        this.location = location;
        this.executable = executable;
        this.hash = hash;
    }
}
exports.FlywayCli = FlywayCli;
class FlywayExecutable {
    constructor(path) {
        this.path = path;
    }
    async execute(flywayCommand, config) {
        const commandLineOptions = flyway_command_line_options_1.FlywayCommandLineOptions.build(config);
        const command = `${this.path} ${commandLineOptions.convertToCommandLineString()} ${flywayCommand} -outputType=json`;
        FlywayExecutable.logger.log(`Executing flyway command: ${command}`);
        const response = await new Promise((resolve, reject) => {
            (0, shelljs_1.exec)(command, { silent: true }, (code, stdout) => {
                if (code == 0) {
                    resolve({ success: true, response: stdout });
                }
                if (code == 2 && !stdout) {
                    // Handle non-zero code and empty output to stdout. Output to stdout appears to be "" when the error code is 2.
                    reject();
                }
                else {
                    FlywayExecutable.logger.log(`Code: ${code} returned when executing command.`);
                    resolve({ success: false, response: stdout }); // Nothing is piped to stderr by the CLI. Maybe in some cases it is?
                }
            });
        });
        FlywayExecutable.logger.log(`Successfully executed command`);
        FlywayExecutable.logger.log(`Received response from Flyway CLI: ${response.response}`);
        return response;
    }
}
exports.FlywayExecutable = FlywayExecutable;
FlywayExecutable.logger = (0, logger_1.getLogger)("FlywayExecutable");
//# sourceMappingURL=flyway-cli.js.map