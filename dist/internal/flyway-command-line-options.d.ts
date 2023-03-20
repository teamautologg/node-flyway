import { FlywayConfig } from "../types/types";
export declare class FlywayCommandLineOptions {
    private readonly options;
    constructor(options: FlywayCommandLineOption[]);
    static build(config: FlywayConfig): FlywayCommandLineOptions;
    getCommandLineOptions(): string[];
    convertToCommandLineString(): string;
}
interface FlywayCommandLineOption {
    convertToCommandLineString(): string;
}
export {};
