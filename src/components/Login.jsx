import React, { useState } from 'react';
import { Card, Form, Button, Row, Col, Spinner, Container } from 'react-bootstrap';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const { login, loading } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: value
        }));
        
        if (errors[name]) {
        setErrors(prev => ({
            ...prev,
            [name]: ''
        }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.email.trim()) {
        newErrors.email = 'El email es requerido';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'El email no es válido';
        }
        
        if (!formData.password) {
        newErrors.password = 'La contraseña es requerida';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        try {
        await login(formData);
        navigate('/');
        } catch (error) {
        // El error ya se maneja en el hook useAuth
        }
    };

    return (
        <Container className="py-5">
        <Row className="justify-content-center">
            <Col md={6} lg={5}>
            <Card>
                <Card.Header className="text-center">
                <h4 className="mb-0">
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                    Iniciar Sesión
                </h4>
                </Card.Header>
                <Card.Body className="p-4">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                        placeholder="usuario@ejemplo.com"
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.email}
                    </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-4">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        isInvalid={!!errors.password}
                        placeholder="Ingresa tu contraseña"
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.password}
                    </Form.Control.Feedback>
                    </Form.Group>

                    <div className="d-grid mb-3">
                    <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        disabled={loading}
                    >
                        {loading ? (
                        <>
                            <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            className="me-2"
                            />
                            Iniciando sesión...
                        </>
                        ) : (
                        <>
                            <i className="bi bi-box-arrow-in-right me-2"></i>
                            Iniciar Sesión
                        </>
                        )}
                    </Button>
                    </div>

                    <div className="text-center">
                    <small className="text-muted">
                        ¿No tienes cuenta?{' '}
                        <Link to="/register" className="text-decoration-none">
                        Regístrate aquí
                        </Link>
                    </small>
                    </div>
                </Form>
                </Card.Body>
            </Card>
            </Col>
        </Row>
        </Container>
    );
};

export default Login;