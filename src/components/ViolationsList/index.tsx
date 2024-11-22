import {ReactElement} from "react";
import {Violation, Violations} from "@webnotion-net/typescript-model-validator";
import {WebnotionFormConfig} from "../../config/WebnotionFormConfig";

type Props = {
    violations: Violations,
    config?: WebnotionFormConfig,
};

const ViolationsList = (
    {
        violations,
        config,
    }: Props
): ReactElement => {
    return (
        <>
            {
                !violations.isEmpty() &&
                <ul className={config?.violationsListClassName}>
                    {
                        config?.renderFirstViolationOnly
                        ?
                        <li className={config?.violationsItemClassName}>
                            {violations.violations[0].message}
                        </li>
                        :
                        violations.violations.map((violation: Violation, index: number) => (
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

export default ViolationsList;
