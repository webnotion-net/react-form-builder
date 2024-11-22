import {FormEvent, ReactNode, useState} from "react";
import {ValidatableModelInterface, Validator, Violation, Violations} from "@webnotion-net/typescript-model-validator";
import FormContext from "../../context/FormContext";

type Props<T extends ValidatableModelInterface> = {
    data: T,
    setData: (data: T) => void,
    onValidationSuccess: (data: T) => void,
    onValidationFailure: (data: T, violations: Violations) => void,
    children: ReactNode,
    onFormSubmitInitiated?: () => void,
    formError?: string,
    setFormError?: (error: string) => void,
}

const Form = <T extends ValidatableModelInterface>(
    {
        data,
        setData,
        onValidationSuccess,
        onValidationFailure,
        children,
        onFormSubmitInitiated,
    }: Props<T>
) => {
    const [violations, setViolations] = useState<Violations>(new Violations());

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (onFormSubmitInitiated) {
            onFormSubmitInitiated();
        }

        const validator = new Validator();
        const newViolations = validator.validate(data);

        if (newViolations.isEmpty()) {
            onValidationSuccess(data);
        } else {
            setViolations(newViolations);
            onValidationFailure(data, newViolations);
        }
    };

    return (
        <FormContext.Provider value={{data, setData, violations, setViolations}}>
            <form onSubmit={handleSubmit}>
                {children}
            </form>
        </FormContext.Provider>
    );
}

export default Form;
