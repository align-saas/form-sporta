// src/pages/GeneralInfo.jsx
import { useContext, useEffect, useState } from 'react';
import { FormContext } from '../context/FormContext';
import {  fetchCountries } from '../utils/api';
import Button from '../components/Button';
export default function GeneralInfo() {
  const {formType, data, update ,errors, updateError, reset} = useContext(FormContext);
  const [countries, setCountries] = useState([]);
  useEffect(() => {
      fetchCountries()
            .then(setCountries)
            .catch(console.error);
  }, []);

  const zonas = Array.from({ length: 25 }, (_, i) => `Zona ${i + 1}`);
  const nuevasZonas = [
    'Santa Catarina Pinula',
    'Mixco',
    'Villa Canales',
    'Villa Nueva',
    'San Jose Pinula',
    ...zonas,
  ];
  const consumos = ['ESTUDIOS', 'TRABAJO', 'NEGOCIO PROPIO'];

  const validateField = (field, value) => {
    let msg = '';
    if (field === 'dpi' && !/^\d{13}$/.test(value)) {
      msg = 'El DPI debe tener exactamente 13 dígitos numéricos.';
    }
    if (field === 'nombre' || field === 'apellido') {
      if (value.trim().length < 3) msg = 'Debe tener al menos 3 caracteres.';
    }
    if (field === 'nit' && !(/^\d{7,14}$/.test(value) || value.toLowerCase() === 'cf')) {
      msg = 'El NIT debe tener entre 7 y 14 dígitos numéricos o ser "cf".';
    }
    if (field === 'carnet' && formType === 'update' && value.trim() === '') {
      msg = 'El Carné Sporta es obligatorio al actualizar.';
    }
    // console.log('fieild msg', field);
    // console.log('msg', msg);
    // console.log('errors', errors);
    // console.log('validate', validateStep());
    updateError(field, msg);
  };

  return (
    <div className="space-y-4">
      {/* DPI */}
      {formType === 'update' && (
        <div>
          <label className="block font-medium">Carné Sporta</label>
          <input
            type="text"
            value={data.carnet || ''}
            onChange={(e) => update('carnet', e.target.value)}
            onBlur={(e) => validateField('carnet', e.target.value)}
            className={`mt-1 w-full border rounded p-2 ${errors.carnet ? 'border-red-500' : ''}`}
            placeholder="ID Sporta"
            required
          />
          {errors.carnet && <p className="text-red-600 text-sm mt-1">{errors.carnet}</p>}
        </div>
      )}
      <div>
        <label className="block font-medium">DPI</label>
        <input
          type="text"
          inputMode="numeric"
          maxLength={13}
          required
          value={data.dpi}
          onChange={(e) => update('dpi', e.target.value)}
          onBlur={(e) => validateField('dpi', e.target.value)}
          className="mt-1 w-full border rounded p-2"
          placeholder="13 dígitos numéricos"
        />
        {errors.dpi && <p className="text-red-600 text-sm mt-1">{errors.dpi}</p>}
      </div>
      {/* NIT */}
      <div>
        <label className="block font-medium">NIT</label>
        <input
          type="text"
          maxLength={14}
          value={data.nit}
          onChange={(e) => update('nit', e.target.value)}
          onBlur={(e) => validateField('nit', e.target.value)}
          className="mt-1 w-full border rounded p-2"
          placeholder="7-14 dígitos"
          required
        />
        {errors.nit && (
          <p className="text-red-600 text-sm mt-1">{errors.nit}</p>
        )}
      </div>
      {/* Nombre */}
      <div>
        <label className="block font-medium">Nombre</label>
        <input
          type="text"
          minLength={3}
          required
          value={data.nombre}
          onChange={(e) => update('nombre', e.target.value)}
          onBlur={(e) => validateField('nombre', e.target.value)}
          className="mt-1 w-full border rounded p-2"
        />
        {errors.nombre && <p className="text-red-600 text-sm mt-1">{errors.nombre}</p>}
      </div>

      {/* Apellido */}
      <div>
        <label className="block font-medium">Apellido</label>
        <input
          type="text"
          minLength={3}
          required
          value={data.apellido}
          onChange={(e) => update('apellido', e.target.value)}
          onBlur={(e) => validateField('apellido', e.target.value)}
          className="mt-1 w-full border rounded p-2"
        />
        {errors.apellido && <p className="text-red-600 text-sm mt-1">{errors.apellido}</p>}
      </div>

      {/* Fecha de Nacimiento */}
      <div>
        <label className="block font-medium">Fecha de Nacimiento</label>
        <input
          type="date"
          required
          value={data.fechaNacimiento}
          onChange={(e) => update('fechaNacimiento', e.target.value)}
          className="mt-1 w-full border rounded p-2"
        />
      </div>

      {/* Sexo */}
      <div>
        <label className="block font-medium">Sexo</label>
        <select
          required
          value={data.sexo}
          onChange={(e) => update('sexo', e.target.value)}
          className="mt-1 w-full border rounded p-2"
        >
          <option value="">Selecciona</option>
          <option value="MASCULINO">MASCULINO</option>
          <option value="FEMENINO">FEMENINO</option>
        </select>
      </div>

      {/* Nacionalidad */}
      <div>
        <label className="block font-medium">Nacionalidad</label>
        <select
          required
          value={data.nacionalidad}
          onChange={(e) => update('nacionalidad', e.target.value)}
          className="mt-1 w-full border rounded p-2"
        >
          <option value="">Selecciona</option>
          {countries.map((c) => ( <option key={c} value={c}>{c}</option>))}
        </select>
      </div>

      {/* Zona */}
      <div>
        <label className="block font-medium">Zona (Guatemala Capital)</label>
        <select
          required
          value={data.zona}
          onChange={(e) => update('zona', e.target.value)}
          className="mt-1 w-full border rounded p-2"
        >
          <option value="">Selecciona</option>
          {nuevasZonas.map((z) => (
            <option key={z} value={z}>{z}</option>
          ))}
        </select>
      </div>

      {/* Profesión */}
      {/* <div>
        <label className="block font-medium">Profesión</label>
        <select
          required
          value={data.profesion}
          onChange={(e) => update('profesion', e.target.value)}
          className="mt-1 w-full border rounded p-2"
        >
          <option value="">Selecciona</option>
          {profesiones.map((p) => (
            <option key={p.id} value={p.nombre}>{p.nombre}</option>
          ))}
        </select>
      </div> */}

      {/* ¿Qué consume más tu día? */}
      <div>
        <label className="block font-medium">¿Qué consume más tiempo en tu día?</label>
        <select
          required
          value={data.consume}
          onChange={(e) => update('consume', e.target.value)}
          className="mt-1 w-full border rounded p-2"
        >
          <option value="">Selecciona</option>
          {consumos.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <div className="flex justify-between pt-6">
        <Button onClick={reset} variant="primary">
          Volver al menú
        </Button>
      </div>
    </div>
  );
}
