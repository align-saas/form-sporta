import { useContext, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { FormContext } from '../context/FormContext';
import Button from '../components/Button';
import PDFGenerator from '../components/PDFGenerator';
import { saveFormData } from '../services/firestoreService';
export default function Summary() {
  const { data,reset , update} = useContext(FormContext);
  const sigCanvas = useRef(null);
  const clearSignature = () => sigCanvas.current.clear();
  const handleSend = async () => {
    try {
      const timestamp = new Date().toISOString();
      const typeFormValue = 'NEW';
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
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Resumen de datos</h2>
      <div className="grid grid-cols-2 gap-3">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex">
            <span className="w-40 font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
            <span className="ml-2">{value || '—'}</span>
          </div>
        ))}
      </div>
      <div>
        <label className="block font-medium mb-2">Firma (dibuje aquí):</label>
        <div className="border border-gray-300 rounded">
          <SignatureCanvas
            ref={sigCanvas}
            penColor="black"
            canvasProps={{ 
              width: 500, 
              height: 200, 
              className: 'w-full h-48' 
            }}
          />
        </div>
        <button
          onClick={clearSignature}
          className="mt-2 text-sm text-gray-600 hover:underline"
        >
          Borrar Firma
        </button>
      </div>
      <div className="flex justify-end pt-4">
        <Button variant="success" onClick={handleSend}>Enviar Formulario</Button>
      </div>
      <div className="flex justify-end pt-4">
        <PDFGenerator sigCanvasRef={sigCanvas} />
      </div>
      <div className="flex justify-center pt-4">
        <Button onClick={reset}>Volver al menú</Button>
      </div>
    </div>
  );
}