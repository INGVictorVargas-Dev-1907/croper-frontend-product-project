import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAILURE,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAILURE,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE,
    SET_CURRENT_PRODUCT
} from '../actionTypes';

const initialState = {
    items: [],
    currentProduct: null,
    loading: false,
    error: null,
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
};

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS_REQUEST:
        case CREATE_PRODUCT_REQUEST:
        case UPDATE_PRODUCT_REQUEST:
        case DELETE_PRODUCT_REQUEST:
        return {
            ...state,
            loading: true,
            error: null
        };

        case FETCH_PRODUCTS_SUCCESS:
        return {
            ...state,
            loading: false,
            items: action.payload.items,
            page: action.payload.page,
            limit: action.payload.limit,
            total: action.payload.total,
            pages: action.payload.pages,
            error: null
        };

        case CREATE_PRODUCT_SUCCESS:
        return {
            ...state,
            loading: false,
            currentProduct: null,
            error: null
        };

        case UPDATE_PRODUCT_SUCCESS:
        return {
            ...state,
            loading: false,
            currentProduct: null,
            error: null
        };

        case DELETE_PRODUCT_SUCCESS:
        return {
            ...state,
            loading: false,
            error: null
        };

        case FETCH_PRODUCTS_FAILURE:
        case CREATE_PRODUCT_FAILURE:
        case UPDATE_PRODUCT_FAILURE:
        case DELETE_PRODUCT_FAILURE:
        return {
            ...state,
            loading: false,
            error: action.payload
        };

        case SET_CURRENT_PRODUCT:
        return {
            ...state,
            currentProduct: action.payload
        };

        default:
        return state;
    }
};

export default productsReducer;