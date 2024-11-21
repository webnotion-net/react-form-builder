import { createContext, useContext } from 'react';
import { ValidatableModelInterface, Violations } from "@webnotion-net/typescript-model-validator";
import {FormConfig} from "../components/Form";

interface FormContextType<T extends ValidatableModelInterface> {
    data: T;
    setData: (data: T) => void;
    violations: Violations;
    setViolations: (violations: Violations) => void;
    config?: FormConfig;
}
const FormContext = createContext<FormContextType<any> | null>(null);

export const useFormContext = () => {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error("useFormContext must be used within a FormProvider");
    }
    return context;
};

export default FormContext;
