import styled, { keyframes } from "styled-components";
import { useEffect, useState } from 'react';
import Input from "../Input";
import { post_fav } from "../../services/fav";

const PesquisaContainer = styled.section`
  background-image: linear-gradient(90deg, #002F52 35%, #326589 165%);
  color: #FFF;
  text-align: center;
  padding: 40px 0;
  width: 80%;
  margin: auto;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  transition: all 0.3s ease;
`;

const Titulo = styled.h2`
  color: #FFF;
  font-size: 36px;
  text-align: center;
  width: 100%;
`;

const ResultadosGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); 
  max-width: 1000px;
  margin: 20px auto;
  gap: 20px;
`;

const Resultado = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 10px;
  border-radius: 12px;
  text-align: center;
  cursor: pointer;
  transition: 0.2s;

  p {
    margin-top: 8px;
    font-size: 14px;
    color: #fff;
  }

  img {
    width: 100px;
    height: 100px;
    object-fit: contain;
  }
  
  &:hover {
    border: 1px solid white;
    transform: scale(1.05);
  }
`;

const PokemonImage = styled.img`
  width: 200px;
  height: 150px;
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
