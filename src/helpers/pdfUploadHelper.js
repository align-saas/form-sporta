import { ref, uploadBytes } from 'firebase/storage';
import { pdfStorage } from '../firebase';

const TIME_ZONE = 'America/Guatemala';

const sanitizeFilePart = (value, fallback) => {
  const normalized = String(value || fallback)
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');

  return normalized || fallback;
};

export const getTodayForPdfName = (date = new Date()) => {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).formatToParts(date);
  const getPart = (type) => parts.find((part) => part.type === type)?.value;

  return `${getPart('year')}-${getPart('month')}-${getPart('day')}_${getPart('hour')}-${getPart('minute')}-${getPart('second')}`;
};

export const buildPdfFileName = ({ workerName, formType, date = new Date() }) => {
  const worker = sanitizeFilePart(workerName, 'sin_trabajador');
  const type = sanitizeFilePart(formType, 'FORMULARIO').toUpperCase();
  const today = getTodayForPdfName(date);

  return `${worker}_${type}_${today}.pdf`;
};

export const uploadPdf = async ({ pdfBlob, workerName, formType, folder = 'pdfs' }) => {
  if (!pdfBlob) {
    throw new Error('No se recibio el PDF para subir');
  }

  const fileName = buildPdfFileName({ workerName, formType });
  const storagePath = `${folder}/${fileName}`;
  const storageRef = ref(pdfStorage, storagePath);
  await uploadBytes(storageRef, pdfBlob, {
    contentType: "application/pdf",
  });

  return {
    fileName,
    storagePath,
  };
};
