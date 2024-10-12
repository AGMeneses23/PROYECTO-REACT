import React from 'react';
import { Navigate, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';

function App() {

  const isAuthenticated = !!localStorage.getItem('token'); //verifica si el usuario es autenticado

  return (

    <Router>
      <Routes>
        {/* Ruta del login */}
        <Route path="/login" element={isAuthenticated ? <Navigate to="/home" /> : <Login />} />
        {/* Ruta del home (protegida) */}
        <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        {/* Ruta del login */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/home" : "/login"} />} />
      </Routes>
    </Router>

  );
}

export default App;
