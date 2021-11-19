import generate from "../helpers/data";
const initialState = {
    appliedFilters: []
};

const SORT_BY_ALPHABET = "SORT_BY_ALPHABET";
const LOAD_DATA = "LOAD_DATA";
const FILTER_BY_VALUE = "FILTER_BY_VALUE";
const SORT_BY_OPENCLOSE = "SORT_BY_OPENCLOSE";


export const filterByValue = payload => ({
    type: FILTER_BY_VALUE,
    payload
});

export const sortByAlphabet = payload => ({
    type: SORT_BY_ALPHABET,
    payload
});

export const sortByOpenClose = payload => ({
    type: SORT_BY_OPENCLOSE,
    payload
});

export const loadData = (payload) => ({
    type: LOAD_DATA,
    payload
});


const filterStore = (state = initialState, action) => {
    switch (action.type) {
        case SORT_BY_ALPHABET:
            const sortByAlphabetState = Object.assign({}, state);
            let sortedAlphabetArr = action.payload.direction === "asc" ?
                sortAsc(state.filteredProducts, 'category') :
                sortDesc(state.filteredProducts, 'category');

            sortByAlphabetState.filteredProducts = sortedAlphabetArr;

            return sortByAlphabetState;
        case SORT_BY_OPENCLOSE: 
            let newStateOpenClose = Object.assign({}, state);
            let valueOf = action.payload.value;
            let filteredValue = state.products.filter(product => {
                return (product.openClose === valueOf);
            });

            let appliedFilter = state.appliedFilters;

            if (valueOf) {
                appliedFilter = addFilterIfNotExists(SORT_BY_OPENCLOSE, appliedFilter);

                newStateOpenClose.filteredProducts = filteredValue;

            } else {
                appliedFilter = removeFilter(SORT_BY_OPENCLOSE, appliedFilter);

                if (appliedFilter.length === 0) {
                    newStateOpenClose.filteredProducts = newStateOpenClose.products;

                }
            }
            return newStateOpenClose;    
        case FILTER_BY_VALUE:
            let newState = Object.assign({}, state);
            let value = action.payload.value;
            let filteredValues = state.products.filter(product => {
                return product.category.toLowerCase().includes(value) ||
                    product.shoppingWindow.toLowerCase().includes(value);
            });

            let appliedFilters = state.appliedFilters;

            if (value) {
                appliedFilters = addFilterIfNotExists(FILTER_BY_VALUE, appliedFilters);

                newState.filteredProducts = filteredValues;

            } else {
                appliedFilters = removeFilter(FILTER_BY_VALUE, appliedFilters);

                if (appliedFilters.length === 0) {
                    newState.filteredProducts = newState.products;
                }
            }
            return newState;
        case LOAD_DATA:
            let products = generate();
            return {
                ...state,
                products,
                filteredProducts: products,

            };
        default:
            return state;

    }
};

export default filterStore;

function sortAsc(arr, field) {
    return arr.sort(function (a, b) {
        if (a[field] > b[field]) return 1;

        if (b[field]> a[field]) return -1;

        return 0;
    })
}

function sortDesc(arr, field) {
    return arr.sort(function (a, b) {
        if (a[field] > b[field]) return -1;

        if (b[field]> a[field]) return 1;

        return 0;
    })
}

function addFilterIfNotExists(filter, appliedFilters) {
    let index = appliedFilters.indexOf(filter);
    if (index===-1) appliedFilters.push(filter);

    return appliedFilters;
}

function removeFilter(filter, appliedFilters) {
    let index = appliedFilters.indexOf(filter);
    appliedFilters.splice(index, 1);
    return appliedFilters;
}
