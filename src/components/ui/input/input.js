import React, { useRef, useState } from "react";
import "./input.scss";

const Input = (props) => {
    const inputRef = useRef(null);

    const [isActive, setActive] = useState(false);

    const renderHidden = () => {
        if (props.hidden) {
            return <div className={"hiddenBox"}>{props.hidden}</div>;
        } else {
            return null;
        }
    };

    const renderAfterLabel = () => {
        if (props.afterLabel) {
            return props.afterLabel;
        }
    };

    const renderError = () => {
        if (props?.error) {
            return <div className={"inputError"}>{props?.error}</div>;
        } else {
            return null;
        }
    };

    const renderHelpTooltip = () => {
        if (props.helpTooltip) {
            return (
                <div className={"helpTooltip"}>
                    <span className="material-icons">help</span>
                    <div className={"helpTooltipText"}>{props.helpTooltip}</div>
                </div>
            );
        }
    };

    const handleFocus = () => {
        setActive(true);
        if (typeof props.onFocus === "function") {
            props.onFocus();
        }
    };

    const handleBlur = () => {
        setActive(false);
        if (typeof props.onFocus === "function") {
            props.onBlur();
        }
    };

    const handleChange = (e) => {
        if (props.numeric) {
            let val = e.target.value.replaceAll(",", ".");
            val = val.replaceAll(" ", "");
            if (!isNaN(val)) {
                props.onChange(props.id, val);
            }
        } else {
            props.onChange(props.id, e.target.value);
        }
    };

    return (
        <div
            className={`kInput 
        ${props.className ?? ""} 
        ${props?.error ? "error" : ""}
        ${props?.type === "hidden" ? "hidden" : ""}
        ${isActive ? "active" : ""}
        ${props?.value === "" && props.numeric ? "invalid" : ""}
        `}
        >
            {props.label ? (
                <label htmlFor={props.id}>
                    {props.label}:{" "}
                    {props.required ? (
                        <div className={"isRequired"}>
                            <span className="material-icons">error</span>
                            <div className={"isRequiredText"}>wymagane</div>
                        </div>
                    ) : null}
                    {renderHelpTooltip()}
                </label>
            ) : null}
            {renderAfterLabel()}
            <div className={"kInputInside"}>
                <input
                    id={props.id}
                    name={props.id}
                    type={props.type ?? "text"}
                    ref={inputRef}
                    className={`
                            ${props.children ? "hasChildren" : ""} 
                            ${props.fontSize ?? ""} 
                            ${
                                props.fontWeight
                                    ? "weight" + props.fontWeight
                                    : ""
                            }
                            ${props?.copy ? "copy" : ""}
                            ${props?.copyOnClick ? "copyOnClick" : ""}
                            ${props?.hidden ? "hidden" : ""}
                            `}
                    value={props.value}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder={props?.placeholder}
                    required={props?.required}
                    disabled={props?.disabled}
                />
                {props.children}

                {renderHidden()}
            </div>
        </div>
    );
};

export default Input;
