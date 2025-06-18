import { useContext } from 'react';
import { FormProvider, FormContext } from './context/FormContext';
import Home from './pages/Home';
import Stepper from './components/Stepper';
import GeneralInfo from './pages/GeneralInfo';
import ContactInfo from './pages/ContactInfo';
import Motivations from './pages/Motivations';
import Summary from './pages/Summary';
import SessionForm from './pages/SessionForm';
import MembershipForm from './pages/MembershipForm';
function StepContent() {
  const { step } = useContext(FormContext);
  switch (step) {
    case 1:
      return <GeneralInfo />;
    case 2:
      return <ContactInfo />;
    case 3:
      return <Motivations />;
    case 4: 
      return <MembershipForm />;
    case 5:
      return <Summary />;
    default:
      return null;
  }
}

// src/App.jsx (fragmento)
export default function App() {
  return (
    <FormProvider>
      <InnerApp />
    </FormProvider>
  );
}

function InnerApp() {
  const { formType } = useContext(FormContext);

  // Si no se ha elegido tipo, muestra Home
  if (!formType) {
    return <Home />;
  }

  if (formType === 'test') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6">
          <SessionForm />
        </div>
      </div>
    );
  }
  // Cuando el usuario elige "new", arranca el form
  if (formType === 'new' || formType === 'update') {
    return (
      <div className="relative">
        {/* logos aquí si los quieres */}
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6">
            {/* Contador de pasos ahora en 4 */}
            <div className="mt-6">
              <StepContent />
            </div>
            <br/>
            <Stepper />
          </div>
        </div>
      </div>
    );
  }

}