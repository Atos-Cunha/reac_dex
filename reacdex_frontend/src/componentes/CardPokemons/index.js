import { useEffect, useState } from 'react';
import styled, { keyframes } from "styled-components";

const moveBackground = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const Card = styled.div`
  height: auto;
  margin: 0 auto; 
  // background-image: linear-gradient(60deg, #08416cff 0%, #bde8fbff 100%);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;

  background: linear-gradient(-45deg, #e3f5fd, #c9e9fa, #e3f5fd);
  background-size: 400% 400%;
  animation: ${moveBackground} 10s ease infinite;
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

const PokemonEvoGrid = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 15px;
  margin: 10px;
  border-radius: 8px;
  background-color: #e3f5fd;
  // background-image: linear-gradient(60deg, #08416cff 0%, #bde8fbff 100%);
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  gap: 15px;
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
  height: 200px;  
  width: 200px;
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
  gap: 6px;
  padding: 15px;
  margin: 5px;
`;

const PokemonImageType = styled.img`
  width: 30px;
  height: 30px; 
`;

const Arrow = styled.span`
  font-size: 30px;
  font-weight: bold;
  color: #000;
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

/* normaliza '#001' / '001' / 1 -> '1' */
function normalizeNumber(value) {
  if (value === undefined || value === null) return null;
  const s = String(value);
  const digits = s.replace(/\D/g, "");
  if (!digits) return null;
  return String(parseInt(digits, 10));
}

/* id/number normalizado de um Pokémon do /home */
function pokeKeyFromHome(p) {
  return normalizeNumber(p?.number) ?? normalizeNumber(p?.id);
}

/* monta id da imagem */
function imageIdForSrc(obj) {
  if (obj == null) return "";
  if (obj.id !== undefined && obj.id !== null) return String(obj.id);
  if (obj.number) {
    const raw = String(obj.number).replace(/^#/, "");
    if (raw) return raw;
  }
  return normalizeNumber(obj.number) || "";
}

function CardPokemons() {
  const [pokemons, setPokemons] = useState([]);
  const [evolves, setEvolves] = useState([]);
  const [pokemonstype, setPokemonsType] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [resPokemons, resTypes, resEvolves] = await Promise.all([
          fetch("http://localhost:8000/home"),
          fetch("http://localhost:8000/type"),
          fetch("http://localhost:8000/evolve"),
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

  // ---- AGRUPA por cadeias evolutivas (e adiciona "solteiros") ----
  const evoGroups = [];

  // 1) grupos vindos do /evolve
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

  // 2) adiciona pokémon que não apareceu em nenhuma cadeia (sem evolução)
  const covered = new Set(
    evoGroups.flat().map(p => pokeKeyFromHome(p)).filter(Boolean)
  );

  const singles = pokemons.filter(p => {
    const key = pokeKeyFromHome(p);
    return key && !covered.has(key);
  });

  for (const single of singles) {
    evoGroups.push([single]); // um grid com um único card
  }

  return (
    <Card>
      {evoGroups.map((group, idx) => (
        <PokemonEvoGrid key={idx}>
          {group.map((pokemon, i) => (
            <div key={pokemon.id ?? pokemon.number} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <PokemonCard>
                <PokeNumber>#{pokemon.id ?? (pokemon.number || "")}</PokeNumber>

                <PokemonImage
                  src={
                    pokemon.image ||
                    `http://localhost:8000/home/${imageIdForSrc(pokemon)}/img`
                  }
                  alt={pokemon.name}
                />

                <PokeName style={{ textTransform: "uppercase" }}>
                  {pokemon.name}
                </PokeName>

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
              </PokemonCard>

              {i < group.length - 1 && <Arrow>→</Arrow>}
            </div>
          ))}
        </PokemonEvoGrid>
      ))}
    </Card>
  );
}

export default CardPokemons;
