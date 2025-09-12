import { useEffect, useState } from "react";
import styled from "styled-components";

const FrameDef = styled.div`
  margin: 0 auto; 
	padding-top: 20px;
	padding-bottom: 20px;
	display: flex;
	flex-direction: column;
`

const FramePokeEvoGrid = styled.div`
  background-color: #ffffff3c;
  border-radius: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
  margin: 20px 0;
  margin-left: 10%;
	margin-right: 10%;
  background-color: #ffffff3c;
  padding: 5px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
`;

const EvolveCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  padding: 12px;
  background-color: #ffffff3c;
  border: 1px solid #fff;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`;

const PokeName = styled.p`
  font-size: 13px;
  font-family: 'Montserrat','Helvetica Neue',Arial,sans-serif;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.5px;
  color: #fff;
  text-align: center;
  margin: 4px 0;
`;

const EvoLine = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 8px;
`;

const PokeImgEvo = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
`;

const Arrow = styled.span`
  font-size: 35px;
  color: #fff;
`;

function FrameEvolves() {
  const [evolves, setEvolves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvolves() {
      try {
        const response = await fetch("http://localhost:8000/evolves");
        if (!response.ok) throw new Error("Erro ao buscar evoluções");
        const data = await response.json();
        // Apenas os pokémons que possuem cadeia evolutiva
        setEvolves(data.filter(item => item.evolve && item.evolve.length > 0));
      } catch (err) {
        console.error("Falha no fetch /evolves:", err.message);
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
    <FrameDef>
      <FramePokeEvoGrid>
        {evolves.map((item) => (
          <EvolveCard key={item.id}>
            <EvoLine>
              {/* Pokémon inicial */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <PokeImgEvo
                  src={`http://localhost:8000/home/${item.pokemon.number}/img`}
                  alt={item.pokemon.name}
                />
                <PokeName>{item.pokemon.name}</PokeName>
              </div>

              {/* Evoluções */}
              {item.evolve.map((ev) => (
                <span key={ev.number} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <Arrow>→</Arrow>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <PokeImgEvo
                      src={`http://localhost:8000/home/${ev.number}/img`}
                      alt={ev.name}
                    />
                    <PokeName>{ev.name}</PokeName>
                  </div>
                </span>
              ))}
            </EvoLine>
          </EvolveCard>
        ))}
      </FramePokeEvoGrid>
    </FrameDef>
  );
}
export default FrameEvolves;
