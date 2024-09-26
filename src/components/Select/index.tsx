import React, {ReactElement, useEffect, useState} from "react";
import {ValidatableModelInterface, Validator, Violation, Violations} from "@webnotion-net/typescript-model-validator";

type Props = {
    propertyName: string,
    label: string,
    placeholder: string,
    violations: Violations,
    setViolations: any,
    data: ValidatableModelInterface,
    setData: any,
};

const Select = (
    {
        propertyName,
        label,
        placeholder,
        violations,
        setViolations,
        data,
        setData,
    }: Props
): ReactElement => {
    const [inputViolations, setInputViolations] = useState(new Violations());

    useEffect(() => {
        setInputViolations(new Violations(violations?.violations?.filter((violation) => violation.propertyName === propertyName)));
    }, [violations]);

    const onInputIn = () => {
    }

    const onInputOut = () => {
        if (!data?.getConstraints()[propertyName]) {
            return;
        }

        const newViolations = new Validator().validateProperty(
            propertyName,
            (data as any)[propertyName],
            data.getConstraints()[propertyName]
        );
        const oldViolations = violations.violations.filter((violation) => violation.propertyName !== propertyName);
        setViolations([...oldViolations, ...newViolations.violations]);
    }

    const onInputChange = (event: any) => {
        const clonedModel = Object.create(Object.getPrototypeOf(data), Object.getOwnPropertyDescriptors(data));
        clonedModel[propertyName] = event.target.value;

        setData(clonedModel);
    }

    return (
        <div className="pb-3">
            <label htmlFor="">{label}</label>
            <select
                className={`${inputViolations.isEmpty() ? 'border-transparent' : 'animate-shake border-red-400'} border w-full rounded-lg my-2 px-3.5 py-3 text-sm bg-dark-700 dark:bg-dark-800 dark:text-dark-300 dark:placeholder-dark-700`}
                onChange={
                    (event) => {
                        const clonedModel = Object.create(Object.getPrototypeOf(data), Object.getOwnPropertyDescriptors(data));
                        clonedModel['type'] = event.target.value;

                        setData(clonedModel);
                    }
                }
                onFocus={onInputIn}
                onBlur={onInputOut}
                // onChange={onInputChange}
                value={(data as any)[propertyName]}
            >
                <option value="" disabled={true}>{placeholder}</option>
                <option value="single-time">Single Time</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
            </select>
            {
                inputViolations.violations.map((violation: Violation, index: number) => {
                    return (
                        <p className="text-red-400 text-sm -mt-2 mb-5" key={index}>
                            {violation.message}
                        </p>
                    )
                })
            }
        </div>
    )
}

export default Select;