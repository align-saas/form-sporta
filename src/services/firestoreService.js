// src/services/firestoreService.js
import { db } from '../firebase';
import { collection, doc, runTransaction, query, where, getDocs } from 'firebase/firestore';

export async function saveFormData(data) {
  if (!data.dpi) {
    throw new Error("El campo 'dpi' es obligatorio");
  }
  if (!data.typeForm) {
    throw new Error("El campo 'typeForm' es obligatorio");
  }

  const formsRef = collection(db, 'forms');

  try {
    const docId = await runTransaction(db, async (transaction) => {
      // Buscamos si ya existe un documento con la misma combinación dpi + typeForm
      const q = query(
        formsRef,
        where('dpi', '==', data.dpi),
        where('typeForm', '==', data.typeForm)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        throw new Error(
          `Ya existe un formulario con DPI ${data.dpi}'`
        );
      }

      // Si no existe, agregamos el nuevo documento
      const newDocRef = doc(formsRef); // Creamos referencia a nuevo doc
      transaction.set(newDocRef, data);
      return newDocRef.id;
    });

    console.log('Formulario guardado con ID:', docId);
    return docId;
  } catch (error) {
    console.error('Error guardando formulario:', error.message);
    throw error;
  }
}
