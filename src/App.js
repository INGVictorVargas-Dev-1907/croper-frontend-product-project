import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import Login from './components/Login';
import Register from './components/Register';
import Alert from './components/Alert';
import PrivateRoute from './components/PrivateRoute';
import { checkAuth } from './store/actionsAuth/authActions';
import { fetchProducts } from './store/actions';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchProducts());
    }
  }, [dispatch, isAuthenticated]);

  return (
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/login" element={
            isAuthenticated ? <Navigate to="/" /> : <Login />
          } />
          <Route path="/register" element={
            isAuthenticated ? <Navigate to="/" /> : <Register />
          } />
          <Route path="/" element={
            <PrivateRoute>
              <Container className="py-4">
                <h1 className="text-center mb-4">
                  <i className="bi bi-box-seam me-2"></i>
                  Gestión de Productos
                </h1>
                <Alert />
                <div className="row">
                  <div className="col-md-4 mb-4">
                    <ProductForm />
                  </div>
                  <div className="col-md-8">
                    <ProductList />
                  </div>
                </div>
              </Container>
            </PrivateRoute>
          } />
        </Routes>
      </div>
  );
}

export default App;