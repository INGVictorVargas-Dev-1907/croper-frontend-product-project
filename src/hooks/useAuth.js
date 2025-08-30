import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { showAlert } from '../store/actions';
import { login as loginAction, register as registerAction, logout as logoutAction } from '../store/actionsAuth/authActions';

export const useAuth = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const login = async (credentials) => {
        setLoading(true);
        try {
            // Usa la action de Redux en lugar de la API directa
            const response = await dispatch(loginAction(credentials));
            dispatch(showAlert('Login exitoso', 'success'));
            return response;
        } catch (error) {
            const message = error.response?.data?.message || 'Error en el login';
            dispatch(showAlert(message));
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        setLoading(true);
        try {
            // Usa la action de Redux en lugar de la API directa
            const response = await dispatch(registerAction(userData));
            dispatch(showAlert('Usuario registrado exitosamente', 'success'));
            return response;
        } catch (error) {
            const message = error.response?.data?.message || 'Error en el registro';
            dispatch(showAlert(message));
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        dispatch(logoutAction());
        dispatch(showAlert('Sesión cerrada', 'info'));
    };

    const getCurrentUser = () => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    };

    const isAuthenticated = () => {
        return !!localStorage.getItem('token');
    };

    return {
        login,
        register,
        logout,
        getCurrentUser,
        isAuthenticated,
        loading
    };
};