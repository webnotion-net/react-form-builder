import { ReactElement, useEffect, useState } from "react";
import { Validator, Violation, Violations } from "@webnotion-net/typescript-model-validator";
import {useFormContext} from "../../context/FormContext";

type Props = {
    propertyName: string,
    label?: string,
    placeholder: string,
    type: string,
};

const Input = ({ propertyName, label, placeholder, type }: Props): ReactElement => {
    const { data, setData, violations, setViolations } = useFormContext();
    const [inputViolations, setInputViolations] = useState(new Violations([]));

    useEffect(() => {
        setInputViolations(new Violations(violations?.violations?.filter(violation => violation.propertyName === propertyName)));
    }, [violations, propertyName]);

    const onInputOut = () => {
        if (!data || !data.getConstraints || !data.getConstraints()[propertyName]) {
            return;
        }

        const newViolations = new Validator().validateProperty(
            propertyName,
            data[propertyName],  // Access property directly
            data.getConstraints()[propertyName]
        );

        const oldViolations = violations?.violations?.filter(violation => violation.propertyName !== propertyName);
        setViolations(new Violations([...oldViolations, ...newViolations.violations]));
    };

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const clonedModel = Object.create(Object.getPrototypeOf(data), Object.getOwnPropertyDescriptors(data));
        clonedModel[propertyName] = event.target.value;
        setData(clonedModel);
    };

    return (
        <div className="pb-3">
            {label && <label htmlFor={propertyName}>{label}</label>}
            <input
                type={type}
                placeholder={placeholder}
                className={`${
                    inputViolations.violations.length === 0 ? 'border-transparent' : 'animate-shake border-red-400'
                } border w-full rounded-lg mb-2.5 px-3.5 py-4 text-sm bg-dark-800 text-dark-300 placeholder-dark-500`}
                onBlur={onInputOut}
                onChange={onInputChange}
                value={data ? data[propertyName] || '' : ''}  // Ensure data is valid before accessing
            />
            {inputViolations.violations.map((violation: Violation, index: number) => (
                <p className="text-red-400 text-sm -mt-2 mb-5" key={index}>
                    {violation.message}
                </p>
            ))}
        </div>
    );
};

export default Input;
