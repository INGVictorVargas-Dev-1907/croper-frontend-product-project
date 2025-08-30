import { useState } from 'react';
import {
    Navbar as BSNavbar,
    Button,
    Container,
    Dropdown,
    Form,
    FormControl,
    Nav,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProducts, setCategoryFilter, setSearchFilter } from '../store/actions';
import { logout } from '../store/actionsAuth/authActions';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);
    const { search, category } = useSelector(state => state.filters);
    
    const [searchTerm, setSearchTerm] = useState(search || '');
    const [selectedCategory, setSelectedCategory] = useState(category || '');

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        dispatch(setSearchFilter(searchTerm));
        dispatch(setCategoryFilter(selectedCategory));
        dispatch(fetchProducts(1, 10, searchTerm, selectedCategory));
    };

    const handleClearFilters = () => {
        setSearchTerm('');
        setSelectedCategory('');
        dispatch(setSearchFilter(''));
        dispatch(setCategoryFilter(''));
        dispatch(fetchProducts());
    };

    const categories = [
        'Semillas', 'Fertilizantes', 'Herramientas', 'Riego', 'Protección', 'Granos'
    ];

    return (
        <BSNavbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
            <BSNavbar.Brand href="/" className="d-flex align-items-center">
            <i className="bi bi-box-seam me-2"></i>
            Croper Productos
            </BSNavbar.Brand>
            
            <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
            
            <BSNavbar.Collapse id="basic-navbar-nav">
            {/* Barra de búsqueda */}
            {user && (
                <Form className="d-flex me-auto my-2 my-lg-0" onSubmit={handleSearchSubmit}>
                <div className="d-flex flex-wrap">
                    <FormControl
                    type="search"
                    placeholder="Buscar por nombre..."
                    className="me-2 mb-2"
                    style={{ minWidth: '200px' }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    
                    <Dropdown className="me-2 mb-2">
                    <Dropdown.Toggle 
                        variant="outline-light" 
                        id="category-dropdown"
                        style={{ minWidth: '150px' }}
                    >
                        {selectedCategory || 'Todas las categorías'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item 
                        onClick={() => setSelectedCategory('')}
                        active={selectedCategory === ''}
                        >
                        Todas las categorías
                        </Dropdown.Item>
                        {categories.map(cat => (
                        <Dropdown.Item 
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            active={selectedCategory === cat}
                        >
                            {cat}
                        </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                    </Dropdown>
                    
                    <Button 
                    variant="outline-success" 
                    type="submit" 
                    className="me-2 mb-2"
                    >
                    <i className="bi bi-search"></i>
                    </Button>
                    
                    {(searchTerm || selectedCategory) && (
                    <Button 
                        variant="outline-secondary" 
                        onClick={handleClearFilters}
                        className="mb-2"
                    >
                        <i className="bi bi-x-circle"></i>
                    </Button>
                    )}
                </div>
                </Form>
            )}
            
            <Nav className="ms-auto">
                {user ? (
                <>
                    <BSNavbar.Text className="me-3 d-none d-md-block">
                    <i className="bi bi-person-circle me-1"></i>
                    {user.fullname} ({user.role})
                    </BSNavbar.Text>
                    <Button 
                    variant="outline-light" 
                    size="sm" 
                    onClick={handleLogout}
                    className="mb-2 mb-lg-0"
                    >
                    <i className="bi bi-box-arrow-right me-1"></i>
                    Cerrar Sesión
                    </Button>
                </>
                ) : (
                <>
                    <Button 
                    variant="outline-light" 
                    size="sm" 
                    className="me-2 mb-2 mb-lg-0"
                    onClick={() => navigate('/login')}
                    >
                    <i className="bi bi-box-arrow-in-right me-1"></i>
                    Iniciar Sesión
                    </Button>
                    <Button 
                    variant="light" 
                    size="sm"
                    className="mb-2 mb-lg-0"
                    onClick={() => navigate('/register')}
                    >
                    <i className="bi bi-person-plus me-1"></i>
                    Registrarse
                    </Button>
                </>
                )}
            </Nav>
            </BSNavbar.Collapse>
        </Container>
        </BSNavbar>
    );
};

export default Navbar;