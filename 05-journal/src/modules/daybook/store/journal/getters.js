// export const myGetter = ( state ) => {
//     return state.myState;
// };

export const getEntriesByTerm =
  (state) =>
  (term = '') => {
    if (term.length === 0) return state.entries;

    return state.entries.filter((entry) => entry.text.toLowerCase().includes(term.toLowerCase()));
  };

export const getEntryById =
  (state) =>
  (id = '') => {
    const entry = state.entries.find((entry) => entry.id === id);

    if (!entry) return;

    // Se evita el paso de una referencia al objeto y se devuelve una copia
    // De esta forma no se modifica el state original
    return { ...entry };
  };
