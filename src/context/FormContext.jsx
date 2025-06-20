import { createContext, useState } from 'react';

const initialData = {
  // General Info
  dpi: '', nombre: '',nit:'', apellido: '', fechaNacimiento: '', sexo: '', nacionalidad: 'Guatemalteca', zona: '', profesion: '', consume: '', carnet: '',  
  // Contact Info
  telefono: '', correo: '', telefonoEmergencia: '',telefonoExtranjero: '',
  // Motivations Info
  areaEnfoque: '', academiaFrequentada: '', motivoIngreso: '', tieneExperiencia: '', gimnasioAnterior: '', sigueDieta: '', tieneLesiones: '',
  // Nueva sección “Membresía y Pago”
  membershipType: '',        // '1 Persona' | '2 Personas' | '3+'
  membershipCount: '',       // texto libre para “3 personas o más”
  paymentMethod: '',         // 'Visacuotas' | 'TarjetaCredito' | 'Debito'
  creditAmount: '',          // número para “Tarjeta de Crédito Q. __”
  timestamp: '',      // ISO string timestamp
  typeForm: '',        // 'new' | 'test' | 'update'
  vendedor: ''
};

export const FormContext = createContext();

export function FormProvider({ children }) {
  const [formType, setFormType] = useState(null);
  const [step, setStep] = useState(1);
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const updateError = (field, message) => {
    setErrors(e => ({ ...e, [field]: message }));
  };

  const validateStep = () => {
    switch(step) {
      case 1: {
        const baseRequired = ['dpi','nit','nombre','apellido','fechaNacimiento','sexo','nacionalidad','zona','consume'];
        const required = formType === 'update'? [...baseRequired, 'carnet']  : baseRequired;
        return required.every((f) => {
          const val = data[f]?.toString().trim();
          return Boolean(val) && !errors[f];
        });
      }
      case 2: {
        const required = ['telefono','correo','telefonoEmergencia'];
        return required.every(f => data[f] && !errors[f]);
      }
      case 3:
        return ['areaEnfoque','academiaFrequentada','motivoIngreso']
          .every(f => data[f] && data[f].toString().trim() !== '');
      case 4:
        return ['membershipType','paymentMethod']
          .every(f => data[f] && data[f].toString().trim() !== '');
      default:
        return true;
    }
  };
  const next = () => setStep((s) => {
    // Si venimos de "update" y acabamos el paso 3, saltamos al 5
    if (formType === 'update' && s === 3) {
      return 5;
    }
    return Math.min(5, s + 1);
  });

  const back = () => setStep((s) => {
    // Si venimos de "update" y estamos en el 5 (summary), volvemos al 3
    if (formType === 'update' && s === 5) {
      return 3;
    }
    return Math.max(1, s - 1);
  });
  const update = (field, value) => setData((d) => ({ ...d, [field]: value }));
  const reset = () => {
    setFormType(null);
    setStep(1);
    setData(initialData);
    setErrors({});
  };

  return (
    <FormContext.Provider value={{
        formType, setFormType,
        step, next, back,
        data, update, reset,
        validateStep,
        errors,       
        updateError
      }}>
      {children}
    </FormContext.Provider>
  );
}
