// src/pages/SessionForm.jsx
import { useContext, useState } from 'react';
import { FormContext } from '../context/FormContext';
import Button from '../components/Button';
import { saveFormData } from '../services/firestoreService';

export default function SessionForm() {
  const { data, update, reset } = useContext(FormContext);
  const [errors, setErrors] = useState({ dpi: '', telefono: '' });

  const validateField = (field, value) => {
    let error = '';
    if (field === 'dpi' && !/^\d{13}$/.test(value)) {
      error = 'El DPI debe tener 13 dígitos.';
    }
    if (field === 'telefono' && !/^\d{8}$/.test(value)) {
      error = 'El teléfono debe tener 8 dígitos.';
    }
    setErrors((e) => ({ ...e, [field]: error }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const timestamp = new Date().toISOString();
      const typeFormValue = 'TEST';
      // Construir objeto con los datos actualizados
      const dataToSave = { ...data, timestamp, typeForm: typeFormValue };
      const id = await saveFormData(dataToSave);
      alert(`Guardado correctamente con ID: ${id}`);
      reset();
    } catch {
      alert('Error al guardar el formulario');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* INFORMACIÓN GENERAL */}
      <h3 className="text-lg font-semibold">Información General</h3>
      <div>
        <label className="block font-medium">DPI</label>
        <input
          type="text"
          maxLength={13}
          value={data.dpi}
          onChange={e => update('dpi', e.target.value)}
          onBlur={e => validateField('dpi', e.target.value)}
          className="mt-1 w-full border rounded p-2"
          placeholder="13 dígitos"
          required
        />
        {errors.dpi && <p className="text-red-600 text-sm mt-1">{errors.dpi}</p>}
      </div>

      <div>
        <label className="block font-medium">Nombre</label>
        <input
          type="text"
          value={data.nombre}
          onChange={e => update('nombre', e.target.value)}
          className="mt-1 w-full border rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Apellido</label>
        <input
          type="text"
          value={data.apellido}
          onChange={e => update('apellido', e.target.value)}
          className="mt-1 w-full border rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Fecha de nacimiento</label>
        <input
          type="date"
          value={data.fechaNacimiento}
          onChange={e => update('fechaNacimiento', e.target.value)}
          className="mt-1 w-full border rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Sexo</label>
        <select
          value={data.sexo}
          onChange={e => update('sexo', e.target.value)}
          className="mt-1 w-full border rounded p-2"
          required
        >
          <option value="">Selecciona</option>
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
        </select>
      </div>

      {/* INFORMACIÓN DE CONTACTO */}
      <h3 className="text-lg font-semibold mt-8">Información de Contacto</h3>
      <div>
        <label className="block font-medium">Teléfono</label>
        <input
          type="tel"
          maxLength={8}
          value={data.telefono}
          onChange={e => update('telefono', e.target.value)}
          onBlur={e => validateField('telefono', e.target.value)}
          className="mt-1 w-full border rounded p-2"
          placeholder="8 dígitos"
          required
        />
        {errors.telefono && <p className="text-red-600 text-sm mt-1">{errors.telefono}</p>}
      </div>

      {/* MOTIVACIONES */}
      <h3 className="text-lg font-semibold mt-8">Motivaciones</h3>
      <div>
        <label className="block font-medium">Área de Enfoque</label>
        <select
          value={data.areaEnfoque}
          onChange={e => update('areaEnfoque', e.target.value)}
          className="mt-1 w-full border rounded p-2"
          required
        >
          <option value="">Selecciona</option>
          <option value="gimnasio">Gimnasio</option>
          <option value="academia">Academia</option>
        </select>
      </div>

      <div>
        <label className="block font-medium">Academia</label>
        <select
          value={data.academiaFrequentada}
          onChange={e => update('academiaFrequentada', e.target.value)}
          className="mt-1 w-full border rounded p-2"
          required
        >
          <option value="">Selecciona</option>
          <option value="gimnasio">Gimnasio</option>
          <option value="atletismo">Atletismo</option>
          {/* ... agrega más si lo necesitas */}
        </select>
      </div>

      <div className="flex justify-between pt-6">
        <Button onClick={reset} variant="primary">Volver al menú</Button>
        <Button type="submit" variant="success">Enviar Sesión de Prueba</Button>
      </div>
    </form>
  );
}
