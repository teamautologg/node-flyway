import { FlywayVersion } from "../../../internal/flyway-version";
export interface FlywayCliDownloader {
    downloadFlywayCli(flywayVersion: FlywayVersion, saveDirectory: string): Promise<string>;
}
export declare class DirectFlywayCliDownloader implements FlywayCliDownloader {
    private logger;
    downloadFlywayCli(flywayVersion: FlywayVersion, saveDirectory: string): Promise<string>;
    private download;
}
declare type OperatingSystem = "macosx" | "linux" | "windows";
export declare class FlywayCliUrlBuilder {
    static getUrlRepresentationOfHostOperatingSystem(): OperatingSystem;
    static buildUrl(flywayVersion: FlywayVersion, operatingSystem: OperatingSystem): {
        url: string;
        fileName: string;
    };
    private static buildFilename;
}
/**
 * Downloads CLI via Maven.
 */
export declare class MavenFlywayCliDownloader implements FlywayCliDownloader {
    downloadFlywayCli(flywayVersion: FlywayVersion, saveDirectory: string): Promise<string>;
}
export {};
