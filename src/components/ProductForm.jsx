import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Row, Col, Spinner, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, updateProduct, setCurrentProduct } from '../store/actions';

const ProductForm = () => {
    const dispatch = useDispatch();
    const { currentProduct, loading } = useSelector(state => state.products);
    
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        categoria: ''
    });
    const [errors, setErrors] = useState({});

    // Lista de categorías predefinidas
    const categories = [
            'Semillas', 'Fertilizantes', 'Herramientas', 'Riego', 'Protección', 'Granos'
        ];


    useEffect(() => {
        if (currentProduct) {
            setFormData({
                nombre: currentProduct.nombre || '',
                descripcion: currentProduct.descripcion || '',
                precio: currentProduct.precio || '',
                categoria: currentProduct.categoria || ''
            });
        } else {
            setFormData({
                nombre: '',
                descripcion: '',
                precio: '',
                categoria: ''
            });
        }
        setErrors({});
    }, [currentProduct]);

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

    // Función para manejar selección de categoría
    const handleCategorySelect = (category) => {
        setFormData(prev => ({
            ...prev,
            categoria: category
        }));
        
        if (errors.categoria) {
            setErrors(prev => ({
                ...prev,
                categoria: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.nombre.trim()) {
            newErrors.nombre = 'El nombre es requerido';
        }
        
        if (!formData.precio) {
            newErrors.precio = 'El precio es requerido';
        } else if (isNaN(formData.precio) || parseFloat(formData.precio) <= 0) {
            newErrors.precio = 'El precio debe ser un número mayor a 0';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        const productData = {
            ...formData,
            precio: parseFloat(formData.precio)
        };
        
        if (currentProduct) {
            dispatch(updateProduct(currentProduct._id, productData));
        } else {
            dispatch(createProduct(productData));
        }
    };

    const handleCancel = () => {
        dispatch(setCurrentProduct(null));
        setFormData({
            nombre: '',
            descripcion: '',
            precio: '',
            categoria: ''
        });
        setErrors({});
    };

    return (
        <Card>
            <Card.Header>
                <h5 className="mb-0">
                    <i className={`bi ${currentProduct ? 'bi-pencil' : 'bi-plus-circle'} me-2`}></i>
                    {currentProduct ? 'Editar Producto' : 'Nuevo Producto'}
                </h5>
            </Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre *</Form.Label>
                        <Form.Control
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            isInvalid={!!errors.nombre}
                            placeholder="Ej: Semillas de Maíz"
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.nombre}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            placeholder="Ej: Bolsa de 10kg"
                        />
                    </Form.Group>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Precio *</Form.Label>
                                <Form.Control
                                    type="number"
                                    step="0.01"
                                    min="0.01"
                                    name="precio"
                                    value={formData.precio}
                                    onChange={handleChange}
                                    isInvalid={!!errors.precio}
                                    placeholder="Ej: 15.75"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.precio}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Categoría</Form.Label>
                                <Dropdown>
                                    <Dropdown.Toggle 
                                        variant="outline-secondary" 
                                        id="category-dropdown"
                                        className="w-100 text-start"
                                        style={{
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}
                                    >
                                        {formData.categoria || 'Seleccionar categoría'}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="w-100">
                                        <Dropdown.Item 
                                            onClick={() => handleCategorySelect('')}
                                            active={formData.categoria === ''}
                                        >
                                            Sin categoría
                                        </Dropdown.Item>
                                        {categories.map(cat => (
                                            <Dropdown.Item 
                                                key={cat}
                                                onClick={() => handleCategorySelect(cat)}
                                                active={formData.categoria === cat}
                                            >
                                                {cat}
                                            </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                                {formData.categoria && (
                                    <div className="mt-2">
                                        <small className="text-muted">
                                            Categoría seleccionada: <strong>{formData.categoria}</strong>
                                            <Button
                                                variant="link"
                                                size="sm"
                                                className="p-0 ms-2"
                                                onClick={() => handleCategorySelect('')}
                                            >
                                                <i className="bi bi-x-circle"></i>
                                            </Button>
                                        </small>
                                    </div>
                                )}
                            </Form.Group>
                        </Col>
                    </Row>

                    <div className="d-grid gap-2">
                        <Button
                            type="submit"
                            variant="primary"
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
                                    {currentProduct ? 'Actualizando...' : 'Creando...'}
                                </>
                            ) : (
                                <>
                                    <i className={`bi ${currentProduct ? 'bi-check' : 'bi-plus'} me-2`}></i>
                                    {currentProduct ? 'Actualizar Producto' : 'Crear Producto'}
                                </>
                            )}
                        </Button>
                        
                        {currentProduct && (
                            <Button
                                variant="outline-secondary"
                                onClick={handleCancel}
                                disabled={loading}
                            >
                                <i className="bi bi-x me-2"></i>
                                Cancelar
                            </Button>
                        )}
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default ProductForm;