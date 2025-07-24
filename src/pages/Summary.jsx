// src/pages/Summary.jsx
import { useContext, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { FormContext } from '../context/FormContext';
import Button from '../components/Button';
import PDFGenerator from '../components/PDFGenerator';
import { saveFormData } from '../services/firestoreService';
import { toast, Toaster } from 'react-hot-toast';
import sportaLogo from '../img/LOGO_SPORTA.png';
import { jsPDF } from 'jspdf';

export default function Summary() {
  const { formType,data, reset, update } = useContext(FormContext);
  const sigCanvas = useRef(null);
  const clearSignature = () => sigCanvas.current.clear();

  const handleSend = async () => {
    if(formType === 'new' && data.vendedor === ''){
      await toast.error(`EL campo Vendedor es obligatorio`);
      return;
    }
    try {
      const timestamp = new Date().toISOString();
      const typeFormValue = formType === 'update' ? 'UPDATE' : 'NEW';
      const dataToSave = { ...data, timestamp, typeForm: typeFormValue };
      const id = await saveFormData(dataToSave);
      if(formType === 'new' ) await generatePDFWhileSend();
      await toast.success(`Guardado correctamente con ID: ${id}`);
      reset();
    } catch (err) {
      console.error(err);
      toast.error('Error al guardar el formulario');
    }
  };

    const generatePDFWhileSend = async () => {
      // Convertir logo a DataURL
      const logoData = await new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          canvas.getContext('2d').drawImage(img, 0, 0);
          resolve(canvas.toDataURL('image/png'));
        };
        img.onerror = reject;
        img.src = sportaLogo;
      });
  
      const doc = new jsPDF({ unit: 'pt', format: 'letter' });
      const margin = 40;
      const pageWidth = doc.internal.pageSize.width;
      const pageHeight = doc.internal.pageSize.height;
      const gap = 20;
      let y = margin;
  
      // Logo centrado y título
      const logoW = 140;
      const logoH = 40;
      doc.addImage(logoData, 'PNG', (pageWidth - logoW) / 2, y, logoW, logoH);
      y += logoH + 10;
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      
      const title = 'Contrato de Nuevo Socio';
      // medimos el ancho del texto
      const textWidth = doc.getTextWidth(title);
      // calculamos la X para centrarlo
      const x = (pageWidth - textWidth) / 2;
      // dibujamos el texto
      doc.text(title, x, y);
      // dibujamos la línea justo 3 puntos debajo
      doc.setLineWidth(0.5);
      doc.line(x, y + 3, x + textWidth, y + 3);
  
      doc.setFont(undefined, 'normal');
      y += 17;
  
      // Datos principales: 4 columnas x 2 filas
      const fields = [
        ['DPI', data.dpi],
        ['Fecha Nacimiento', data.fechaNacimiento],
        ['Nombre', data.nombre],
        ['Apellido', data.apellido],
        ['NIT', data.nit],
        ['Teléfono', data.telefono],
        ['Tipo de Membresía', data.membershipType],
        ['Método de Pago', data.paymentMethod]
      ];
      const cols = 4;
      const cardW = (pageWidth - margin * 2 - (cols - 1) * gap) / cols;
      const cardH = 40;
      doc.setFontSize(10);
      fields.forEach((field, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = margin + col * (cardW + gap);
        const cy = y + row * (cardH + gap);
        doc.roundedRect(x, cy, cardW, cardH, 5, 5);
        doc.setFont(undefined, 'bold');
        doc.text(field[0], x + 8, cy + 14);
        doc.setFont(undefined, 'normal');
        doc.text(field[1] || '—', x + 8, cy + 30);
      });
      // --- Débito Automático ---
      doc.setFontSize(12)
      doc.setFont(undefined, 'bold')
      // Centrado
      const options = ['APLICA', 'NO APLICA']
      const colW = (pageWidth - margin * 2 - gap) / 2
      y += 2 * (cardH + gap);
      options.forEach((opt, i) => {
        const x = margin + i * (colW + gap)
        // tarjeta redondeada
        // doc.roundedRect(x, y, colW, cardH, 4, 4)
        // etiqueta centrada en la mitad superior
        doc.setFontSize(10)
        // doc.setFont(undefined, 'bold')
        doc.text(opt, x + colW / 2, y + 18, { align: 'center' })
  
        // dibujar la casilla (20×20) debajo de la etiqueta
        const boxSize = 20
        const bx = x + (colW - boxSize) / 2
        const by = y + 20
        doc.rect(bx, by, boxSize, boxSize)
      })
      doc.setFontSize(12)
      const sub = 'Débito Automático';
      // ancho del texto
      const subW = doc.getTextWidth(sub);
      // posición X centrada
      const subX = (pageWidth - subW) / 2;
      // dibuja el texto
      doc.text(sub, subX, y-5);
      // dibuja un subrayado 3pt abajo
      doc.setLineWidth(0.5);
      doc.line(subX, y-2, subX + subW, y-2);
      // ajustar y para lo que venga a continuación
      // y += cardH + 20
  
      y += 1.2 * cardH;
      const contrato = [
        '',
        '1. El total de su cuenta mensual será cargado a su tarjeta de crédito autorizada en este compromiso del uno al cinco de cada mes.',
        '2. Usted se compromete a que su cuenta sea cargada automáticamente durante un período mínimo de: *DOCE MESES o SEIS MESES* por el total de su cuota y la del resto del grupo en su cuenta.',
        '3. Todas las personas dentro del grupo deben de cumplir los meses de contrato acordados.',
        '4. Cualquier cambio o cancelación de membresía deberá informarse a la Administración de Sporta Guatemala, S.A. por escrito a más tardar el día 25 del mes anterior.',
        '5. Si usted o cualquier miembro de su grupo decide retirarse antes o después de los meses acordados, debe informar por escrito a Sporta Guatemala, S.A.; al finalizar la membresía esta se renueva de forma automática en el sistema, por lo que se seguirán efectuando cargos a su tarjeta de crédito por tiempo indefinido.',
        '6. Sporta Guatemala, S.A. aplicará cuota de mantenimiento si la persona lo solicita por escrito e informa la razón por la cual se ausentará. El precio por mantenimiento corresponde a Q250.00. Con la cuota de mantenimiento los miembros no pueden ingresar a las instalaciones durante el mes en el cual cancelen dicha cuota y no hay reposición de clases en academias.',
        '7. Las personas que no cumplan con el período mínimo del contrato deberán cancelar una penalización de Q450.00 (cuatrocientos cincuenta quetzales), por cada persona inscrita en esta forma de pago.',
        '8. Únicamente se acepta una tarjeta de crédito por cuenta y se emitirá una factura por cada cargo efectuado.',
        '9. A partir del 05 de cada mes, si su tarjeta es rechazada por cualquier razón, tendrá que cancelar su cuota directamente en recepción. Además, a partir del sexto día no se le permitirá el ingreso a las instalaciones a la persona o al grupo de personas que no hayan cancelado la cuota mensual. Sporta Guatemala, S.A. seguirá intentando hacer el cobro de cada mes.',
        '10. Bajo ninguna circunstancia, Sporta Guatemala, S.A. hace devoluciones de cargos a través de tarjeta de crédito ni en efectivo. Por lo tanto, asegúrese de informar sus cambios por escrito.',
        '11. Si existe un aumento en la cuota al finalizar su contrato, Sporta Guatemala, S.A. puede modificar el monto acorde con las nuevas cuotas.',
        '12. Su cargo será facturado cada mes. Dicha factura se envía a su correo electrónico registrado con nosotros.',
      ];
    
      doc.setFontSize(8);
      doc.setFont(undefined, 'normal');
      contrato.forEach((line) => {
        const wrapped = doc.splitTextToSize(line, pageWidth - margin * 2);
        doc.text(wrapped, margin, y);
        y += wrapped.length * 12;
        if (y > pageHeight - margin) {
          doc.addPage();
          y = margin;
        }
      });
      y += 20;
      // Sección de cobro manual
      doc.setFontSize(8);
      doc.setFont(undefined, 'bold');
      doc.text('Sporta Guatemala, S.A. se compromete a mantener la confidencialidad de la información que usted nos proporciona.', margin, y);
      doc.text('Datos de tarjeta de crédito solo aplicables a débito automático. (*)', margin, y+8);
      y += 20;
      // Nombre Tarjeta (full width)
      const nameW = pageWidth - margin * 2;
      const nameH = 35;  // aumentado para más espacio
      doc.rect(margin, y, nameW, nameH);
      doc.setFont(undefined, 'bold');
      doc.text('Nombre Tarjeta', margin + 8, y + 18);
      y += nameH + 17;
      // Cuatro campos (mayor altura para escribir manualmente)
      const smallW = (pageWidth - margin * 2 - 3 * gap) / 4;
      const smallH = 40;  // aumentado para más espacio
      const payFields = ['Tarjeta no.', 'Emisor', 'Fecha Vencimiento', 'NIT Facturación'];
      payFields.forEach((label, i) => {
        const x = margin + i * (smallW + gap);
        doc.roundedRect(x, y, smallW, smallH, 5, 5);
        doc.setFont(undefined, 'bold');
        doc.text(label, x + 8, y + 20);
      });
      y += smallH +10;
  
      // Firma Cliente y datos finales
      const sigX = margin;
      const sigY = y;
      const sigW = pageWidth * 0.6;
      const sigH = 80;
      
      const sig = sigCanvas.current;
      
      // Si hay dibujo, lo incrustamos dentro del recuadro
      if (sig && !sig.isEmpty()) {
        const imgData = sig.toDataURL('image/png');
        doc.addImage(imgData, 'PNG', sigX, sigY, sigW, sigH);
      } else {
        // Si no, dibujamos sólo la línea para firma física
        const lineY = sigY + sigH / 2;
        doc.setLineWidth(0.5);
        doc.line(sigX, lineY, sigX + sigW, lineY);
      }
      
      // Etiqueta «Firma Cliente» encima de la caja
      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.text('Firma Cliente', sigX, sigY + 7);
      // Timestamp y Carné Sporta
      const infoW = (pageWidth - margin * 2 - gap) / 2;
      [['Carné Sporta', data.carnet]].forEach((item, i) => {
        const x = margin + sigW + gap + i * (infoW + gap - infoW);
        doc.roundedRect(x, y, infoW, sigH / 2, 5, 5);
        doc.setFont(undefined, 'bold');
        doc.text(item[0], x + 8, y + 18);
        doc.setFont(undefined, 'normal');
        doc.text(String(item[1] || '—'), x + 8, y + 36);
      });
      const dateT = new Date();
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      // y lo colocas en la esquina inferior derecha
      doc.text(
        `Timestamp: ${dateT.toLocaleString()} `,
        pageWidth - margin,
        pageHeight - 10,    // 10pt por encima del borde inferior
        { align: 'right' }
      );
      doc.text(
        `Vendedor: ${data.vendedor} `,
        pageWidth - margin,
        pageHeight - 20,    // 10pt por encima del borde inferior
        { align: 'right' }
      );
      doc.save(`formulario_contrato_${data.dpi}.pdf`);
    };
  return (
    <>
    <Toaster />
    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center">Resumen de datos</h2>

      {/* Datos en tarjetas */}
      {formType === 'new'|| formType === 'update' && (
        <div>
          <label className="block font-medium">Vendedor</label>
          <input
            type="text"
            value={data.vendedor || ''}
            onChange={(e) => update('vendedor', e.target.value)}
            className={`mt-1 w-full border rounded p-2`}
            placeholder="ID Vendedor"
            required
          />
        </div>
      )}
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
        {
          formType === 'new' && (<PDFGenerator sigCanvasRef={sigCanvas} />)
        }
        <Button variant="primary" onClick={reset}>
          Volver al menú
        </Button>
      </div>
    </div>

    </>
  );
}
