import {FormEvent, ReactNode, useState} from "react";
import { ValidatableModelInterface, Violations, Validator } from "@webnotion-net/typescript-model-validator";
import FormContext from "../../context/FormContext";

type Props<T extends ValidatableModelInterface> = {
    data: T,
    setData: (data: T) => void,
    onSuccess: (data: T) => void,
    onFailure: (data: T, violations: Violations) => void,
    children: ReactNode,
    onSubmitInitiated?: () => void,
}

const Form = <T extends ValidatableModelInterface>({ data, setData, onSuccess, onFailure, children, onSubmitInitiated }: Props<T>) => {
    const [violations, setViolations] = useState<Violations>(new Violations());

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (onSubmitInitiated) {
            onSubmitInitiated();
        }

        const validator = new Validator();
        const newViolations = validator.validate(data);

        if (newViolations.isEmpty()) {
            onSuccess(data);
        } else {
            setViolations(newViolations);
            onFailure(data, newViolations);
        }
    };

    return (
        <FormContext.Provider value={{ data, setData, violations, setViolations }}>
            <form onSubmit={handleSubmit}>
                {children}
            </form>
        </FormContext.Provider>
    );
}

export default Form;
