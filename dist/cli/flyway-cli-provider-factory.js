"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlywayCliProviderFactory = void 0;
const types_1 = require("../types/types");
const download_provider_1 = require("./download/download-provider");
const flyway_cli_downloader_1 = require("./download/downloader/flyway-cli-downloader");
const self_cleaning_download_provider_1 = require("./download/self-cleaning-download-provider");
const file_system_provider_1 = require("./filesystem/file-system-provider");
const short_circuit_file_system_provider_1 = require("./filesystem/short-circuit-file-system-provider");
class FlywayCliProviderFactory {
    static createFlywayCliProvider(strategy, flywayCliDirectory) {
        if (strategy == types_1.FlywayCliStrategy.LOCAL_CLI_WITH_DOWNLOAD_FALLBACK) {
            return FlywayCliProviderFactory.createFileSystemProviderWithDownloadFallback(flywayCliDirectory);
        }
        else if (strategy == types_1.FlywayCliStrategy.LOCAL_CLI_ONLY) {
            return new file_system_provider_1.FileSystemFlywayCliProvider(flywayCliDirectory);
        }
        else if (strategy == types_1.FlywayCliStrategy.LOCAL_CLI_ONLY_OPTIMIZED) {
            return new short_circuit_file_system_provider_1.ShortCircuitFileSystemFlywayCliProvider(flywayCliDirectory);
        }
        else if (strategy == types_1.FlywayCliStrategy.DOWNLOAD_CLI_AND_CLEAN) {
            return new self_cleaning_download_provider_1.SelfCleaningDownloadProvider(new flyway_cli_downloader_1.DirectFlywayCliDownloader());
        }
        else if (strategy == types_1.FlywayCliStrategy.DOWNLOAD_CLI_ONLY) {
            return new download_provider_1.DownloadProvider(flywayCliDirectory, new flyway_cli_downloader_1.DirectFlywayCliDownloader());
        }
        else {
            console.error("Falling back to default provider. This shouldn't happen...");
            return FlywayCliProviderFactory.createFileSystemProviderWithDownloadFallback(flywayCliDirectory);
        }
    }
    static createFileSystemProviderWithDownloadFallback(cliDirectory) {
        const fileSystemProvider = new file_system_provider_1.FileSystemFlywayCliProvider(cliDirectory);
        const downloadProvider = new download_provider_1.DownloadProvider(cliDirectory, new flyway_cli_downloader_1.DirectFlywayCliDownloader());
        return fileSystemProvider.chain(downloadProvider);
    }
}
exports.FlywayCliProviderFactory = FlywayCliProviderFactory;
//# sourceMappingURL=flyway-cli-provider-factory.js.map