"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enableLogging = exports.getLogger = void 0;
const debug_1 = __importDefault(require("debug"));
const getLogger = (loggerName, loggerType) => {
    const namespace = loggerType == undefined || loggerType == "default" ? "node-flyway" : loggerType;
    return {
        log: (0, debug_1.default)(`${namespace}:${loggerName}`)
    };
};
exports.getLogger = getLogger;
const enableLogging = (loggerType) => {
    const namespace = loggerType == undefined || loggerType == "default" ? "node-flyway" : loggerType;
    debug_1.default.enable(`${namespace}:*`);
};
exports.enableLogging = enableLogging;
//# sourceMappingURL=logger.js.map