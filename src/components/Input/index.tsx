import {ReactElement, ReactNode, useEffect, useState} from "react";
import {Validator, Violation, Violations} from "@webnotion-net/typescript-model-validator";
import {useFormContext} from "../../context/FormContext";

type Props = {
    propertyName: string,
    placeholder: string,
    type: string,
    label?: string,
    icon?: ReactNode,
};

const Input = (
    {
        propertyName,
        placeholder,
        type,
        label,
        icon,
    }: Props
): ReactElement => {
    const {data, setData, violations, setViolations, config} = useFormContext();
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
            {
                !inputViolations.isEmpty() &&
                <ul className={config?.violationsListClassName}>
                    {config?.renderFirstViolationOnly
                        ?
                        <li className={config?.violationsItemClassName}>
                            {inputViolations.violations[0].message}
                        </li>
                        :
                        inputViolations.violations.map((violation: Violation, index: number) => (
                            <li className={config?.violationsItemClassName} key={index}>
                                {violation.message}
                            </li>
                        ))
                    }
                </ul>
            }

        </>
    );
};

export default Input;
