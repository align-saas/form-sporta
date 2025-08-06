// src/App.jsx
import { useEffect, useContext } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { FormContext } from './context/FormContext';
import Home from './pages/Home';
import SessionForm from './pages/SessionForm';
import Wizard from './pages/Wizard';  // veremos abajo
import './index.css';

export default function App() {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* Sesión de prueba */}
      <Route
        path="/test"
        element={
          <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6">
              <SessionForm />
            </div>
          </div>
        }
      />
      {/* Nuevo socio */}
      <Route path="/new" element={<Wizard formType="new" />} />

      {/* Actualizar socio */}
      <Route path="/update" element={<Wizard formType="update" />} />

      {/* Cualquier otra, redirige a Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
