import { FlywayVersion } from "../../internal/flyway-version";
import { FlywayCli } from "../flyway-cli";
import { FlywayCliProvider } from "../flyway-cli-provider";
import { FlywayCliDownloader } from "./downloader/flyway-cli-downloader";
export declare class SelfCleaningDownloadProvider extends FlywayCliProvider {
    private downloader;
    private temp;
    constructor(downloader: FlywayCliDownloader);
    getFlywayCli(flywayVersion: FlywayVersion): Promise<FlywayCli | undefined>;
}
