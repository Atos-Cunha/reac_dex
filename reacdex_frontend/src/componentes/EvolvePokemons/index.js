import { useEffect, useState } from 'react';
import styled from "styled-components";

const PokeEvolveFrame = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 15px;
`;

const PokemonCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid #ccc;
  border-radius: 10px;
  padding: 10px;
`;

const EvoLine = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
`;

const PokeImgEvo = styled.img`
  width: 60px;
  height: 60px; 
`;

const Arrow = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

function EvolvePokemons() {
  const [evolves, setEvolves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvolves() {
      try {
        const response = await fetch("http://localhost:8000/evolve");
        if (!response.ok) throw new Error("Erro ao buscar evoluções");
        const data = await response.json();
        // Filtra só os pokémons que têm evoluções
        setEvolves(data.filter(item => item.evolve && item.evolve.length > 0));
      } catch (err) {
        console.error("Falha no fetch /evolve:", err.message);
        setEvolves([]);
      } finally {
        setLoading(false);
      }
    }
    fetchEvolves();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <PokeEvolveFrame>
      {evolves.map((item) => (
        <PokemonCard key={item.id}>
          {/* Pokémon base */}
          <PokeImgEvo
            src={`http://localhost:8000/home/${item.pokemon.number}/img`}
            alt={item.pokemon.name}
          />
          <span>{item.pokemon.name}</span>

          {/* Linha das evoluções com setas */}
          <EvoLine>
            {item.evolve.map((ev, idx) => (
              <span key={ev.number} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                {idx > 0 && <Arrow>→</Arrow>}
                <PokeImgEvo
                  src={`http://localhost:8000/home/${ev.number}/img`}
                  alt={ev.name}
                />
                <span style={{ fontSize: 12 }}>{ev.name}</span>
              </span>
            ))}
          </EvoLine>
        </PokemonCard>
      ))}
    </PokeEvolveFrame>
  );
}

export default EvolvePokemons;
