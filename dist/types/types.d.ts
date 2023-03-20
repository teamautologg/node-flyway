export declare type FlywayConfig = FlywayBasicConfig & {
    advanced?: FlywayAdvancedConfig;
};
export declare type FlywayOptionalConfig = Partial<FlywayConfig>;
export declare type FlywayBasicConfig = {
    url: string;
    user: string;
    password?: string;
    defaultSchema?: string;
    migrationLocations: string[];
};
export declare type FlywayAdvancedConfig = {
    driver?: string;
    connectRetries?: number;
    connectRetriesInterval?: number;
    initSql?: string;
    callbacks?: string[];
    configFileEncoding?: "US-ASCII" | "ISO-8859-1" | "UTF-8" | "UTF-16BE" | "UTF-16LE" | "UTF-16";
    configFiles?: string[];
    migrationEncoding?: "US-ASCII" | "ISO-8859-1" | "UTF-8" | "UTF-16BE" | "UTF-16LE" | "UTF-16";
    groupPendingMigrations?: boolean;
    installedBy?: string;
    jarDirs?: string[];
    failOnMissingMigrationLocations?: boolean;
    lockRetryCount?: number;
    mixed?: boolean;
    applyNewMigrationsOutOfOrder?: boolean;
    skipDefaultCallbacks?: boolean;
    skipDefaultResolvers?: boolean;
    schemaHistoryTable?: string;
    schemaHistoryTableSpace?: string;
    target?: string;
    validateMigrationNaming?: boolean;
    validateOnMigrate?: boolean;
    workingDirectory?: string;
    createSchemas?: boolean;
    schemas?: string[];
    baselineDescription?: string;
    baselineOnMigrate?: boolean;
    baselineVersion?: string;
    cleanDisabled?: boolean;
    cleanOnValidationError?: boolean;
    ignoreMigrationPatterns?: string;
    repeatableSqlMigrationPrefix?: string;
    resolvers?: string[];
    sqlMigrationPrefix?: string;
    sqlMigrationSeparator?: string;
    sqlMigrationSuffixes?: string[];
    placeHolderReplacement?: boolean;
    placeHolderPrefix?: string;
    placeHolderSuffix?: string;
    placeHolders?: Map<string, string>;
    placeHolderSeparator?: string;
    scriptPlaceHolderPrefix?: string;
    scriptPlaceHolderSuffix?: string;
    edition?: "community" | "teams";
    postgresqlTransactionLock?: boolean;
};
export declare type CommandLineOptionMap = {
    [Property in (keyof FlywayBasicConfig | keyof FlywayAdvancedConfig)]: string;
};
export declare type FlywayCommand = "migrate" | "clean" | "info" | "validate" | "undo" | "baseline" | "repair";
export declare type ExecutionOptions = {
    flywayCliLocation?: string;
    flywayCliStrategy?: FlywayCliStrategy;
};
export declare enum FlywayCliStrategy {
    LOCAL_CLI_ONLY = 0,
    LOCAL_CLI_ONLY_OPTIMIZED = 1,
    LOCAL_CLI_WITH_DOWNLOAD_FALLBACK = 2,
    DOWNLOAD_CLI_ONLY = 3,
    DOWNLOAD_CLI_AND_CLEAN = 4
}
export declare enum FlywayCliSource {
    FILE_SYSTEM = 0,
    DOWNLOAD = 1
}
