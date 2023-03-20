"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_FLYWAY_VERSION = exports.DEFAULT_FLYWAY_CLI_STRATEGY = exports.DEFAULT_FLYWAY_CLI_DIRECTORY = void 0;
const os_1 = require("os");
const path_1 = require("path");
const types_1 = require("../types/types");
const flyway_version_1 = require("./flyway-version");
exports.DEFAULT_FLYWAY_CLI_DIRECTORY = `${(0, path_1.join)((0, os_1.homedir)(), ".node-flyway")}`;
exports.DEFAULT_FLYWAY_CLI_STRATEGY = types_1.FlywayCliStrategy.LOCAL_CLI_WITH_DOWNLOAD_FALLBACK;
exports.DEFAULT_FLYWAY_VERSION = flyway_version_1.FlywayVersion["V9.0.0"];
//# sourceMappingURL=defaults.js.map