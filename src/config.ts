export type InputConfig = {
    className?: string;
    errorClassName?: string;
};

export type Config = {
    input?: InputConfig;
};

const defaultConfig: Config = {
    input: {
        className: "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border border-gray-200 outline-primary placeholder-gray-400 text-gray-600 text-sm block w-full p-5 mb-2.5 rounded-xl",
        errorClassName: "border-red-400",
    },
};

const deepMerge = <T>(target: T, source: Partial<T>): T => {
    const result: T = { ...target };

    for (const key in source) {
        if (source.hasOwnProperty(key)) {
            const sourceValue = source[key];
            const targetValue = target[key];

            if (typeof sourceValue === 'object' && sourceValue !== null && typeof targetValue === 'object' && targetValue !== null) {
                result[key] = deepMerge(targetValue, sourceValue) as T[Extract<keyof T, string>];
            } else {
                result[key] = sourceValue as T[Extract<keyof T, string>];
            }
        }
    }

    return result;
};

export const useConfig = (): Config => {
    let userConfig: Partial<Config> = {};

    try {
        const loadedConfig = require('../../webnotion.config.ts');

        if (loadedConfig && loadedConfig.config) {
            userConfig = loadedConfig.config;
        }
    } catch (error) {
        // Using default config in case customized is not defined
    }

    return deepMerge(defaultConfig, userConfig);
};
