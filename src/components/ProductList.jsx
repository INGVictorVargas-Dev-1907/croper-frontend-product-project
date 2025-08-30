import { Button, Card, Spinner, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, fetchProducts, setCurrentProduct, setPage } from '../store/actions';

const ProductList = () => {
    const dispatch = useDispatch();
    const { items, loading, page, limit, total, pages } = useSelector(state => state.products);
    const { search, category } = useSelector(state => state.filters);

    const handleEdit = (product) => {
        dispatch(setCurrentProduct(product));
    };

    const handleDelete = (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
        dispatch(deleteProduct(id));
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pages) {
        dispatch(setPage(newPage));
        dispatch(fetchProducts());
        }
    };

    if (loading) {
        return (
        <Card>
            <Card.Body className="text-center">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Cargando...</span>
            </Spinner>
            <p className="mt-2">Cargando productos...</p>
            </Card.Body>
        </Card>
        );
    }

    return (
        <Card>
        <Card.Header>
            <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">
                <i className="bi bi-list-ul me-2"></i>
                Lista de Productos
            </h5>
            <span className="text-muted">
                Mostrando {(page - 1) * limit + 1} - {Math.min(page * limit, total)} de {total}
            </span>
            </div>
        </Card.Header>
        <Card.Body className="p-0">
            <div className="table-responsive">
            <Table striped hover className="product-table mb-0">
                <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Precio</th>
                    <th>Categoría</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {items.length === 0 ? (
                    <tr>
                    <td colSpan="5" className="text-center py-4">
                        {search || category ? 'No se encontraron productos con los filtros aplicados' : 'No hay productos registrados'}
                    </td>
                    </tr>
                ) : (
                    items.map(product => (
                    <tr key={product._id}>
                        <td>{product.nombre}</td>
                        <td>{product.descripcion || '-'}</td>
                        <td>${product.precio.toFixed(2)}</td>
                        <td>{product.categoria || '-'}</td>
                        <td>
                        <Button
                            variant="outline-primary"
                            size="sm"
                            className="me-1"
                            onClick={() => handleEdit(product)}
                        >
                            <i className="bi bi-pencil"></i>
                        </Button>
                        <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDelete(product._id)}
                        >
                            <i className="bi bi-trash"></i>
                        </Button>
                        </td>
                    </tr>
                    ))
                )}
                </tbody>
            </Table>
            </div>
        </Card.Body>
        {pages > 1 && (
            <Card.Footer>
            <div className="d-flex justify-content-between align-items-center">
                <small className="text-muted">
                Página {page} de {pages}
                </small>
                <div>
                <Button
                    variant="outline-secondary"
                    size="sm"
                    disabled={page === 1}
                    onClick={() => handlePageChange(page - 1)}
                    className="me-2"
                >
                    <i className="bi bi-chevron-left"></i> Anterior
                </Button>
                <Button
                    variant="outline-secondary"
                    size="sm"
                    disabled={page === pages}
                    onClick={() => handlePageChange(page + 1)}
                >
                    Siguiente <i className="bi bi-chevron-right"></i>
                </Button>
                </div>
            </div>
            </Card.Footer>
        )}
        </Card>
    );
};

export default ProductList;