import Search from "./../search/search";
import Select from "./../select/select";

import "./searchBar.scss";

const SearchBar = (props) => {
    // Use it like this:

    // const listRef = useRef(); // ref wskazuje na kontener w którym są bezpośrednio filtrowane elementy

    // <SearchBar listRef={listRef} filter={filter} setFilter={setFilter} />;

    const filterList = (e) => {
        if (props.setFilter) {
            props.setFilter(e);
        }

        let childrenList = props?.listRef?.current?.children;

        let filter;
        if (e.value != 0) {
            filter = e.value;
        } else {
            filter = "";
        }
        if (childrenList) {
            for (let i = 0; i < childrenList.length; i++) {
                let a = childrenList[i].dataset.filter;

                if (a?.toUpperCase().indexOf(filter?.toUpperCase()) > -1) {
                    childrenList[i].style.display = "";
                } else {
                    childrenList[i].style.display = "none";
                }
            }
        }
    };

    return (
        <>
            <div className="searchBar">
                <Search
                    filterIn={props.listRef}
                    filterBy={props.filter}
                    id={"searchWallet"}
                    name={"searchWallet"}
                    placeholder={"Wyszukaj..."}
                />
                <p>{"lub filtruj po"}</p>
                <div className="filterBy">
                    <Select
                        options={[
                            {
                                value: 0,
                                name: "Wszystkie",
                            },
                            {
                                value: "fruits",
                                name: "Owoce",
                            },
                            {
                                value: "vegetables",
                                name: "Warzywa",
                            },
                        ]}
                        activeElement={props.filter}
                        onChangeActiveElement={(e) => filterList(e)}
                    />
                </div>
            </div>
        </>
    );
};

export default SearchBar;
