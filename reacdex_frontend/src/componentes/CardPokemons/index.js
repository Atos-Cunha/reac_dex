import { useEffect, useState } from 'react';
import styled, { keyframes } from "styled-components";
import EvolvePokemons from '../EvolvePokemons';

const Card = styled.div`
  height: auto;
  margin: 0 auto; 
  background-color: #e3f5fd;
  border-radius: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
`;
const PokemonCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  margin: 5px;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
`;
const PokeNumber = styled.p`
  font-size: 20px;
  font-family: 'Montserrat','Helvetica Neue',Arial,sans-serif;
  font-weight: 700;
  line-height: 1.5;
  letter-spacing: 0.5px;
  color: #333;
`;

const PokemonImage = styled.img`
  width: 200px;
  height: 150px;
`;

const PokeName = styled.p`
  font-size: 20px;
  font-family: 'Montserrat','Helvetica Neue',Arial,sans-serif;
  font-weight: 700;
  line-height: 1.5;
  letter-spacing: 0.5px;
  color: #333;
`;

const PokemonImageTypeFrame = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  gap: "6px";
  padding: 15px;
  margin: 5px;
`;
const PokemonImageType = styled.img`
  width: 20px;
  height: 20px; 
`;

const PokeEvolveFrame = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  gap: "6px";
  padding: 15px;
  margin: 5px;
`;
const PokemonImageEvo = styled.img`
  width: 20px;
  height: 20px; 
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
  animation: ${spin} 1s linear infinite;
  margin: 50px auto;
`;

function CardPokemons() {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonstype, setPokemonsType] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPokemons() {
      try {
        const response = await fetch("http://localhost:8000/home");
        if (!response.ok) throw new Error("Erro ao buscar pokemons");
        const data = await response.json();
        setPokemons(data);
      } catch (err) {
        console.error("Falha no fetch:", err.message);
        setPokemons([]);
      } finally {
        setLoading(false);
      }
    }
    fetchPokemons();
  }, []);

  useEffect(() => {
    async function fetchPokemonsType() {
      try {
        const response = await fetch("http://localhost:8000/type");
        if (!response.ok) throw new Error("Erro ao buscar types");
        const data = await response.json();
        setPokemonsType(data);
      } catch (err) {
        console.error("Falha no fetch:", err.message);
        setPokemonsType([]);
      } finally {
        setLoading(false);
      }
    }
    fetchPokemonsType();
  }, []);

  if (loading || pokemons.length === 0) {
    return <Spinner />;
  }
  if (loading || pokemonstype.length === 0) {
    return <Spinner />;
  }
  return (
    <Card>
      {pokemons.map((pokemon, pokemonstype) => (
        <PokemonCard key={pokemon.id}>

          {/* numero */}
          <PokeNumber>#{pokemon.id}</PokeNumber>

          {/* imagem do pokemon */}
          <PokemonImage
            src={pokemon.image || `http://localhost:8000/home/${pokemon.id}/img`}
            alt={pokemon.name}
          />

          {/* nome */}
          <PokeName style={{ textTransform: "uppercase" }}>{pokemon.name}</PokeName>

          {/* imagens dos tipos */}
          <PokemonImageTypeFrame>
            {(Array.isArray(pokemon.type) ? pokemon.type.slice(0, 2) : [pokemon.type])
              .filter(Boolean)
              .map((type) => (

                <PokemonImageType
                  key={type}
                  src={`http://localhost:8000/type/${encodeURIComponent(type)}.png`}
                  alt={String(type)}
                />

              ))}
          </PokemonImageTypeFrame>

          {/* evolucao */}

          <EvolvePokemons />

          <PokeEvolveFrame>
            {pokemon.evolves ? "Evolui" : "Não evolui"}

          </PokeEvolveFrame>
        </PokemonCard>
      ))}
    </Card>
  );
}

export default CardPokemons;
