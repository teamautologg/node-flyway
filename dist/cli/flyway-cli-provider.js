"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlywayCliProvider = void 0;
const logger_1 = require("../utility/logger");
class FlywayCliProvider {
    chain(provider) {
        return {
            getFlywayCli: async (flywayVersion) => {
                let cli;
                try {
                    cli = await this.getFlywayCli(flywayVersion);
                }
                catch (err) {
                    FlywayCliProvider.logger.log(`${this.constructor.name}.getFlywayCli() threw exception: ${err.stack}\n This was swallowed as there were other CLI providers next in the chain.`);
                    return provider.getFlywayCli(flywayVersion);
                }
                return cli != null ? cli : provider.getFlywayCli(flywayVersion);
            },
            chain: this.chain
        };
    }
}
exports.FlywayCliProvider = FlywayCliProvider;
FlywayCliProvider.logger = (0, logger_1.getLogger)("FlywayCliProvider");
//# sourceMappingURL=flyway-cli-provider.js.map