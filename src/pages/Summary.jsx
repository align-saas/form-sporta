// src/pages/Summary.jsx
import { useContext, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { FormContext } from '../context/FormContext';
import Button from '../components/Button';
import PDFGenerator from '../components/PDFGenerator';
import { saveFormData } from '../services/firestoreService';
import { toast, Toaster } from 'react-hot-toast';
export default function Summary() {
  const { formType,data, reset } = useContext(FormContext);
  const sigCanvas = useRef(null);
  const clearSignature = () => sigCanvas.current.clear();

  const handleSend = async () => {
    try {
      const timestamp = new Date().toISOString();
      const typeFormValue = formType === 'update' ? 'UPDATE' : 'NEW';
      const dataToSave = { ...data, timestamp, typeForm: typeFormValue };
      const id = await saveFormData(dataToSave);
      toast.success(`Guardado correctamente con ID: ${id}`);
      reset();
    } catch (err) {
      console.error(err);
      toast.error('Error al guardar el formulario');
    }
  };

  return (
    <>
    <Toaster />
    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center">Resumen de datos</h2>

      {/* Datos en tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {Object.entries(data)
        .filter(([key]) => ![
          'profesion',
          'membershipCount', 'creditAmount', 
          'typeForm',
          'timestamp'].includes(key))
        .map(([key, value]) => (
          <div key={key} className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <span className="text-gray-500 text-xs uppercase">
              {key.replace(/([A-Z])/g, ' $1')}
            </span>
            <p className="mt-1 text-lg font-medium text-gray-800">
              {value || '—'}
            </p>
          </div>
        ))}
      </div>

      <hr className="border-gray-200" />

      {/* Firma digital */}
      <div className="space-y-2">
        <label className="block text-lg font-medium">Firma</label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg">
          <SignatureCanvas
            ref={sigCanvas}
            penColor="black"
            canvasProps={{
              width: 600,
              height: 200,
              className: 'w-full h-48'
            }}
          />
        </div>
        <Button onClick={clearSignature} variant="primary">
          Borrar Firma
        </Button>
      </div>

      <hr className="border-gray-200" />

      {/* Acciones */}
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <Button variant="success" onClick={handleSend}>
        {formType === 'update' ? 'Actualizar Datos' : 'Enviar Formulario'}
        </Button>
        <PDFGenerator sigCanvasRef={sigCanvas} />
        <Button variant="primary" onClick={reset}>
          Volver al menú
        </Button>
      </div>
    </div>

    </>
  );
}
