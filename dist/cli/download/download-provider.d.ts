import { FlywayVersion } from "../../internal/flyway-version";
import { FlywayCliProvider } from "../flyway-cli-provider";
import { FlywayCli } from "../flyway-cli";
import { FlywayCliDownloader } from "./downloader/flyway-cli-downloader";
export declare class DownloadProvider extends FlywayCliProvider {
    private saveDirectory;
    private flywayCliDownloader;
    protected static logger: import("../../utility/logger").Logger;
    constructor(saveDirectory: string, flywayCliDownloader: FlywayCliDownloader);
    getFlywayCli(flywayVersion: FlywayVersion): Promise<FlywayCli>;
    private getExtractLocationFromDecompressedFiles;
    private decompressFiles;
}
