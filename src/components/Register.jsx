import React, { useState } from 'react';
import { Card, Form, Button, Row, Col, Spinner, Container } from 'react-bootstrap';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const { register, loading } = useAuth();
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
        
        if (!formData.fullname.trim()) {
        newErrors.fullname = 'El nombre completo es requerido';
        }
        
        if (!formData.email.trim()) {
        newErrors.email = 'El email es requerido';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'El email no es válido';
        }
        
        if (!formData.password) {
        newErrors.password = 'La contraseña es requerida';
        } else if (formData.password.length < 6) {
        newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
        }
        
        if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Debes confirmar tu contraseña';
        } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Las contraseñas no coinciden';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        try {
        await register({
            fullname: formData.fullname,
            email: formData.email,
            password: formData.password
        });
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
                    <i className="bi bi-person-plus me-2"></i>
                    Crear Cuenta
                </h4>
                </Card.Header>
                <Card.Body className="p-4">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                    <Form.Label>Nombre Completo</Form.Label>
                    <Form.Control
                        type="text"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                        isInvalid={!!errors.fullname}
                        placeholder="Tu nombre completo"
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.fullname}
                    </Form.Control.Feedback>
                    </Form.Group>

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

                    <Form.Group className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        isInvalid={!!errors.password}
                        placeholder="Mínimo 6 caracteres"
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.password}
                    </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-4">
                    <Form.Label>Confirmar Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        isInvalid={!!errors.confirmPassword}
                        placeholder="Repite tu contraseña"
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.confirmPassword}
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
                            Creando cuenta...
                        </>
                        ) : (
                        <>
                            <i className="bi bi-person-plus me-2"></i>
                            Crear Cuenta
                        </>
                        )}
                    </Button>
                    </div>

                    <div className="text-center">
                    <small className="text-muted">
                        ¿Ya tienes cuenta?{' '}
                        <Link to="/login" className="text-decoration-none">
                        Inicia sesión aquí
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

export default Register;