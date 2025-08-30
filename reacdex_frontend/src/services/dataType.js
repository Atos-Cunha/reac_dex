export const listPokemon = Array.from({ length: 10 }).map((_, index) => {
  const nome = index + 1;
  return {
    id,
    nome: `pokemon_${id}`, 
    src: `http://localhost:8000/types/${id}`
  };
});