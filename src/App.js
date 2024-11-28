import React, { useState } from 'react';
import { Navigate, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Categoria from './components/Categoria';
import Inicio from './components/Inicio';
import CategoriasCrud from './components/CategoriasCrud';
import Registro from './components/Registro';
import GastosCrud from './components/GastosCrud';
import ResetPassword from './components/restorePassword';
import Presentation from './components/Presentation';
import InicioApp from './components/InicioApp';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token')); //verifica si el usuario es autenticado

  return (

    <Router>
      <Routes>
        {/* Ruta raíz para redirigir automáticamente a /inicio-page */}
        <Route path="/" element={<Navigate to="/inicio-page" />} />
        {/* Ruta del login */}
        <Route path="/login" element={isAuthenticated ? <Navigate to="/categorias-lista" /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
        {/* Ruta del registro */}
        <Route path="/registro" element={<Registro />} />
        {/* Ruta del home (protegida) */}
        <Route path="/categorias-lista" element={isAuthenticated ? <CategoriasCrud setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login" />} />
        {/* Ruta del login */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/categorias-lista" : "/login"} />} />
        {/*Ruta de categoria*/}
        <Route path="/categoria/:idCat?" element={isAuthenticated ? <Categoria setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login" />} />
        {/*Ruta de Inicio*/}
        <Route path="/inicio" element={isAuthenticated ? <Inicio setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login" />} />
        {/*Ruta de Gastos*/}
        <Route path="/gastos" element={isAuthenticated ? <GastosCrud setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login" />} />
        {/*Ruta para editar gastos*/}
        <Route path="/gastos/:idGasto?" element={isAuthenticated ? <GastosCrud setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login" />} />
        {/* Ruta para recuperar contraseña */}
        <Route path='/reset-password' element={<ResetPassword />} />
        {/* Ruta de pagina de información */}
        <Route path='/info-page' element={isAuthenticated ? <Presentation setIsAuthenticated={setIsAuthenticated} /> : <Navigate to='/login' />} />
        {/* Ruta de pagina incial */}
        <Route path='/inicio-page' element={<InicioApp />} />
      </Routes>
    </Router>

  );
}

export default App;
