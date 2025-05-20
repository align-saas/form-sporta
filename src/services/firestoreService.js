// src/services/firestoreService.js
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

export async function saveFormData(data) {
  try {
    const docRef = await addDoc(collection(db, 'forms'), data);
    console.log('Formulario guardado con ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error guardando formulario:', error);
    throw error;
  }
}
