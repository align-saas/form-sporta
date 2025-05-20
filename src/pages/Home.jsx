// src/pages/Home.jsx
import { useContext } from 'react';
import { FormContext } from '../context/FormContext';
export default function Home() {
  const { setFormType } = useContext(FormContext);

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
          onClick={() => setFormType('new')}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          Nuevo cliente
        </button>
        <button 
            onClick={() => setFormType('test')}
            className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300">
                Sesión de prueba
        </button>
        <button
          onClick={() => alert('Actualizar datos: pendiente implementar')}
          className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300"
          disabled
        >
          Actualizar datos
        </button>
      </div>
    </div>
  );
}
