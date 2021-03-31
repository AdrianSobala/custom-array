import "./search.scss";
import Input from "../input/input";

// <Search
//     filterIn={props.listRef} // Ref wskazuje bezpośredniego rodzica filtrowanych elementów
//     filterBy={props.filter} // objekty z value i name po których będzie filtrować data-filter
//     id={"searchWallet"}
//     name={"searchWallet"}
//     placeholder={i18next.t("Wyszukaj...")} // Placeholder wyświetlany w inpucie
// />

// Dodać do bezpośredniego potomka
// data-search={`${props.name},${props.shortName}`}  -- dane po których będzie wyszukiwanie z inputa searchContainer (STRING)
// data-filter={props.type} -- dodatkowe filtrowanie po -- selectedElement (object {value:0,name: filterBy})
//
const Search = (props) => {
    const onChangeSearch = (e, value) => {
        let childrenList = props.filterIn.current?.children;
        let filterBy = props?.filterBy;
        if (filterBy && childrenList) {
            for (let i = 0; i < childrenList.length; i++) {
                let a = childrenList[i].dataset;
                if (filterBy && filterBy.value != 0) {
                    if (
                        a.search?.toUpperCase().indexOf(value?.toUpperCase()) >
                            -1 &&
                        filterBy.value === a.filter.toUpperCase()
                    ) {
                        childrenList[i].style.display = "";
                    } else {
                        childrenList[i].style.display = "none";
                    }
                } else {
                    if (
                        a.search?.toUpperCase().indexOf(value.toUpperCase()) >
                        -1
                    ) {
                        childrenList[i].style.display = "";
                    } else {
                        childrenList[i].style.display = "none";
                    }
                }
            }
        }
    };

    return (
        <div className="searchContainer">
            <Input
                id={props.id}
                name={props.id}
                placeholder={props.placeholder ?? "Wyszukaj..."}
                onChange={onChangeSearch}
            />
        </div>
    );
};

export default Search;
