// src/pages/Home.jsx
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getEmpleadosData } from '../services/firestoreService';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white flex flex-col items-center justify-center p-6">
        <div className="w-64 flex justify-center py-6">
          <img
            src="/img/LOGO_SPORTA.png"
            alt="Logo Sporta"
            className="h-16 w-auto object-contain"
          />
        </div>
      <h1 className="text-3xl font-bold mb-4">¡Bienvenido!</h1>
      <p className="mb-8 text-gray-700 text-center">
        Selecciona qué deseas hacer hoy
      </p>
      <div className="space-y-4 w-full max-w-sm">
        <button
          onClick={() => navigate('/new')}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          Nuevo cliente
        </button>
        <button 
            onClick={() => navigate('/test')}
            className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300">
                Sesión de prueba
        </button>
        <button
          onClick={() => navigate('/update')}
          className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300"
        >
          Actualizar datos
        </button>
      </div>
    </div>
  );
}
