import React, { useState } from "react";
import "./customArray.scss";

const CustomArray = React.forwardRef((props, ref) => {
    return (
        <div className="customArray" ref={ref}>
            {props.children}
        </div>
    );
});
const CustomArrayHeader = (props) => {
    return <div className="customArrayHeader">{props.children}</div>;
};
const CustomArrayBody = React.forwardRef((props, ref) => {
    return (
        <div className="customArrayBody" ref={ref}>
            {props.children}
        </div>
    );
});

const CustomArrayRow = (props) => {
    return (
        <div
            className={"customArrayRow"}
            data-search={props.item ? Object.values(props.item) : ""}
            data-filter={props?.item?.category}
        >
            {props.children}
        </div>
    );
};
const CustomArrayColumn = React.forwardRef((props, ref) => {
    const [columnOrder, setColumnOrder] = useState(props.index);

    const handleChangeColumnOrder = (direction, maxLength) => {
        if (direction === "remove") {
            if (columnOrder >= 0) {
                setColumnOrder(columnOrder - 1);
            }
        } else {
            if (maxLength < columnOrder) {
                setColumnOrder(columnOrder + 1);
            }
        }
    };
    const handleSetStickyPosition = (e) => {
        e.currentTarget.classList.toggle("stickMe");
    };

    const handleHideColumn = (e) => {
        e.currentTarget.classList.toggle("fav4-eye-slash");
        e.currentTarget.classList.toggle("fav4-eye");
        let childrenList = props?.bodyRef?.current?.children;
        let filter;

        filter = props.children;

        if (childrenList) {
            for (let i = 0; i < childrenList.length; i++) {
                let a = childrenList[i].childNodes;

                for (let j = 0; j < a.length; j++) {
                    const columnData = a[j].dataset.column;

                    if (columnData?.toUpperCase() === filter?.toUpperCase()) {
                        // a[j].style.display = "none";
                        a[j].classList.toggle("hiden");
                    }
                }
            }
        }
    };

    return (
        <div
            className={"customArrayColumn"}
            data-column={props?.type}
            style={{ order: columnOrder }}
        >
            <div className="columnContent">{props.children}</div>
            {props.showSettings ? (
                <div className="columnSettings">
                    {props.hideColumn ? (
                        <span
                            className="fas fav4-eye-slash"
                            onClick={(e) => handleHideColumn(e)}
                        ></span>
                    ) : (
                        ""
                    )}

                    {props.changePosition ? (
                        <div className="changePositon">
                            <span
                                className="fas fav4-caret-left"
                                onClick={() =>
                                    handleChangeColumnOrder("remove")
                                }
                            ></span>
                            <span
                                className="fas fav4-caret-right"
                                onClick={(e) => handleChangeColumnOrder("add")}
                            ></span>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            ) : (
                ""
            )}
        </div>
    );
});

const handleGenerateNewColumn = (
    data,
    columName,
    columnsContent,
    setArrayHeader,
    setArrayBody,
    arrayRef
) => {
    let tableData = data;
    const result = tableData.map((item, index) => {
        const o = item;

        o[columName ?? "New"] =
            columnsContent && columnsContent.length
                ? columnsContent[index]
                : "nic";

        return o;
    });
    handleGenerateArrayHeader(result, setArrayHeader, arrayRef);
    handleGenerateArrayBody(result, setArrayBody);
};

const handleGenerateArrayBody = (data, setArrayBody, maxLength) => {
    if (data && data.length > 0) {
        const domRowElements = data.map((item, index) => {
            const domColumnsElements = Object.values(item).map(
                (item2, index2) => {
                    const columnType = Object.keys(item);
                    if (maxLength) {
                        if (index2 < maxLength) {
                            return (
                                <CustomArrayColumn
                                    item={item2}
                                    index={index2}
                                    key={index2}
                                    type={columnType[index2]}
                                >
                                    {item2}
                                </CustomArrayColumn>
                            );
                        }
                    } else {
                        return (
                            <CustomArrayColumn
                                item={item2}
                                index={index2}
                                key={index2}
                                type={columnType[index2]}
                            >
                                {item2}
                            </CustomArrayColumn>
                        );
                    }
                }
            );

            return (
                <CustomArrayRow key={index} item={item}>
                    {domColumnsElements}
                </CustomArrayRow>
            );
        });

        if (domRowElements) {
            setArrayBody(domRowElements);
        }
    }
};

const handleGenerateArrayHeader = (
    data,
    setArrayHeader,
    arrayRef,
    maxLength
) => {
    let headerData = Object.keys(data[0]);
    if (headerData && headerData.length > 0) {
        const domElements = headerData.map((item, index) => {
            if (maxLength) {
                if (index < maxLength) {
                    return (
                        <CustomArrayColumn
                            item={item}
                            index={index}
                            key={index}
                            hideColumn={true}
                            changePosition={true}
                            showSettings={true}
                            bodyRef={arrayRef}
                        >
                            {item}
                        </CustomArrayColumn>
                    );
                }
            } else {
                return (
                    <CustomArrayColumn
                        item={item}
                        index={index}
                        key={index}
                        hideColumn={true}
                        changePosition={true}
                        showSettings={true}
                        bodyRef={arrayRef}
                    >
                        {item}
                    </CustomArrayColumn>
                );
            }
        });

        if (domElements) {
            setArrayHeader(<CustomArrayRow>{domElements}</CustomArrayRow>);
        }
    }
};

export default CustomArray;

export {
    CustomArrayRow,
    CustomArrayColumn,
    CustomArrayHeader,
    CustomArrayBody,
    handleGenerateArrayHeader,
    handleGenerateArrayBody,
    handleGenerateNewColumn,
};
