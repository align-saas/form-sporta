// src/pages/ContactInfo.jsx
import { useContext, useState } from 'react';
import { FormContext } from '../context/FormContext';

export default function ContactInfo() {
  const { data, update } = useContext(FormContext);
  const [errors, setErrors] = useState({
    telefono: '',
    correo: '',
    telefonoEmergencia: '',
  });

  const validateField = (field, value) => {
    let error = '';
    if (field === 'telefono' || field === 'telefonoEmergencia') {
      if (!/^\d{8}$/.test(value)) {
        error = 'El teléfono debe tener exactamente 8 dígitos.';
      }
    }
    if (field === 'correo') {
      // Validación básica de email
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = 'Correo electrónico no válido.';
      }
    }
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  return (
    <div className="space-y-4">
      {/* Teléfono */}
      <div>
        <label className="block font-medium">Teléfono</label>
        <input
          type="tel"
          maxLength={8}
          required
          value={data.telefono}
          onChange={(e) => update('telefono', e.target.value)}
          onBlur={(e) => validateField('telefono', e.target.value)}
          className="mt-1 w-full border rounded p-2"
          placeholder="8 dígitos"
        />
        {errors.telefono && (
          <p className="text-red-600 text-sm mt-1">{errors.telefono}</p>
        )}
      </div>

      {/* Correo electrónico */}
      <div>
        <label className="block font-medium">Correo Electrónico</label>
        <input
          type="email"
          required
          value={data.correo}
          onChange={(e) => update('correo', e.target.value)}
          onBlur={(e) => validateField('correo', e.target.value)}
          className="mt-1 w-full border rounded p-2"
          placeholder="usuario@ejemplo.com"
        />
        {errors.correo && (
          <p className="text-red-600 text-sm mt-1">{errors.correo}</p>
        )}
      </div>

      {/* Teléfono de emergencia */}
      <div>
        <label className="block font-medium">Teléfono de Emergencia</label>
        <input
          type="tel"
          maxLength={8}
          required
          value={data.telefonoEmergencia}
          onChange={(e) => update('telefonoEmergencia', e.target.value)}
          onBlur={(e) =>
            validateField('telefonoEmergencia', e.target.value)
          }
          className="mt-1 w-full border rounded p-2"
          placeholder="8 dígitos"
        />
        {errors.telefonoEmergencia && (
          <p className="text-red-600 text-sm mt-1">
            {errors.telefonoEmergencia}
          </p>
        )}
      </div>
    </div>
  );
}
