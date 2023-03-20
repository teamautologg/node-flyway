"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlywayCliSource = exports.FlywayCliStrategy = void 0;
var FlywayCliStrategy;
(function (FlywayCliStrategy) {
    FlywayCliStrategy[FlywayCliStrategy["LOCAL_CLI_ONLY"] = 0] = "LOCAL_CLI_ONLY";
    FlywayCliStrategy[FlywayCliStrategy["LOCAL_CLI_ONLY_OPTIMIZED"] = 1] = "LOCAL_CLI_ONLY_OPTIMIZED";
    FlywayCliStrategy[FlywayCliStrategy["LOCAL_CLI_WITH_DOWNLOAD_FALLBACK"] = 2] = "LOCAL_CLI_WITH_DOWNLOAD_FALLBACK";
    FlywayCliStrategy[FlywayCliStrategy["DOWNLOAD_CLI_ONLY"] = 3] = "DOWNLOAD_CLI_ONLY";
    FlywayCliStrategy[FlywayCliStrategy["DOWNLOAD_CLI_AND_CLEAN"] = 4] = "DOWNLOAD_CLI_AND_CLEAN";
})(FlywayCliStrategy = exports.FlywayCliStrategy || (exports.FlywayCliStrategy = {}));
var FlywayCliSource;
(function (FlywayCliSource) {
    FlywayCliSource[FlywayCliSource["FILE_SYSTEM"] = 0] = "FILE_SYSTEM";
    FlywayCliSource[FlywayCliSource["DOWNLOAD"] = 1] = "DOWNLOAD";
})(FlywayCliSource = exports.FlywayCliSource || (exports.FlywayCliSource = {}));
//# sourceMappingURL=types.js.map