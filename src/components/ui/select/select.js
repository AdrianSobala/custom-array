import React, { useEffect, useState } from "react";

import "./select.scss";
import OutsideClickHandler from "react-outside-click-handler";

const Select = (props) => {
    const [isActive, setActive] = useState(false);

    const handleOutsideClick = () => {
        setActive(false);
    };
    const handleSelectedElementClick = () => {
        setActive(!isActive);
        console.log("click fired");
    };
    const handleOptionClick = (selectedElement) => {
        setActive(false);
        if (props.cardOptions?.length > 0) {
            props.onChangeActiveElement(selectedElement);
        } else {
            props.onChangeActiveElement(selectedElement);
        }
    };

    useEffect(() => {
        if (
            props.activeElement === null ||
            typeof props.activeElement === "undefined"
        ) {
            handleOptionClick(props.options[0]);
        }
    }, []);

    useEffect(() => {
        console.log("isActive: ", isActive);
    }, [isActive]);
    const options =
        props.options?.map((item, key) => {
            return (
                <Option
                    key={key}
                    value={item.value}
                    onClick={() => handleOptionClick(item)}
                >
                    {item.name}
                </Option>
            );
        }) ??
        props.currencyOptions?.map((item, key) => {
            const value = item.currencyPair?.baseCurrency?.shortName;

            return (
                <Option
                    className={props.className}
                    key={key}
                    value={value}
                    data={item}
                    onClick={() => handleOptionClick(item)}
                />
            );
        }) ??
        props.cardOptions?.map((item, key) => {
            return (
                <Option
                    key={key}
                    cardData={item}
                    onClick={() => handleOptionClick(item)}
                />
            );
        });

    return (
        <div className={`kSelect`} id={props?.id}>
            <OutsideClickHandler
                disabled={!isActive}
                onOutsideClick={handleOutsideClick}
            >
                {props.label ? (
                    <div className="label">
                        {props.label}:
                        {props.required ? (
                            <div className={"isRequired"}>
                                <div className={"isRequiredText"}>wymagane</div>
                            </div>
                        ) : null}
                    </div>
                ) : (
                    ""
                )}
                <div
                    className={`selectedElement ${
                        props.inputSelect ? "inputSelect" : ""
                    }`}
                    onClick={handleSelectedElementClick}
                >
                    <div className={"selectedElementInside"}>
                        <div className={"selectedElementText"}>
                            <ActiveElement
                                activeElement={props?.activeElement ?? ""}
                            />
                        </div>
                    </div>
                </div>
                {isActive ? (
                    <div
                        className={`
                        optionsList 
                        ${props.optionsAlign ?? ""} 
                        ${props.className ?? ""}
                        `}
                    >
                        {options}
                    </div>
                ) : null}
            </OutsideClickHandler>
        </div>
    );
};

const ActiveElement = (props) => {
    if (typeof props.activeElement === "object") {
        if (typeof props.activeElement.shortName !== "undefined") {
            return (
                props.activeElement?.shortName ??
                props.activeElement?.name ??
                ""
            );
        } else {
            return props.activeElement?.name ?? "";
        }
    } else {
        return props.activeElement?.name ?? "";
    }
};

const Option = (props) => {
    if (typeof props.data === "undefined") {
        return (
            <div
                className={"kOption"}
                value={props.value}
                onClick={props.onClick}
            >
                {props.children}
            </div>
        );
    }
};

export default Select;
