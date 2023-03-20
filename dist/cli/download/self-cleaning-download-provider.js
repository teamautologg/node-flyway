"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelfCleaningDownloadProvider = void 0;
const temp_1 = __importDefault(require("temp"));
const flyway_cli_provider_1 = require("../flyway-cli-provider");
const download_provider_1 = require("./download-provider");
class SelfCleaningDownloadProvider extends flyway_cli_provider_1.FlywayCliProvider {
    constructor(downloader) {
        super();
        this.downloader = downloader;
        this.temp = temp_1.default.track();
    }
    async getFlywayCli(flywayVersion) {
        const temporaryDirectory = await this.temp.mkdir();
        const downloadProvider = new download_provider_1.DownloadProvider(temporaryDirectory, this.downloader);
        return downloadProvider.getFlywayCli(flywayVersion);
    }
}
exports.SelfCleaningDownloadProvider = SelfCleaningDownloadProvider;
//# sourceMappingURL=self-cleaning-download-provider.js.map