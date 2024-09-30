import {FormsConfig} from "./config";

let userConfig: FormsConfig | undefined;

const loadConfigFromFile = (filePath: string): void => {
    try {
        const loadedConfig = require(filePath);
        if (loadedConfig && loadedConfig.config) {
            userConfig = loadedConfig.config;
        } else {
            throw new Error("Invalid config file structure. Ensure you export 'config'.");
        }
    } catch (error) {
        console.log(error);
    }
};

loadConfigFromFile("../../../../webnotion.config.ts");

export const useConfig = (): FormsConfig => {
    if (!userConfig) {
        throw new Error("Configuration is required. Ensure you have a webnotion.config.ts file in your project.");
    }

    return userConfig;
};
