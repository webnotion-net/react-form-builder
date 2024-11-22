import {ReactElement, ReactNode, useEffect, useState} from "react";
import {Validator, Violation, Violations} from "@webnotion-net/typescript-model-validator";
import {useFormContext} from "../../context/FormContext";
import {WebnotionFormConfig} from "../../config/WebnotionFormConfig";
import ViolationsList from "../ViolationsList";

type Props = {
    propertyName: string,
    placeholder: string,
    type: string,
    label?: string,
    icon?: ReactNode,
    config?: WebnotionFormConfig,
};

const Input = (
    {
        propertyName,
        placeholder,
        type,
        label,
        icon,
        config,
    }: Props
): ReactElement => {
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
        <>
            {label && <label className={config?.labelClassName} htmlFor={propertyName}>{label}</label>}
            <div className={config?.inputAndIconContainerClassName}>
                {
                    icon && (
                        <div className={config?.iconClassName}>
                            {icon}
                        </div>
                    )
                }
                <input
                    type={type}
                    placeholder={placeholder}
                    className={`${config?.inputClassName} ${inputViolations.isEmpty() ? '' : config?.inputClassNameOnError}`}
                    onBlur={onInputOut}
                    onChange={onInputChange}
                    value={data ? data[propertyName] || '' : ''}
                />
            </div>
            <ViolationsList
                violations={inputViolations}
                config={config}
            />
        </>
    );
};

export default Input;
