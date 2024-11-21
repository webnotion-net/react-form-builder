import {ReactElement, ReactNode, useState} from "react";
import Input from "../Input";
import {useFormContext} from "../../context/FormContext";

type Props = {
    propertyName: string,
    placeholder: string,
    showPasswordIcon: ReactNode,
    hidePasswordIcon: ReactNode,
    icon?: ReactNode,
};

const PasswordInput = (
    {
        propertyName,
        placeholder,
        showPasswordIcon,
        hidePasswordIcon,
        icon,
    }: Props
): ReactElement => {
    const {config} = useFormContext();
    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
        <div style={{position: "relative"}}>
            <Input
                propertyName={propertyName}
                placeholder={placeholder}
                type={passwordVisible ? 'text' : 'password'}
                icon={icon}
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