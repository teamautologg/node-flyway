"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globPromise = exports.existsAndIsDirectory = exports.isDefined = exports.hasFullPermissionsOnFile = exports.canExecuteFile = exports.findAllExecutableFilesInDirectory = void 0;
const fs_1 = require("fs");
const promises_1 = require("fs/promises");
const glob_1 = require("glob");
const path_1 = require("path");
const findAllExecutableFilesInDirectory = async (path) => {
    const entries = await (0, promises_1.readdir)(path, { withFileTypes: true });
    const executables = await Promise.all(entries
        .filter(file => file.isFile())
        .map(async (file) => await (0, exports.canExecuteFile)((0, path_1.join)(path, file.name)) ? file : undefined));
    return executables.filter(exports.isDefined);
};
exports.findAllExecutableFilesInDirectory = findAllExecutableFilesInDirectory;
const canExecuteFile = async (path) => {
    try {
        await (0, promises_1.access)(path, fs_1.constants.X_OK);
        return true;
    }
    catch (err) {
        return false;
    }
};
exports.canExecuteFile = canExecuteFile;
const hasFullPermissionsOnFile = async (path) => {
    // TODO = implement this
    return true;
};
exports.hasFullPermissionsOnFile = hasFullPermissionsOnFile;
const isDefined = (argument) => {
    return argument !== undefined;
};
exports.isDefined = isDefined;
const existsAndIsDirectory = async (directory) => {
    let stats;
    try {
        stats = await (0, promises_1.stat)(directory);
    }
    catch (error) {
        return false;
    }
    return stats.isDirectory();
};
exports.existsAndIsDirectory = existsAndIsDirectory;
const globPromise = (path) => {
    return new Promise((resolve, reject) => {
        (0, glob_1.glob)(path, (err, matches) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(matches);
            }
        });
    });
};
exports.globPromise = globPromise;
//# sourceMappingURL=utility.js.map