// src/pages/SessionForm.jsx
import { useContext, useState,useMemo } from 'react';
import { FormContext } from '../context/FormContext';
import Button from '../components/Button';
import { saveFormData } from '../services/firestoreService';
import { toast, Toaster } from 'react-hot-toast';
export default function SessionForm() {
  const { data, update, reset } = useContext(FormContext);
  const [errors, setErrors] = useState({
    dpi: '',
    telefono: '',
    correo: '',
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
    sexo: '',
    areaEnfoque: '',
    academiaFrequentada: ''
  });

  const disciplinas = [
    'GIMNASIO', 'ATLETISMO', 'SQUASH', 'NATACION', 'GIMNASIA',
    'KARATE', 'TENIS', 'CALISTENIA', 'JAZZ', 'BALLET',
    'CONTEMPLO', 'FLEX', 'CROSSFIT', 'CROSSFIT KIDS', 'TELAS',
    'HIP HOP', 'BOXEO'
  ];

  const validateField = (field, value) => {
    let msg = '';
    switch (field) {
      case 'dpi':
        if (!/^\d{13}$/.test(value)) {
          msg = 'El DPI debe tener 13 dígitos.';
        }
        break;
      case 'telefono':
        if (!/^\d{8}$/.test(value)) {
          msg = 'El teléfono debe tener 8 dígitos.';
        }
        break;
      case 'correo':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          msg = 'Correo electrónico no válido.';
        }
        break;
      case 'nombre':
      case 'apellido':
        if (value.trim().length < 3) {
          msg = 'Debe tener al menos 3 caracteres.';
        }
        break;
      case 'fechaNacimiento':
        if (!value) {
          msg = 'La fecha de nacimiento es obligatoria.';
        }
        break;
      case 'sexo':
        if (!['masculino', 'femenino'].includes(value)) {
          msg = 'Selecciona Masculino o Femenino.';
        }
        break;
      case 'areaEnfoque':
        if (!['gimnasio', 'academia'].includes(value)) {
          msg = 'Selecciona Área de Enfoque.';
        }
        break;
      case 'academiaFrequentada':
        if (!disciplinas.includes(value)) {
          msg = 'Selecciona una Academia.';
        }
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: msg }));
  };

  const isValid = useMemo(() => {
    // Campos obligatorios para sesión de prueba
    const requiredFields = [
      'dpi',
      'nombre',
      'apellido',
      'fechaNacimiento',
      'sexo',
      'telefono',
      'correo',
      'areaEnfoque',
      'academiaFrequentada'
    ];

    // 1. Comprueba que todos los required existan y no estén vacíos
    const allFilled = requiredFields.every((f) => {
      const val = data[f];
      return val !== undefined && val !== null && String(val).trim() !== '';
    });

    // 2. Comprueba que no haya mensajes de error
    const noErrors = requiredFields.every((f) => !errors[f]);

    return allFilled && noErrors;
  }, [data, errors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) {
      toast.error('Por favor corrige los errores antes de enviar');
      return;
    }
    try {
      const timestamp = new Date().toISOString();
      const typeFormValue = 'TEST';
      const dataToSave = { ...data, timestamp, typeForm: typeFormValue };
      const id = await saveFormData(dataToSave);
      toast.success(`Guardado correctamente con ID: ${id}`, {
        position: 'top-center',
        duration: 3000,
        onClose: () => reset(),
      });
    } catch (err) {
      console.error(err);
      toast.error('Error al guardar la sesión de prueba', {
        position: 'top-center',
        duration: 3000,
      });
    }
  };

  return (
    <>
    <Toaster position="top-center" />
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* INFORMACIÓN GENERAL */}
        <h3 className="text-lg font-semibold">Información General</h3>

        <div>
          <label className="block font-medium">DPI</label>
          <input
            type="text"
            inputMode="numeric"
            maxLength={13}
            required
            value={data.dpi || ''}
            onChange={(e) => update('dpi', e.target.value)}
            onBlur={(e) => validateField('dpi', e.target.value)}
            className={`mt-1 w-full border rounded p-2 ${errors.dpi ? 'border-red-500' : ''}`}
            placeholder="13 dígitos numéricos"
          />
          {errors.dpi && (
            <p className="text-red-600 text-sm mt-1">{errors.dpi}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Nombre</label>
          <input
            type="text"
            minLength={3}
            required
            value={data.nombre || ''}
            onChange={(e) => update('nombre', e.target.value)}
            onBlur={(e) => validateField('nombre', e.target.value)}
            className={`mt-1 w-full border rounded p-2 ${errors.nombre ? 'border-red-500' : ''}`}
          />
          {errors.nombre && (
            <p className="text-red-600 text-sm mt-1">{errors.nombre}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Apellido</label>
          <input
            type="text"
            minLength={3}
            required
            value={data.apellido || ''}
            onChange={(e) => update('apellido', e.target.value)}
            onBlur={(e) => validateField('apellido', e.target.value)}
            className={`mt-1 w-full border rounded p-2 ${errors.apellido ? 'border-red-500' : ''}`}
          />
          {errors.apellido && (
            <p className="text-red-600 text-sm mt-1">{errors.apellido}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Fecha de Nacimiento</label>
          <input
            type="date"
            required
            value={data.fechaNacimiento || ''}
            onChange={(e) => update('fechaNacimiento', e.target.value)}
            onBlur={(e) => validateField('fechaNacimiento', e.target.value)}
            className={`mt-1 w-full border rounded p-2 ${
              errors.fechaNacimiento ? 'border-red-500' : ''
            }`}
          />
          {errors.fechaNacimiento && (
            <p className="text-red-600 text-sm mt-1">{errors.fechaNacimiento}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Sexo</label>
          <select
            required
            value={data.sexo || ''}
            onChange={(e) => update('sexo', e.target.value)}
            onBlur={(e) => validateField('sexo', e.target.value)}
            className={`mt-1 w-full border rounded p-2 ${
              errors.sexo ? 'border-red-500' : ''
            }`}
          >
            <option value="">Selecciona</option>
            <option value="masculino">MASCULINO</option>
            <option value="femenino">FEMENINO</option>
          </select>
          {errors.sexo && (
            <p className="text-red-600 text-sm mt-1">{errors.sexo}</p>
          )}
        </div>

        {/* INFORMACIÓN DE CONTACTO */}
        <h3 className="text-lg font-semibold mt-8">Información de Contacto</h3>

        <div>
          <label className="block font-medium">Teléfono</label>
          <input
            type="tel"
            maxLength={8}
            required
            value={data.telefono || ''}
            onChange={(e) => update('telefono', e.target.value)}
            onBlur={(e) => validateField('telefono', e.target.value)}
            className={`mt-1 w-full border rounded p-2 ${errors.telefono ? 'border-red-500' : ''}`}
            placeholder="8 dígitos"
          />
          {errors.telefono && (
            <p className="text-red-600 text-sm mt-1">{errors.telefono}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Correo Electrónico</label>
          <input
            type="email"
            required
            value={data.correo || ''}
            onChange={(e) => update('correo', e.target.value)}
            onBlur={(e) => validateField('correo', e.target.value)}
            className={`mt-1 w-full border rounded p-2 ${errors.correo ? 'border-red-500' : ''}`}
            placeholder="usuario@ejemplo.com"
          />
          {errors.correo && (
            <p className="text-red-600 text-sm mt-1">{errors.correo}</p>
          )}
        </div>

        {/* MOTIVACIONES */}
        <h3 className="text-lg font-semibold mt-8">Motivaciones</h3>

        <div>
          <label className="block font-medium">Área de Enfoque</label>
          <select
            required
            value={data.areaEnfoque || ''}
            onChange={(e) => update('areaEnfoque', e.target.value)}
            onBlur={(e) => validateField('areaEnfoque', e.target.value)}
            className={`mt-1 w-full border rounded p-2 ${
              errors.areaEnfoque ? 'border-red-500' : ''
            }`}
          >
            <option value="">Selecciona</option>
            <option value="gimnasio">Gimnasio</option>
            <option value="academia">Academia</option>
          </select>
          {errors.areaEnfoque && (
            <p className="text-red-600 text-sm mt-1">{errors.areaEnfoque}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Academia de interés</label>
          <select
            required
            value={data.academiaFrequentada || ''}
            onChange={(e) => update('academiaFrequentada', e.target.value)}
            onBlur={(e) => validateField('academiaFrequentada', e.target.value)}
            className={`mt-1 w-full border rounded p-2 ${
              errors.academiaFrequentada ? 'border-red-500' : ''
            }`}
          >
            <option value="">Selecciona</option>
            {disciplinas.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          {errors.academiaFrequentada && (
            <p className="text-red-600 text-sm mt-1">{errors.academiaFrequentada}</p>
          )}
        </div>

        {/* BOTONES */}
        <div className="flex justify-between pt-6">
          <Button onClick={reset} variant="primary">
            Volver al menú
          </Button>
          <Button type="submit" disabled={!isValid}>Enviar Sesión de Prueba</Button>
        </div>
      </form>
    </>
  );
}
