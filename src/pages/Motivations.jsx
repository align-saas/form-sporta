// src/pages/Motivations.jsx
import { useContext } from 'react';
import { FormContext } from '../context/FormContext';

export default function Motivations() {
  const { data, update } = useContext(FormContext);

  const disciplinas = [
    'GIMNASIO UNICAMENTE', 'ATLETISMO', 'SQUASH', 'NATACION', 'GIMNASIA',
    'KARATE', 'TENIS', 'CALISTENIA', 'JAZZ', 'BALLET',
    'CONTEMPLO', 'FLEX', 'CROSSFIT', 'CROSSFIT KIDS', 'TELAS',
    'HIP HOP', 'BOXEO'
  ];

  const motivosIngreso = [
    'PERDIDA DE PESO', 'GANAR MASA MUSCULAR', 'MEJORAR RESISTENCIA/CARDIO',
    'TONIFICAR CUERPO', 'APRENDER/MEJORAR ALGUNA DISCIPLINA', 'SALUD/BIENESTAR',
    'REDUCCION DE ESTRES', 'RECOMENDACION DEL MEDICO'
  ];

  const gimnasiosAnteriores = [
    'CASA', 'RESIDENCIAL', 'CLUB SOCIAL', 'SMART FIT', 'FITNESS ONE',
    'SCANDINAVIA', 'FUTECA', 'GO FIT', 'DINAMIC', 'ATLETIC','SPORTA', 
    'IMPULSO', 'OLIMPO', 'XSPORT', 'LEGACY', 'ORANGE THEORY', 'CROSS FIT'
  ];

  const dietas = [
    'NORMAL', 'MEDITERRANEA', 'KETO', 'FASTING',
    'VEGETARIANA', 'VEGANA', 'SIN GLUTEN'
  ];

  const lesiones = [
    'NINGUNA', 'LUMBAR', 'RODILLA', 'HOMBRO',
    'CODO', 'TOBILLO'
  ];

  return (
    <div className="space-y-4">
      {/*  Área de Enfoque */}
      <div>
        <label className="block font-medium">Área de Enfoque</label>
        <select
          required
          value={data.areaEnfoque}
          onChange={(e) => update('areaEnfoque', e.target.value)}
          className="mt-1 w-full border rounded p-2"
        >
          <option value="">Selecciona</option>
          <option value="gimnasio">GIMNACIO</option>
          <option value="academia">ACADEMIA</option>
        </select>
      </div>

      {/* 1. Academia frecuentada */}
      <div>
        <label className="block font-medium">Academia de interés</label>
        <select
          value={data.academiaFrequentada}
          onChange={(e) => update('academiaFrequentada', e.target.value)}
          className="mt-1 w-full border rounded p-2"
        >
          <option value="">Selecciona</option>
          {disciplinas.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {/* 2. Motivo de ingreso */}
      <div>
        <label className="block font-medium">Motivo de ingreso</label>
        <select
          value={data.motivoIngreso}
          onChange={(e) => update('motivoIngreso', e.target.value)}
          className="mt-1 w-full border rounded p-2"
        >
          <option value="">Selecciona</option>
          {motivosIngreso.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      {/* 3. Experiencia previa */}
      <div>
        <label className="block font-medium">¿Tiene experiencia previa en gimnasios?</label>
        <select
          required
          value={data.tieneExperiencia}
          onChange={(e) => update('tieneExperiencia', e.target.value)}
          className="mt-1 w-full border rounded p-2"
        >
          <option value="">Selecciona</option>
          <option value="si">Si</option>
          <option value="no">No</option>
        </select>
      </div>

      {/* 4. Gimansio anterior */}
      <div>
        <label className="block font-medium">¿Cuál era su gimnasio anterior?</label>
        <select
          value={data.gimnasioAnterior}
          onChange={(e) => update('gimnasioAnterior', e.target.value)}
          className="mt-1 w-full border rounded p-2"
        >
          <option value="">Selecciona</option>
          {gimnasiosAnteriores.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>

      {/* 5. Sigue alguna dieta */}
      <div>
        <label className="block font-medium">¿Sigue alguna dieta?</label>
        <select
          value={data.sigueDieta}
          onChange={(e) => update('sigueDieta', e.target.value)}
          className="mt-1 w-full border rounded p-2"
        >
          <option value="">Selecciona</option>
          {dietas.map((diet) => (
            <option key={diet} value={diet}>{diet}</option>
          ))}
        </select>
      </div>

      {/* 6. Tiene lesiones */}
      <div>
        <label className="block font-medium">¿Tiene lesiones?</label>
        <select
          value={data.tieneLesiones}
          onChange={(e) => update('tieneLesiones', e.target.value)}
          className="mt-1 w-full border rounded p-2"
        >
          <option value="">Selecciona</option>
          {lesiones.map((les) => (
            <option key={les} value={les}>{les}</option>
          ))}
        </select>
      </div>
    </div>
  );
}