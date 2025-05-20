import { createContext, useState } from 'react';

const initialData = {
  // General Info
  dpi: '', nombre: '', apellido: '', fechaNacimiento: '', sexo: '', nacionalidad: 'Guatemalteca', zona: '', profesion: '', consume: '',
  // Contact Info
  telefono: '', correo: '', telefonoEmergencia: '',
  // Motivations Info
  areaEnfoque: '', academiaFrequentada: '', motivoIngreso: '', tieneExperiencia: '', gimnasioAnterior: '', sigueDieta: '', tieneLesiones: '',
  // Nueva sección “Membresía y Pago”
  membershipType: '',        // '1 Persona' | '2 Personas' | '3+'
  membershipCount: '',       // texto libre para “3 personas o más”
  paymentMethod: '',         // 'Visacuotas' | 'TarjetaCredito' | 'Debito'
  creditAmount: '',          // número para “Tarjeta de Crédito Q. __”
  timestamp: '',      // ISO string timestamp
  typeForm: ''        // 'new' | 'test' | 'update'
};

export const FormContext = createContext();

export function FormProvider({ children }) {
  const [formType, setFormType] = useState(null);
  const [step, setStep] = useState(1);
  const [data, setData] = useState(initialData);

  const validateStep = () => {
    switch(step) {
      case 1:
        return [
          'dpi','nombre','apellido','fechaNacimiento',
          'sexo','nacionalidad','zona','consume'
        ].every(f => data[f] && data[f].toString().trim() !== '');
      case 2:
        return ['telefono','correo','telefonoEmergencia']
          .every(f => data[f] && data[f].toString().trim() !== '');
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
  const next = () => setStep((s) => Math.min(5, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));
  const update = (field, value) => setData((d) => ({ ...d, [field]: value }));
  const reset = () => {
    setFormType(null);
    setStep(1);
    setData(initialData);
  };

  return (
    <FormContext.Provider value={{ formType, setFormType, step, next, back, data, update, reset ,validateStep}}>
      {children}
    </FormContext.Provider>
  );
}
