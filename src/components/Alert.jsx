import React, { useEffect } from 'react';
import { Alert as BSAlert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { clearAlert } from '../store/actions';

const Alert = () => {
    const dispatch = useDispatch();
    const { show, message, variant } = useSelector(state => state.alert);

    const handleClose = () => {
        dispatch(clearAlert());
    };

    // Auto-cierre redundante
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                dispatch(clearAlert());
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [show, dispatch]);

    if (!show) return null;

    return (
        <BSAlert 
            variant={variant} 
            dismissible 
            onClose={handleClose}
            className="alert-fixed"
            style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                zIndex: 1050,
                minWidth: '300px',
            }}
        >
            <i className={`bi ${variant === 'success' ? 'bi-check-circle' : 'bi-exclamation-triangle'} me-2`}></i>
            {message}
        </BSAlert>
    );
};

export default Alert;