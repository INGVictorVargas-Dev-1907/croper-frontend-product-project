import { SET_SEARCH_FILTER, SET_CATEGORY_FILTER, SET_PAGE } from '../actionTypes';

const initialState = {
    search: '',
    category: '',
    page: 1,
    limit: 10
};

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCH_FILTER:
        return {
            ...state,
            search: action.payload,
            page: 1
        };

        case SET_CATEGORY_FILTER:
        return {
            ...state,
            category: action.payload,
            page: 1
        };

        case SET_PAGE:
        return {
            ...state,
            page: action.payload
        };

        default:
        return state;
    }
};

export default filterReducer;