import { productsAPI } from '../services/api';
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
    SET_CURRENT_PRODUCT,
    SET_SEARCH_FILTER,
    SET_CATEGORY_FILTER,
    SET_PAGE,
    SHOW_ALERT,
    CLEAR_ALERT
} from './actionTypes';


// Alert actions modificadas para auto-cierre
export const showAlert = (message, variant = 'danger') => {
    return (dispatch, getState) => {
        // Limpiar alerta existente y su timeout
        const { timeoutId } = getState().alert;
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        
        dispatch({
            type: CLEAR_ALERT
        });
        
        // Crear nuevo timeout para auto-cierre después de 5 segundos
        const newTimeoutId = setTimeout(() => {
            dispatch({
                type: CLEAR_ALERT
            });
        }, 5000);
        
        // Mostrar la nueva alerta con el timeoutId
        dispatch({
            type: SHOW_ALERT,
            payload: { message, variant, timeoutId: newTimeoutId }
        });
    };
};

export const clearAlert = () => {
    return (dispatch, getState) => {
        const { timeoutId } = getState().alert;
        
        // Limpiar timeout si existe
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        
        dispatch({
            type: CLEAR_ALERT
        });
    };
};


export const fetchProductsRequest = () => ({
    type: FETCH_PRODUCTS_REQUEST
});

export const fetchProductsSuccess = (data) => ({
    type: FETCH_PRODUCTS_SUCCESS,
    payload: data
});

export const fetchProductsFailure = (error) => ({
    type: FETCH_PRODUCTS_FAILURE,
    payload: error
});

export const fetchProducts = (page = 1, limit = 10, search = '', category = '') => {
    return async (dispatch, getState) => {
        try {
            dispatch(fetchProductsRequest());
            const filters = getState().filters;
            
            const response = await productsAPI.getAll({
                page: page || filters.page,
                limit: limit || filters.limit,
                search: search !== undefined ? search : filters.search,
                categoria: category !== undefined ? category : filters.category
            });
            
            dispatch(fetchProductsSuccess(response.data));
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error al cargar los productos';
            dispatch(fetchProductsFailure(errorMessage));
            dispatch(showAlert(errorMessage));
        }
    };
};

export const createProductRequest = () => ({
    type: CREATE_PRODUCT_REQUEST
});

export const createProductSuccess = (product) => ({
    type: CREATE_PRODUCT_SUCCESS,
    payload: product
});

export const createProductFailure = (error) => ({
    type: CREATE_PRODUCT_FAILURE,
    payload: error
});

export const createProduct = (productData) => {
    return async (dispatch) => {
        try {
            dispatch(createProductRequest());
            
            const response = await productsAPI.create(productData);
            
            dispatch(createProductSuccess(response.data.product));
            dispatch(showAlert('Producto creado exitosamente', 'success'));
            dispatch(fetchProducts());
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error al crear el producto';
            dispatch(createProductFailure(errorMessage));
            dispatch(showAlert(errorMessage));
        }
    };
};

export const updateProductRequest = () => ({
    type: UPDATE_PRODUCT_REQUEST
});

export const updateProductSuccess = (product) => ({
    type: UPDATE_PRODUCT_SUCCESS,
    payload: product
});

export const updateProductFailure = (error) => ({
    type: UPDATE_PRODUCT_FAILURE,
    payload: error
});

export const updateProduct = (id, productData) => {
    return async (dispatch) => {
        try {
            dispatch(updateProductRequest());
            
            const response = await productsAPI.update(id, productData);
            
            dispatch(updateProductSuccess(response.data.product));
            dispatch(showAlert('Producto actualizado exitosamente', 'success'));
            dispatch(fetchProducts());
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error al actualizar el producto';
            dispatch(updateProductFailure(errorMessage));
            dispatch(showAlert(errorMessage));
        }
    };
};

export const deleteProductRequest = () => ({
    type: DELETE_PRODUCT_REQUEST
});

export const deleteProductSuccess = (id) => ({
    type: DELETE_PRODUCT_SUCCESS,
    payload: id
});

export const deleteProductFailure = (error) => ({
    type: DELETE_PRODUCT_FAILURE,
    payload: error
});

export const deleteProduct = (id) => {
    return async (dispatch) => {
        try {
            dispatch(deleteProductRequest());
            
            await productsAPI.delete(id);
            
            dispatch(deleteProductSuccess(id));
            dispatch(showAlert('Producto eliminado exitosamente', 'success'));
            dispatch(fetchProducts());
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error al eliminar el producto';
            dispatch(deleteProductFailure(errorMessage));
            dispatch(showAlert(errorMessage));
        }
    };
};

export const setCurrentProduct = (product) => ({
    type: SET_CURRENT_PRODUCT,
    payload: product
});

export const setSearchFilter = (search) => ({
    type: SET_SEARCH_FILTER,
    payload: search
});

export const setCategoryFilter = (category) => ({
    type: SET_CATEGORY_FILTER,
    payload: category
});

export const setPage = (page) => ({
    type: SET_PAGE,
    payload: page
});