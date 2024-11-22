import {ReactElement, ReactNode, useState} from "react";
import Input from "../Input";
import {WebnotionFormConfig} from "../../config/WebnotionFormConfig";

type Props = {
    propertyName: string,
    placeholder: string,
    showPasswordIcon: ReactNode,
    hidePasswordIcon: ReactNode,
    icon?: ReactNode,
    config?: WebnotionFormConfig,
};

const PasswordInput = (
    {
        propertyName,
        placeholder,
        showPasswordIcon,
        hidePasswordIcon,
        icon,
        config,
    }: Props
): ReactElement => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
        <div style={{position: "relative"}}>
            <Input
                propertyName={propertyName}
                placeholder={placeholder}
                type={passwordVisible ? 'text' : 'password'}
                icon={icon}
                config={config}
            />
            <div
                className={config?.passwordIconContainerClassName}
                onClick={() => setPasswordVisible(!passwordVisible)}
            >
                {
                    passwordVisible ? hidePasswordIcon : showPasswordIcon
                }
            </div>
        </div>
    )
}

export default PasswordInput;