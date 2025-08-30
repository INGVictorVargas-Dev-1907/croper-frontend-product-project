// CAMBIA ESTA IMPORTACIÓN
import { authAPI } from '../../services/api'; // Nueva importación
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGOUT,
    CHECK_AUTH_REQUEST,
    CHECK_AUTH_SUCCESS,
    CHECK_AUTH_FAILURE
} from '../actionTypes';

// Login actions
export const loginRequest = () => ({
  type: LOGIN_REQUEST
});

export const loginSuccess = (user) => ({
    type: LOGIN_SUCCESS,
    payload: user
});

export const loginFailure = (error) => ({
    type: LOGIN_FAILURE,
    payload: error
});

export const login = (credentials) => {
    return async (dispatch) => {
        try {
        dispatch(loginRequest());
        
        const response = await authAPI.login(credentials);
        const { user, access_token } = response.data;
        
        localStorage.setItem('token', access_token);
        localStorage.setItem('user', JSON.stringify(user));
        
        dispatch(loginSuccess(user));
        return response.data;
        } catch (error) {
        const errorMessage = error.response?.data?.message || 'Error en el login';
        dispatch(loginFailure(errorMessage));
        throw error;
        }
    };
};

// Register actions
export const registerRequest = () => ({
    type: REGISTER_REQUEST
});

export const registerSuccess = (user) => ({
    type: REGISTER_SUCCESS,
    payload: user
});

export const registerFailure = (error) => ({
    type: REGISTER_FAILURE,
    payload: error
});

export const register = (userData) => {
    return async (dispatch) => {
        try {
        dispatch(registerRequest());
        
        const response = await authAPI.register(userData);
        const { user, access_token } = response.data;
        
        localStorage.setItem('token', access_token);
        localStorage.setItem('user', JSON.stringify(user));
        
        dispatch(registerSuccess(user));
        return response.data;
        } catch (error) {
        const errorMessage = error.response?.data?.message || 'Error en el registro';
        dispatch(registerFailure(errorMessage));
        throw error;
        }
    };
};

// Logout action
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return { type: LOGOUT };
};

// Check authentication actions
export const checkAuthRequest = () => ({
    type: CHECK_AUTH_REQUEST
});

export const checkAuthSuccess = (user) => ({
    type: CHECK_AUTH_SUCCESS,
    payload: user
});

export const checkAuthFailure = () => ({
    type: CHECK_AUTH_FAILURE
});

export const checkAuth = () => {
    return (dispatch) => {
        dispatch(checkAuthRequest());
        
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');
        
        if (token && userStr) {
        try {
            const user = JSON.parse(userStr);
            dispatch(checkAuthSuccess(user));
        } catch (error) {
            dispatch(checkAuthFailure());
        }
        } else {
        dispatch(checkAuthFailure());
        }
    };
};