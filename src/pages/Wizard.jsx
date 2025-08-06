// src/pages/Wizard.jsx
import { useEffect, useContext } from 'react';
import { FormContext } from '../context/FormContext';
import Stepper from '../components/Stepper';
import GeneralInfo from './GeneralInfo';
import ContactInfo from './ContactInfo';
import Motivations from './Motivations';
import MembershipForm from './MembershipForm';
import Summary from './Summary';

export default function Wizard({ formType }) {
    const { setFormType, step } = useContext(FormContext);

    // Al montarse, definimos si es 'new' o 'update'
    useEffect(() => {
        setFormType(formType);
    }, [formType, setFormType]);

    // Renderiza el paso actual
    let Step;
    switch (step) {
        case 1: Step = <GeneralInfo />; break;
        case 2: Step = <ContactInfo />; break;
        case 3: Step = <Motivations />; break;
        case 4:
        Step = formType === 'new'
            ? <MembershipForm />
            : <Summary />;
        break;
        case 5: Step = <Summary />; break;
        default: Step = null;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6">
            {Step}
            <br/>
            <Stepper />
        </div>
        </div>
    );
}
