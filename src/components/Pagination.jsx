import React from 'react';
import { Alert as BSAlert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { clearAlert } from '../store/actions';

const Alert = () => {
    const dispatch = useDispatch();
    const { show, message, variant } = useSelector(state => state.alert);

    const handleClose = () => {
        dispatch(clearAlert());
    };

    if (!show) return null;

    return (
        <BSAlert 
        variant={variant} 
        dismissible 
        onClose={handleClose}
        className="alert-fixed"
        >
        <i className={`bi ${variant === 'success' ? 'bi-check-circle' : 'bi-exclamation-triangle'} me-2`}></i>
        {message}
        </BSAlert>
    );
};

export default Alert;