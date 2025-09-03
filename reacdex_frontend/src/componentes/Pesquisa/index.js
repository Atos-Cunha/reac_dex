import styled, { keyframes } from "styled-components";
import { useEffect, useState } from 'react';
import Input from "../Input";
import { post_fav } from "../../services/fav";

const PesquisaContainer = styled.section`
  // background: linear-gradient(150deg,  #dee2e8ff 0%,  #3a6ea5 25%,  #002f52 75%,  #002f52 100%);  
  // background-color: #ffffff24;
  color: #000;
  width: 80%;
  padding: 40px 0;
  margin: auto;  
  text-align: center;
  border-radius: 20px;
  // border: 1px solid #fff;
  // border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(6px);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  transition: all 0.3s ease;
`;

const Titulo = styled.h2`
  color: #000;
  font-size: 35px;
  text-align: center;
  width: 100%;
`;

const ResultadosGrid = styled.div`
  color: #000;  
  width: 80%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); 
  max-width: 1000px;
  margin: 20px auto;
  gap: 20px;
  border-radius: 20px;
`;

const Resultado = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: 5px;
  border: #fff;
  border-radius: 20px;
  text-align: center;
  cursor: pointer;
  transition: 0.2s;
  p {
    margin-top: 8px;
    font-size: 15px;
    color: #000;
  }

  img {
    width: 75px;
    height: 75px;
    object-fit: contain;
  }
  
  &:hover {
    border: 1px solid #fff;
    transform: scale(1.09);
  }
`;

const PokemonImage = styled.img`
  width: 200px;
  height: 200px;
`;

const spin = keyframes`
0% { transform: rotate(0deg); } 
100% { transform: rotate(360deg); }
 `;

const Spinner = styled.div`
border: 6px solid #f3f3f3;
border-top: 6px solid #3498db;
border-radius: 50%;
width: 60px;
height: 60px;
animation: ${spin} 1s linear infinite; margin: 50px auto;
`;
function Pesquisa() {
  const [allPokemons, setAllPokemons] = useState([]); // todos os pokémons
  const [pokemons, setPokemons] = useState([]);       // resultados filtrados
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPokemons() {
      try {
        const response = await fetch("http://localhost:8000/home");
        if (!response.ok) throw new Error("Erro ao buscar pokemons");
        const data = await response.json();
        setAllPokemons(data); // guarda todos os pokémons, mas não mostra ainda
      } catch (err) {
        console.error("Falha no fetch:", err.message);
        setAllPokemons([]);
      } finally {
        setLoading(false);
      }
    }
    fetchPokemons();
  }, []);

  async function insert_fav(id) {
    await post_fav(id);
    alert(`Item de id:${id} inserido!`);
  }

  function handleSearch(evento) {
    const textoDigitado = evento.target.value;
    if (textoDigitado.trim() === "") {
      setPokemons([]); // se o campo estiver vazio, não mostra nada
      return;
    }

    const resultadoPesquisa = allPokemons.filter(pokemon =>
      pokemon.name?.toLowerCase().includes(textoDigitado.toLowerCase())
    );
    setPokemons(resultadoPesquisa);
  }

  if (loading) return <Spinner />;

  return (
    <PesquisaContainer>
      <Titulo>Pesquise por um pokemon</Titulo>
      <Input
        placeholder="Pesquise por nome"
        onChange={handleSearch} // melhor usar onChange do que onBlur
      />

      {pokemons.length > 0 && (
        <ResultadosGrid>
          {pokemons.map(pokemon => (
            <Resultado key={pokemon.id} onClick={() => insert_fav(pokemon.id)}>
              <PokemonImage
                src={pokemon.image || `http://localhost:8000/home/${pokemon.id}/img`}
                alt={pokemon.name}
              />
              <p>{pokemon.name}</p>
            </Resultado>
          ))}
        </ResultadosGrid>
      )}
    </PesquisaContainer>
  );
}

export default Pesquisa;
