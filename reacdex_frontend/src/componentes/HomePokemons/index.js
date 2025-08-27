import React, { useEffect, useState } from 'react';
import styled, { keyframes } from "styled-components";


const FrameCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto; 
  border-radius: 10px;
  background: linear-gradient(-45deg, #e3f5fd, #c9e9fa, #e3f5fd);


  // border: 2px solid #ccc;
`;

const PokemonCard = styled.div`
  // border: 2px solid #ccc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;  
  heigth: auto;
  padding: 15px;
  margin: 5px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
`;

const PokeNumber = styled.p`
  // border: 2px solid #ccc;
  font-size: 20px;
  font-family: 'Montserrat','Helvetica Neue',Arial,sans-serif;
  font-weight: 700;
  line-height: 1.5;
  letter-spacing: 0.5px;
  color: #333;
`;

const PokemonImage = styled.img`
  // border: 2px solid #ccc;
  height: 200px;  
  width: 200px;
`;

const PokeName = styled.p`
  // border: 2px solid #ccc;
  font-size: 20px;
  font-family: 'Montserrat','Helvetica Neue',Arial,sans-serif;
  font-weight: 700;
  line-height: 1.5;
  letter-spacing: 0.5px;
  color: #333;
`;

const PokemonImageTypeFrame = styled.div`
  // border: 2px solid #ccc;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  padding: 15px;
  margin: 5px;
`;

const PokemonImageType = styled.img`
  width: 30px;
  height: 30px; 
`;

const PokemonEvoGrid = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  padding: 15px;
  margin: 10px;
  border-radius: 5px;
  // border: 2px solid #ccc;
`;

const EvolveCard = styled.div`
  // border: 2px solid #ccc;

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  padding: 10px;
  heigth: 50px;
  width: 100px;
`;

const PokeImgEvo = styled.img`
  width: 40px;
  height: 40px; 
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

function normalizeNumber(num) {
  if (!num) return "";
  return String(num).padStart(3, "0");
}

// Extrai a chave/ID do Pokémon vindo da API de /home
function pokeKeyFromHome(pokemon) {
  // se vier como "id", usa direto; se vier como "number", normaliza
  return normalizeNumber(pokemon?.id ?? pokemon?.number ?? "");
}

// Retorna o número formatado para usar no src da imagem
function imageIdForSrc(pokemon) {
  // se passar um objeto, pega id/number; se passar string/num, normaliza direto
  if (typeof pokemon === "object") {
    return normalizeNumber(pokemon?.id ?? pokemon?.number ?? "");
  }
  return normalizeNumber(pokemon);
}

function HomePokemons() {
  const [pokemons, setPokemons] = useState([]);
  const [evolves, setEvolves] = useState([]);
  const [pokemonstype, setPokemonsType] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [resPokemons, resTypes, resEvolves] = await Promise.all([
          fetch("http://localhost:8000/home"),
          fetch("http://localhost:8000/types"),
          fetch("http://localhost:8000/evolves"),
        ]);

        if (!resPokemons.ok) throw new Error("Erro ao buscar pokemons");
        if (!resTypes.ok) throw new Error("Erro ao buscar types");
        if (!resEvolves.ok) throw new Error("Erro ao buscar evoluções");

        const pokemonsData = await resPokemons.json();
        const typesData = await resTypes.json();
        const evolvesData = await resEvolves.json();

        setPokemons(pokemonsData || []);
        setPokemonsType(typesData || []);
        setEvolves(evolvesData || []);
      } catch (err) {
        console.error("Falha no fetch:", err.message);
        setPokemons([]);
        setPokemonsType([]);
        setEvolves([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <Spinner />;
  if (!pokemons?.length) return <Spinner />;
  if (!pokemonstype?.length) return <Spinner />;
  if (!evolves?.length) return <Spinner />;

  const evoGroups = [];

  for (const chain of (evolves || [])) {
    const fullLine = [
      { number: chain?.pokemon?.number, name: chain?.pokemon?.name },
      ...((chain?.evolve) || []),
    ].filter(x => x && x.number);

    const group = fullLine
      .map(ev => pokemons.find(p => pokeKeyFromHome(p) === normalizeNumber(ev.number)))
      .filter(Boolean);

    if (group.length > 0) {
      evoGroups.push(group);
    }
  }

  const covered = new Set(
    evoGroups.flat().map(p => pokeKeyFromHome(p)).filter(Boolean)
  );

  const singles = pokemons.filter(p => {
    const key = pokeKeyFromHome(p);
    return key && !covered.has(key);
  });

  for (const single of singles) {
    evoGroups.push([single]);
  }

  return (
    <FrameCard>
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id ?? pokemon.number}>
          <PokeNumber>#{pokemon.id ?? (pokemon.number || "")}</PokeNumber>

          <PokemonImage
            src={
              pokemon.image ||
              `http://localhost:8000/home/${imageIdForSrc(pokemon)}/img`
            }
            alt={pokemon.name}
          />

          <PokeName>{pokemon.name}</PokeName>

          <PokemonImageTypeFrame>
            {(Array.isArray(pokemon.type) ? pokemon.type.slice(0, 2) : [pokemon.type])
              .filter(Boolean)
              .map((type) => (
                <PokemonImageType
                  key={type}
                  src={`http://localhost:8000/types/${encodeURIComponent(type)}.png`}
                  alt={String(type)}
                />
              ))}
          </PokemonImageTypeFrame>

          {evoGroups.map((group, idx) => (
            <PokemonEvoGrid>
              {group.map((pokemon) => (
                <EvolveCard>
                  <PokeImgEvo
                    src={
                      pokemon.image ||
                      `http://localhost:8000/home/${imageIdForSrc(pokemon)}/img`
                    }
                  />
                </EvolveCard>
              ))}
            </PokemonEvoGrid>
          ))}
        </PokemonCard>

      ))}
    </FrameCard>
  );
}

export default HomePokemons;
