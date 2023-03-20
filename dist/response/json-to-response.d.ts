import { FlywayBaselineResponse, FlywayCleanResponse, FlywayInfoResponse, FlywayMigrateResponse, FlywayRepairResponse, FlywayResponse, FlywayValidateResponse, ParsedFlywayResponse } from "./responses";
export declare class ConvertJsonToResponse {
    private static readonly logger;
    static toFlywayResponse<T extends FlywayResponse>(json: string, reference: string, properties: any): ParsedFlywayResponse<T>;
    static toFlywayMigrateResponse(json: string): ParsedFlywayResponse<FlywayMigrateResponse>;
    static toFlywayCleanResponse(json: string): ParsedFlywayResponse<FlywayCleanResponse>;
    static toFlywayInfoResponse(json: string): ParsedFlywayResponse<FlywayInfoResponse>;
    static toFlywayValidateResponse(json: string): ParsedFlywayResponse<FlywayValidateResponse>;
    static toFlywayBaselineResponse(json: string): ParsedFlywayResponse<FlywayBaselineResponse>;
    static toFlywayRepairResponse(json: string): ParsedFlywayResponse<FlywayRepairResponse>;
    private static handleParsingError;
}
