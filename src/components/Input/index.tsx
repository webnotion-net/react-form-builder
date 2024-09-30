import {ReactElement, ReactNode, useEffect, useState} from "react";
import {Validator, Violation, Violations} from "@webnotion-net/typescript-model-validator";
import {useFormContext} from "../../context/FormContext";
import {useConfig} from "../../useConfig";

type Props = {
    propertyName: string,
    placeholder: string,
    type: string,
    label?: string,
    icon?: ReactNode,
    className?: ReactNode,
};

const Input = ({propertyName, placeholder, type, label, icon, className}: Props): ReactElement => {
    const config = useConfig();
    const {data, setData, violations, setViolations} = useFormContext();
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
            data[propertyName],
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
            <div className="relative">
                {
                    icon && (
                        <div className="h-full absolute left-5 text-xl flex items-center text-gray-400">
                            {icon}
                        </div>
                    )
                }
                <input
                    type={type}
                    placeholder={placeholder}
                    className={`${className ?? config.input?.className} ${inputViolations.isEmpty() ? '' : config.input?.errorClassName}`}
                    onBlur={onInputOut}
                    onChange={onInputChange}
                    value={data ? data[propertyName] || '' : ''}
                />
            </div>
            {inputViolations.violations.map((violation: Violation, index: number) => (
                <p className="text-red-400 text-sm -mt-1 mb-5" key={index}>
                    {violation.message}
                </p>
            ))}
        </div>
    );
};

export default Input;
