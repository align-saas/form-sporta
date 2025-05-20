// src/pages/GeneralInfo.jsx
import { useContext, useEffect, useState } from 'react';
import { FormContext } from '../context/FormContext';
import {  fetchCountries } from '../utils/api';

export default function GeneralInfo() {
  const { data, update } = useContext(FormContext);
  const [errors, setErrors] = useState({ dpi: '', nombre: '', apellido: '' });
  const [countries, setCountries] = useState([]);
  useEffect(() => {
      fetchCountries()
            .then(setCountries)
            .catch(console.error);
  }, []);

  const zonas = Array.from({ length: 25 }, (_, i) => `Zona ${i + 1}`);
  const consumos = ['ESTUDIOS', 'TRABAJO', 'EMPRESA'];

  const validateField = (field, value) => {
    let error = '';
    if (field === 'dpi') {
      if (!/^\d{13}$/.test(value)) error = 'El DPI debe tener exactamente 13 dígitos numéricos.';
    }
    if (field === 'nombre' || field === 'apellido') {
      if (value.trim().length < 3) error = 'Debe tener al menos 3 caracteres.';
    }
    setErrors((e) => ({ ...e, [field]: error }));
  };

  return (
    <div className="space-y-4">
      {/* DPI */}
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
          {zonas.map((z) => (
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
        <label className="block font-medium">¿Qué consume más tu día?</label>
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
    </div>
  );
}
