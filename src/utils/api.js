export async function fetchProfesiones() {
    // Ejemplo de API: sustituye con la real
    const res = await fetch('https://api.example.com/profesiones');
    if (!res.ok) throw new Error('Error fetching profesiones');
    return res.json();
  }
  
  export async function fetchCountries() {
    const res = await fetch('https://restcountries.com/v3.1/all?fields=name');
    if (!res.ok) throw new Error('Error fetching countries');
    const data = await res.json();
    // Extraemos sólo el nombre común y ordenamos alfabéticamente
    return data
      .map((c) => c.name.common)
      .sort((a, b) => a.localeCompare(b, 'es'));
  }