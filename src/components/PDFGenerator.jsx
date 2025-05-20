// src/components/PDFGenerator.jsx
import { useContext } from 'react';
import { jsPDF } from 'jspdf';
import { FormContext } from '../context/FormContext';

export default function PDFGenerator({ sigCanvasRef }) {
  const { data } = useContext(FormContext);

  const generatePDF = () => {
    const doc = new jsPDF({ unit: 'pt', format: 'letter' });
    const margin = 40;
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const gap = 20;
    const colWidth = (pageWidth - margin * 2 - gap) / 2;
    let y = margin;

    // 1) Textos crudos del contrato
    const contrato = [
      'SPORTA ',
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
      ''
    ];

    doc.setFontSize(10);
    contrato.forEach((line) => {
      const wrapped = doc.splitTextToSize(line, pageWidth - margin * 2);
      doc.text(wrapped, margin, y);
      y += wrapped.length * 14;
      if (y > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
    });
    y += 20;

    // 3) Datos en dos columnas
    const entries = Object.entries(data).map(([k, v]) => {
      const label = k.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());
      return `${label}: ${v || '—'}`;
    });
    const half = Math.ceil(entries.length / 2);
    const col1 = entries.slice(0, half);
    const col2 = entries.slice(half);

    // Comprobación de espacio
    const neededHeight = y + Math.max(col1.length, col2.length) * 20 + margin;
    if (neededHeight > pageHeight) {
      doc.addPage();
      y = margin;
    }

    doc.setFontSize(10);
    col1.forEach((line, i) => {
      doc.text(line, margin, y + i * 20, { maxWidth: colWidth });
    });
    col2.forEach((line, i) => {
      doc.text(line, margin + colWidth + gap, y + i * 20, { maxWidth: colWidth });
    });

    // 4) Firma: imagen o línea
    const maxRows = Math.max(col1.length, col2.length);
    let yFirma = y + maxRows * 20 ;
    if (yFirma > pageHeight - margin) {
      doc.addPage();
      yFirma = margin + 20;
    }

    const sigCanvas = sigCanvasRef.current;
    if (sigCanvas && !sigCanvas.isEmpty()) {
      // usamos el canvas recortado
      const sigPad = sigCanvas.getSignaturePad();
      const imgData = sigPad.toDataURL('image/png');
      doc.addImage(imgData, 'PNG', margin, yFirma, 200, 80);
      doc.text('Firma', margin + 80, yFirma + 95);
    } else {
      doc.setLineWidth(0.5);
      doc.line(margin, yFirma, margin + 200, yFirma);
      doc.text('Firma', margin + 80, yFirma + 15);
    }

    // 5) Descargar
    doc.save('formulario_contrato.pdf');
  };

  return (
    <button
      onClick={generatePDF}
      className="px-4 py-2 bg-[#c7d52b] text-white rounded-lg shadow hover:bg-[#a9b22a]"
    >
      Descargar PDF
    </button>
  );
}
