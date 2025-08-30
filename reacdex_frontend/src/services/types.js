import axios from "axios";

const list_api = axios.create({baseURL: "http://localhost:8000/types"});

async function listTypes() {
    const response = await list_api.get('/');

    return response.data;
}

// export const listPokemon = Array.from({ length: 10 }).map((_, index) => {
//   const nome = index + 1;
//   return {
//     nome;    nome: `pokemon_${id}`, 
//     src: `http://localhost:8000/type/${id}`
//   };
// });

export {
    listTypes
}


