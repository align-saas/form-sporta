// src/services/firestoreService.js
import { db } from '../firebase';
import { collection, doc, runTransaction, query, where, getDocs, getDoc } from 'firebase/firestore';

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

/**
 * Retrieves form data from Firestore
 * @param {Object} options - Query options
 * @param {string} options.id - Document ID to retrieve a specific form
 * @param {string} options.dpi - DPI to filter forms
 * @param {string} options.typeForm - Type of form to filter
 * @returns {Promise<Array|Object>} - Returns an array of forms or a single form object
 */
export async function getFormData(options = {}) {
  const formsRef = collection(db, 'forms');
  
  try {
    // If an ID is provided, get the specific document
    if (options.id) {
      const docRef = doc(db, 'forms', options.id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error(`No se encontró ningún formulario con ID: ${options.id}`);
      }
    }
    
    // If no ID but other filters are provided, query the collection
    if (options.dpi || options.typeForm) {
      let q = query(formsRef);
      
      if (options.dpi) {
        q = query(q, where('dpi', '==', options.dpi));
      }
      
      if (options.typeForm) {
        q = query(q, where('typeForm', '==', options.typeForm));
      }
      
      const querySnapshot = await getDocs(q);
      const forms = [];
      
      querySnapshot.forEach((doc) => {
        forms.push({ id: doc.id, ...doc.data() });
      });
      
      return forms;
    }
    
    // If no filters provided, return all forms
    const querySnapshot = await getDocs(formsRef);
    const forms = [];
    
    querySnapshot.forEach((doc) => {
      forms.push({ id: doc.id, ...doc.data() });
    });
    
    return forms;
  } catch (error) {
    console.error('Error recuperando formulario(s):', error.message);
    throw error;
  }
}

/**
 * Retrieves employee data from the Empleados collection in Firestore
 * @param {Object} options - Query options
 * @param {string} options.id - Document ID to retrieve a specific employee
 * @param {string} options.Nombre - Filter employees by first name
 * @param {string} options.Apellido - Filter employees by last name
 * @param {boolean} options.status - Filter employees by status
 * @returns {Promise<Array|Object>} - Returns an array of employees or a single employee object
 */
export async function getEmpleadosData(options = {}) {
  const empleadosRef = collection(db, 'Empleados');
  
  try {
    // If an ID is provided, get the specific document
    if (options.id) {
      const docRef = doc(db, 'Empleados', options.id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error(`No se encontró ningún empleado con ID: ${options.id}`);
      }
    }
    
    // If no ID but other filters are provided, query the collection
    if (options.Nombre || options.Apellido || options.Status !== undefined) {
      let q = query(empleadosRef);
      
      if (options.Nombre) {
        q = query(q, where('Nombre', '==', options.Nombre));
      }
      
      if (options.Apellido) {
        q = query(q, where('Apellido', '==', options.Apellido));
      }
      
      if (options.Status !== undefined) {
        q = query(q, where('Status', '==', options.Status));
      }
      
      const querySnapshot = await getDocs(q);
      const empleados = [];
      
      querySnapshot.forEach((doc) => {
        empleados.push({ id: doc.id, ...doc.data() });
      });
      
      return empleados;
    }
    
    // If no filters provided, return all employees
    const querySnapshot = await getDocs(empleadosRef);
    const empleados = [];
    
    querySnapshot.forEach((doc) => {
      empleados.push({ id: doc.id, ...doc.data() });
    });
    
    return empleados;
  } catch (error) {
    console.error('Error recuperando empleado(s):', error.message);
    throw error;
  }
}
