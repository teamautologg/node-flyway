"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Flyway = void 0;
const defaults_1 = require("./internal/defaults");
const flyway_internal_1 = require("./internal/flyway-internal");
const auto_bind_1 = __importDefault(require("auto-bind"));
const logger_1 = require("./utility/logger");
class Flyway {
    constructor(config, executionOptions, debug) {
        this.config = config;
        this.executionOptions = executionOptions;
        this.debug = debug;
        if (debug) {
            (0, logger_1.enableLogging)();
        }
        (0, auto_bind_1.default)(this);
    }
    // Tidy up return value
    // Some commands - migrate/info/validate/repair require at least one migration location
    migrate(config) {
        const mergedConfig = this.mergeConfig(config);
        return flyway_internal_1.FlywayInternal.migrate(mergedConfig, Flyway.defaultVersion, this.executionOptions);
    }
    clean(config) {
        const mergedConfig = this.mergeConfig(config);
        return flyway_internal_1.FlywayInternal.clean(mergedConfig, Flyway.defaultVersion, this.executionOptions);
    }
    info(config) {
        const mergedConfig = this.mergeConfig(config);
        return flyway_internal_1.FlywayInternal.info(mergedConfig, Flyway.defaultVersion, this.executionOptions);
    }
    validate(config) {
        const mergedConfig = this.mergeConfig(config);
        return flyway_internal_1.FlywayInternal.validate(mergedConfig, Flyway.defaultVersion, this.executionOptions);
    }
    baseline(config) {
        const mergedConfig = this.mergeConfig(config);
        return flyway_internal_1.FlywayInternal.baseline(mergedConfig, Flyway.defaultVersion, this.executionOptions);
    }
    repair(config) {
        const mergedConfig = this.mergeConfig(config);
        return flyway_internal_1.FlywayInternal.repair(mergedConfig, Flyway.defaultVersion, this.executionOptions);
    }
    static install(location, version, debug) {
        if (debug) {
            (0, logger_1.enableLogging)();
        }
        return flyway_internal_1.FlywayInternal.install(location || defaults_1.DEFAULT_FLYWAY_CLI_DIRECTORY, version || Flyway.defaultVersion);
    }
    mergeConfig(partialConfig) {
        if (!partialConfig) {
            return this.config;
        }
        const mergedAdvancedConfig = !!partialConfig.advanced && !!this.config.advanced
            ? Object.assign(Object.assign({}, this.config.advanced), partialConfig.advanced) : this.config.advanced || partialConfig.advanced;
        return Object.assign(Object.assign(Object.assign({}, this.config), partialConfig), { advanced: mergedAdvancedConfig });
    }
}
exports.Flyway = Flyway;
Flyway.defaultVersion = defaults_1.DEFAULT_FLYWAY_VERSION;
//# sourceMappingURL=flyway.js.map