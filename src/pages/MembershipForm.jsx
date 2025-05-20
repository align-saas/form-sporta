// src/pages/MembershipForm.jsx
import { useContext } from 'react';
import { FormContext } from '../context/FormContext';
import Button from '../components/Button';

export default function MembershipForm() {
  const { data, update } = useContext(FormContext);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Tipo de Membresía</h3>
      <div className="flex items-center space-x-4">
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="membershipType"
            value="1 Persona"
            checked={data.membershipType==='1 Persona'}
            onChange={e=>update('membershipType', e.target.value)}
          />
          <span className="ml-2">1 Persona</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="membershipType"
            value="2 Personas"
            checked={data.membershipType==='2 Personas'}
            onChange={e=>update('membershipType', e.target.value)}
          />
          <span className="ml-2">2 Personas</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="membershipType"
            value="3+"
            checked={data.membershipType==='3+'}
            onChange={e=>update('membershipType', e.target.value)}
          />
          <span className="ml-2">3 personas o más:</span>
          <input
            type="text"
            className="ml-2 border rounded p-1 w-16"
            placeholder="#"
            value={data.membershipCount}
            onChange={e=>update('membershipCount', e.target.value)}
          />
        </label>
      </div>

      <h3 className="text-lg font-semibold mt-8">Forma de Pago</h3>
      <div className="flex items-center space-x-4">
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="paymentMethod"
            value="Visacuotas"
            checked={data.paymentMethod==='Visacuotas'}
            onChange={e=>update('paymentMethod', e.target.value)}
          />
          <span className="ml-2">Visacuotas</span>
        </label>

        <label className="inline-flex items-center">
          <input
            type="radio"
            name="paymentMethod"
            value="TarjetaCredito"
            checked={data.paymentMethod==='TarjetaCredito'}
            onChange={e=>update('paymentMethod', e.target.value)}
          />
          <span className="ml-2">Tarjeta de Crédito Q.</span>
          <input
            type="number"
            className="ml-2 border rounded p-1 w-24"
            placeholder="0.00"
            value={data.creditAmount}
            onChange={e=>update('creditAmount', e.target.value)}
            disabled={data.paymentMethod!=='TarjetaCredito'}
          />
        </label>

        <label className="inline-flex items-center">
          <input
            type="radio"
            name="paymentMethod"
            value="Debito"
            checked={data.paymentMethod==='Debito'}
            onChange={e=>update('paymentMethod', e.target.value)}
          />
          <span className="ml-2">Débito Automático</span>
        </label>
      </div>
    </div>
  );
}
