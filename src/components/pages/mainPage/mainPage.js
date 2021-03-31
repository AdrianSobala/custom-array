import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import getRoute from "../../../routing/routingService";

import "./mainPage.scss";

import SearchBar from "./../../ui//searchBar/searchBar";

import CustomArray, {
    CustomArrayHeader,
    CustomArrayBody,
    CustomArrayRow,
    CustomArrayColumn,
} from "../../ui/customArray/customArray";

// -   Dynamiczne dodawanie wierszy
// -   Dynamiczne dodawanie kolumn
// -   Sortowanie po kolumnach (uwzględnić typ string, number i date w formacie ISO)
// -   Dynamiczna paginacja z symulowanym asynchronicznym pobieraniem danych
// -   Dynamiczna zmiana kolejności kolumn (możliwie najprostsze rozwiązanie)
// -   Ukrywanie kolumn
// -   Zasilanie tabeli danymi ze zmockowanego API o dowolnej postaci
// -   Możliwość oznaczania wybranych kolumn jako sticky

const MainPage = () => {
    const exampleData = [
        {
            id: 1,
            category: "fruits",
            name: "apple",
            unit: "kg",
            amount: 10,
            desc: "Antonówka",
        },
        {
            id: 2,
            category: "vegetables",
            name: "carrot",
            unit: "kg",
            amount: 3,
            desc: "Odmiana Galicja",
        },
        {
            id: 3,
            category: "fruits",
            name: "pineapple",
            unit: "szt",
            amount: 1,
            desc: "",
        },
        {
            id: 4,
            category: "fruits",
            name: "pear",
            unit: "kg",
            amount: 1,
            desc: "Faworytka",
        },
        {
            id: 5,
            category: "vegetables",
            name: "potatoes",
            unit: "kg",
            amount: 32.1,
            desc: "Michalina",
        },
        {
            id: 6,
            category: "fruits",
            name: "tomatoes",
            unit: "kg",
            amount: 4,
            desc: "",
        },
        {
            id: 7,
            category: "vegetables",
            name: "cucumber",
            unit: "kg",
            amount: 2.5,
            desc: "",
        },
        {
            id: 8,
            category: "fruits",
            name: "kiwi",
            unit: "szt",
            amount: 20,
            desc: "",
        },
        {
            id: 9,
            category: "fruits",
            name: "orange",
            unit: "kg",
            amount: 3.14,
            desc: "",
        },
    ];

    const [mockupData, setMockupData] = useState(exampleData);
    const [arrayLoader, setArrayLoader] = useState(null);

    const [arratHeader, setArrayHeader] = useState();
    const [arrayBody, setArrayBody] = useState();
    const [filter, setFilter] = useState({
        value: 0,
        name: "Wszystkie",
    });

    const arrayRef = useRef();

    const handleGenerateArrayHeader = (data, maxLength) => {
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

    const handleGenerateArrayBody = (data, maxLength) => {
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

    const handleGetApiData = (cancelToken) => {
        handleGenerateArrayHeader(exampleData);
        handleGenerateArrayBody(exampleData);
        // axios({
        //     method: "GET",
        //     url: getRoute("api") + "/people/",
        //     withCredentials: false,
        //     cancelToken: cancelToken,
        // })
        //     .then(function (response) {
        //         setMockupData(response.data.results);
        //         handleGenerateArrayHeader(response.data.results, 8);
        //         handleGenerateArrayBody(response.data.results, 8);
        //     })
        //     .catch(function (error) {
        //         console.log(error.response);
        //     });
    };

    const handleAddNewRow = (data) => {
        let tableData = data;
        let newItem = {};
        for (const key of Object.keys(tableData[0])) {
            newItem[key] = "empty";
        }
        tableData.unshift(newItem);
        handleGenerateArrayBody(tableData);
    };

    const handleAddNewColumn = (data) => {
        let tableData = data;

        var result = tableData.map(function (el) {
            var o = Object.assign({}, el);
            o.isActive = true;
            return o;
        });
        handleGenerateArrayHeader(result);
        handleGenerateArrayBody(result);
    };

    useEffect(() => {
        handleGetApiData();
    }, []);

    return (
        <>
            <div className="mainPage">
                <h3>Custom Array</h3>

                <div className="bar">
                    <button
                        className="customButton"
                        onClick={() => handleAddNewRow(mockupData)}
                    >
                        Dodaj nowy wiersz
                    </button>
                    <button
                        className="customButton"
                        onClick={() => handleAddNewColumn(mockupData)}
                    >
                        Dodaj nową kolumnę
                    </button>
                    <SearchBar
                        listRef={arrayRef}
                        filter={filter}
                        setFilter={setFilter}
                    />
                </div>

                <CustomArray>
                    <CustomArrayHeader>{arratHeader}</CustomArrayHeader>
                    <CustomArrayBody ref={arrayRef}>
                        {arrayBody}
                    </CustomArrayBody>
                </CustomArray>
            </div>
        </>
    );
};

export default MainPage;
