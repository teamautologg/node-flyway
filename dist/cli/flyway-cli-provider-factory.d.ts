import { FlywayCliStrategy } from "../types/types";
import { FlywayCliProvider } from "./flyway-cli-provider";
export declare class FlywayCliProviderFactory {
    static createFlywayCliProvider(strategy: FlywayCliStrategy, flywayCliDirectory: string): FlywayCliProvider;
    static createFileSystemProviderWithDownloadFallback(cliDirectory: string): FlywayCliProvider;
}
