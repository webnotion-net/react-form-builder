import {ReactElement, ReactNode, useState} from "react";
import Input from "../Input";

type Props = {
    propertyName: string,
    placeholder: string,
    icon?: ReactNode,
    className: string,
    invalidInputClassName: string,
};

const PasswordInput = (
    {
        propertyName,
        placeholder,
        icon,
        className,
        invalidInputClassName,
    }: Props
): ReactElement => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
        <div className="relative">
            <Input
                propertyName={propertyName}
                placeholder={placeholder}
                type={passwordVisible ? 'text' : 'password'}
                icon={icon}
                className={className}
                invalidInputClassName={invalidInputClassName}
            />
            <div
                className="absolute top-5 right-5 text-2xl flex items-center text-gray-400 cursor-pointer z-50"
                onClick={() => setPasswordVisible(!passwordVisible)}
            >
                <div className="lni lni-eye"/>
                {
                    !passwordVisible && (
                        <div className="absolute w-8 h-8 border-t-2 border-gray-400 rotate-45 -ml-3.5 mt-5"></div>
                    )
                }
            </div>
        </div>
    )
}

export default PasswordInput;