import { useEffect, useState } from 'react';
import styled, { keyframes } from "styled-components";

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

const EvoLine = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  // margin-top: 8px;
`;

const PokeImgEvo = styled.img`
  width: 35px;
  height: 35px; 
`;

const Arrow = styled.span`
  font-size: 20px;
  font-weight: bold;
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

/* helper para normalizar '#001' / '001' / 1 -> '1' (string) */
function normalizeNumber(value) {
  if (value === undefined || value === null) return null;
  const s = String(value);
  const digits = s.replace(/\D/g, "");
  if (!digits) return null;
  // remove zeros à esquerda: parseInt -> '1' de '001'
  return String(parseInt(digits, 10));
}

/* helper para montar src da imagem com fallback */
function imageIdForSrc(obj) {
  // tenta id (numérico) primeiro, senão number (raw), senão normalized digits
  if (obj == null) return "";
  if (obj.id !== undefined && obj.id !== null) return String(obj.id);
  if (obj.number) {
    // se number já tiver formato utilizável, remova apenas o '#'
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

        // descomente para debug rápido:
        // console.log("pokemons", pokemonsData);
        // console.log("evolves", evolvesData);

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
  if (!pokemons || pokemons.length === 0) return <Spinner />;
  if (!pokemonstype || pokemonstype.length === 0) return <Spinner />;

  return (
    <Card>
      {pokemons.map((pokemon) => {
        const pokeKey = normalizeNumber(pokemon.number) || normalizeNumber(pokemon.id);

        // pega a cadeia evolutiva completa
        let baseEntry = evolves.find(ev =>
          normalizeNumber(ev?.pokemon?.number) === pokeKey ||
          (Array.isArray(ev.evolve) && ev.evolve.some(child => normalizeNumber(child.number) === pokeKey))
        );

        let fullEvoLine = [];
        if (baseEntry) {
          fullEvoLine = [
            { number: baseEntry.pokemon.number, name: baseEntry.pokemon.name },
            ...(baseEntry.evolve || [])
          ];
        }

        return (
          <PokemonCard key={pokemon.id ?? pokemon.number}>
            <PokeNumber>#{pokemon.id ?? (pokemon.number || "")}</PokeNumber>

            <PokemonImage
              src={
                pokemon.image ||
                `http://localhost:8000/home/${imageIdForSrc(pokemon)}/img`
              }
              alt={pokemon.name}
            />

            <PokeName style={{ textTransform: "uppercase" }}>{pokemon.name}</PokeName>

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

            {fullEvoLine && fullEvoLine.length > 1 && (
              <EvoLine>
                {fullEvoLine.map((ev, idx) => {
                  const evImgId =
                    (ev.number ? String(ev.number).replace(/\D/g, "") : normalizeNumber(ev.number)) ||
                    ev.number ||
                    ev.name;

                  return (
                    <span key={`${evImgId}-${ev.name}`} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      {idx > 0 && <Arrow>→</Arrow>}
                      <PokeImgEvo
                        src={`http://localhost:8000/home/${evImgId}/img`}
                        // alt={ev.name}
                        onError={(e) => {
                          // fallback se a rota com números sem zeros à esquerda der 404
                          if (ev.number && !String(ev.number).includes(evImgId)) {
                            e.currentTarget.src = `http://localhost:8000/home/${encodeURIComponent(ev.number)}/img`;
                          }
                        }}
                      />
                      {/* <span style={{ fontSize: 12 }}>{ev.name}</span> */}
                    </span>
                  );
                })}
              </EvoLine>
            )}
          </PokemonCard>
        );
      })}
    </Card>
  );
}

export default CardPokemons;
