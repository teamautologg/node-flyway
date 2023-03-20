"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlywayCommandLineOptions = void 0;
const types_1 = require("util/types");
class FlywayCommandLineOptions {
    constructor(options) {
        this.options = options;
        this.options = options;
    }
    static build(config) {
        const options = CommandLineOptionGenerator.generateCommandLineOptions(config);
        return new FlywayCommandLineOptions(options);
    }
    getCommandLineOptions() {
        return this.options.map(option => option.convertToCommandLineString());
    }
    convertToCommandLineString() {
        return this.options.map(option => option.convertToCommandLineString()).join(" ");
    }
}
exports.FlywayCommandLineOptions = FlywayCommandLineOptions;
class FlywayCommandLineStandardOption {
    constructor(commandLineOptionKey, commandLineOptionValue) {
        this.commandLineOptionKey = commandLineOptionKey;
        this.commandLineOptionValue = commandLineOptionValue;
    }
    convertToCommandLineString() {
        const commandLineOptionValue = this.commandLineOptionValue.includes(" ")
            ? `"${this.commandLineOptionValue}"`
            : this.commandLineOptionValue;
        return `-${this.commandLineOptionKey}=${commandLineOptionValue}`;
    }
}
class FlywayCommandLineArrayOption {
    constructor(commandLineOptionKey, commandLineOptionValues) {
        this.commandLineOptionKey = commandLineOptionKey;
        this.commandLineOptionValues = commandLineOptionValues;
    }
    convertToCommandLineString() {
        return `-${this.commandLineOptionKey}="${this.commandLineOptionValues.join(",")}"`;
    }
}
class FlywayCommandLineMapOption {
    constructor(commandLineOptionKey, commandLineOptionMapValues) {
        this.commandLineOptionKey = commandLineOptionKey;
        this.commandLineOptionMapValues = commandLineOptionMapValues;
    }
    convertToCommandLineString() {
        const commandLineStringParts = [];
        // Throw if keys include whitespace
        this.commandLineOptionMapValues.forEach((key, val) => {
            commandLineStringParts.push(`${this.commandLineOptionKey}.${key}="${val}"`);
        });
        return commandLineStringParts.join(" ");
    }
}
class CommandLineOptionGenerator {
    static generateCommandLineOptions(config) {
        const mergedConfig = this.mergeConfigProperties(config);
        const flatConfig = Object.assign({ url: mergedConfig.url, user: mergedConfig.user, password: mergedConfig.password, defaultSchema: mergedConfig.defaultSchema, migrationLocations: mergedConfig.migrationLocations }, mergedConfig.advanced);
        const configKeys = Object.keys(flatConfig);
        return configKeys
            .filter(configKey => flatConfig[configKey] != undefined)
            .map(configKey => this.build(flatConfig, configKey, commandLineOptionMap))
            .filter(this.isDefined);
    }
    static mergeConfigProperties(config) {
        var _a, _b;
        let defaultSchema;
        let schemas;
        if (config.defaultSchema == undefined || ((_a = config.advanced) === null || _a === void 0 ? void 0 : _a.schemas) == undefined) {
            defaultSchema = config.defaultSchema;
            schemas = (_b = config.advanced) === null || _b === void 0 ? void 0 : _b.schemas;
        }
        else {
            defaultSchema = config.defaultSchema;
            schemas = config.advanced.schemas.filter(schema => schema != config.defaultSchema);
        }
        const basicConfig = Object.assign(Object.assign({}, config), { defaultSchema: defaultSchema });
        const advancedConfig = config.advanced != null
            ? Object.assign(Object.assign({}, config.advanced), { schemas }) : undefined;
        return Object.assign(Object.assign({}, basicConfig), { advanced: advancedConfig });
    }
    static build(config, configKey, commandLineOptionMappings) {
        const configPropertyValue = config[configKey];
        if (configPropertyValue == undefined) {
            return undefined;
        }
        if (Array.isArray(configPropertyValue)) {
            return new FlywayCommandLineArrayOption(commandLineOptionMappings[configKey], configPropertyValue);
        }
        else if ((0, types_1.isMap)(configPropertyValue)) {
            return new FlywayCommandLineMapOption(commandLineOptionMappings[configKey], configPropertyValue // TODO - fix explicit any
            );
        }
        else {
            return new FlywayCommandLineStandardOption(commandLineOptionMappings[configKey], `${configPropertyValue}`);
        }
    }
    static isDefined(arg) {
        return arg != undefined;
    }
}
const commandLineOptionMap = {
    url: "url",
    user: "user",
    password: "password",
    defaultSchema: "defaultSchema",
    migrationLocations: "locations",
    driver: "driver",
    connectRetries: "connectRetries",
    connectRetriesInterval: "connectRetriesInterval",
    initSql: "initSql",
    callbacks: "callbacks",
    configFileEncoding: "configFileEncoding",
    configFiles: "configFiles",
    migrationEncoding: "encoding",
    groupPendingMigrations: "group",
    installedBy: "installedBy",
    jarDirs: "jarDirs",
    failOnMissingMigrationLocations: "failOnMissingLocations",
    lockRetryCount: "lockRetryCount",
    mixed: "mixed",
    applyNewMigrationsOutOfOrder: "outOfOrder",
    skipDefaultCallbacks: "skipDefaultCallbacks",
    skipDefaultResolvers: "skipDefaultResolvers",
    schemaHistoryTable: "table",
    schemaHistoryTableSpace: "tableSpace",
    target: "target",
    validateMigrationNaming: "validateMigrationNaming",
    validateOnMigrate: "validateOnMigrate",
    workingDirectory: "workingDirectory",
    createSchemas: "createSchemas",
    schemas: "schemas",
    baselineDescription: "baselineDescription",
    baselineOnMigrate: "baselineOnMigrate",
    baselineVersion: "baselineVersion",
    cleanDisabled: "cleanDisabled",
    cleanOnValidationError: "cleanOnValidationError",
    ignoreMigrationPatterns: "ignoreMigrationPatterns",
    repeatableSqlMigrationPrefix: "repeatableSqlMigrationPrefix",
    resolvers: "resolvers",
    sqlMigrationPrefix: "sqlMigrationPrefix",
    sqlMigrationSeparator: "sqlMigrationSeparator",
    sqlMigrationSuffixes: "sqlMigrationSuffixes",
    placeHolderReplacement: "placeHolderReplacement",
    placeHolderPrefix: "placeHolderPrefix",
    placeHolderSuffix: "placeHolderSuffix",
    placeHolders: "placeHolders",
    placeHolderSeparator: "placeHolderSeparator",
    scriptPlaceHolderPrefix: "scriptPlaceHolderPrefix",
    scriptPlaceHolderSuffix: "scriptPlaceHolderSuffix",
    edition: "edition",
    postgresqlTransactionLock: "postgresqlTransactionLock"
};
//# sourceMappingURL=flyway-command-line-options.js.map