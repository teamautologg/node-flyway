"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MavenFlywayCliDownloader = exports.FlywayCliUrlBuilder = exports.DirectFlywayCliDownloader = void 0;
const path_1 = require("path");
const flyway_version_1 = require("../../../internal/flyway-version");
const node_downloader_helper_1 = require("node-downloader-helper");
const logger_1 = require("../../../utility/logger");
class DirectFlywayCliDownloader {
    constructor() {
        this.logger = (0, logger_1.getLogger)("DirectFlywayCliDownloader");
    }
    async downloadFlywayCli(flywayVersion, saveDirectory) {
        const operatingSystem = FlywayCliUrlBuilder.getUrlRepresentationOfHostOperatingSystem();
        const url = FlywayCliUrlBuilder.buildUrl(flywayVersion, operatingSystem);
        await this.download(url.url, saveDirectory);
        return (0, path_1.join)(saveDirectory, url.fileName);
    }
    async download(url, saveDirectory) {
        const downloader = new node_downloader_helper_1.DownloaderHelper(url, saveDirectory);
        return new Promise((resolve, reject) => {
            downloader.on("end", () => resolve());
            downloader.on("error", (err) => reject(err));
            downloader.on("progress.throttled", (downloadEvents) => {
                const percentageComplete = downloadEvents.progress < 100 ? downloadEvents.progress.toPrecision(2) : 100;
                this.logger.log(`Downloaded: ${percentageComplete}%`);
            });
            downloader.start();
        });
    }
}
exports.DirectFlywayCliDownloader = DirectFlywayCliDownloader;
class FlywayCliUrlBuilder {
    static getUrlRepresentationOfHostOperatingSystem() {
        const platform = process.platform;
        if (platform == "win32") {
            return "windows";
        }
        if (platform == "darwin") {
            return "macosx";
        }
        return "linux";
    }
    static buildUrl(flywayVersion, operatingSystem) {
        const urlComponents = (0, flyway_version_1.getUrlComponentsForFlywayVersion)(flywayVersion);
        const fileName = this.buildFilename(flywayVersion, operatingSystem);
        return {
            url: `https://repo1.maven.org/maven2/org/flywaydb/flyway-commandline/${urlComponents.versionString}/${fileName}`,
            fileName
        };
    }
    static buildFilename(flywayVersion, operatingSystem) {
        const urlComponents = (0, flyway_version_1.getUrlComponentsForFlywayVersion)(flywayVersion);
        if (urlComponents.operatingSystemSpecificUrl) {
            return operatingSystem != "windows"
                ? `flyway-commandline-${urlComponents.versionString}-${operatingSystem}-x64.tar.gz`
                : `flyway-commandline-${urlComponents.versionString}-${operatingSystem}-x64.zip`;
        }
        return `flyway-commandline-${urlComponents.versionString}.tar.gz`;
    }
}
exports.FlywayCliUrlBuilder = FlywayCliUrlBuilder;
/**
 * Downloads CLI via Maven.
 */
class MavenFlywayCliDownloader {
    downloadFlywayCli(flywayVersion, saveDirectory) {
        throw new Error("Method not implemented.");
    }
}
exports.MavenFlywayCliDownloader = MavenFlywayCliDownloader;
//# sourceMappingURL=flyway-cli-downloader.js.map