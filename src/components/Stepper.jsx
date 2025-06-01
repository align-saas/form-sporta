import { useContext } from 'react';
import { FormContext } from '../context/FormContext';
import Button from './Button';

export default function Stepper() {
  const { step, next, back, validateStep } = useContext(FormContext);
  const max = 5; // ahora son 5 pasos
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow">
      <Button onClick={back} disabled={step === 1}>Atrás</Button>
      <div className="font-medium">Paso {step} de {max}</div>
      <Button onClick={next}  disabled={step === max || !validateStep()}>
        Siguiente
      </Button>
    </div>
  );
}
