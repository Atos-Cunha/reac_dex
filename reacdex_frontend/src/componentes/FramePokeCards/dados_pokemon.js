export const itens = Array.from({ length: 10 }).map((_, index) => {
  const id = index + 1;
  return {
    id,
    nome: `pokemon_${id}`, 
    src: `http://localhost:8000/home/${id}`
  };
});