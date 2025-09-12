// src/componentes/Pesquisa/index.js
import styled, { keyframes, css } from "styled-components";
import { useEffect, useState } from "react";
import Input from "../Input";
import InputCxBx from "../InputCxBx";
import { post_fav } from "../../services/fav";

// 🔹 Animações
const expandCard = keyframes`
  0% { transform: scale(1); box-shadow: 0px 0px 0px rgba(0,0,0,0); }
  50% { transform: scale(1.08); box-shadow: 0px 8px 20px rgba(0,0,0,0.3); }
  100% { transform: scale(1.05); box-shadow: 0px 4px 12px rgba(0,0,0,0.25); }
`;

const FrameInput = styled.div``;

const PesquisaContainer = styled.section`
  color: #fff;
  width: 80%;
  height: 100%;
  padding: 40px 0;
  margin: auto;
  text-align: center;
  border-radius: 20px;
  backdrop-filter: blur(6px);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  transition: all 0.3s ease;
  border: 1px solid #fff;
  display: flex;
  flex-direction: column;
`;

const CheckboxContainer = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  label {
    font-size: 16px;
    color: #fff;
    cursor: pointer;
    user-select: none;
  }
  input[type="checkbox"] {
    width: 15px;
    height: 15px;
    cursor: pointer;
  }
`;

const Titulo = styled.h2`
  color: #fff;
  font-size: 35px;
  text-align: center;
  width: 100%;
`;

const ResultadosGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  min-width: 500px;
  max-width: 1000px;
  margin: 20px auto;
  gap: 20px;
  border-radius: 20px;
  width: 80%;
  height: auto;
`;

const Resultado = styled.div`
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  max-width: 90%;
  width: auto;
  height: auto;
  padding: 20px;
  border-radius: 20px;
  text-align: center;
  transition: 0.3s ease;

  p {
    margin-top: 8px;
    font-size: 15px;
    color: #fff;
  }
  img {
    width: 75px;
    height: 75px;
    object-fit: contain;
  }

  &:hover {
    border: 1px solid #fff;
    transform: scale(1.05);
  }

  ${({ hasEvolves }) =>
    hasEvolves &&
    css`
      animation: ${expandCard} 0.6s ease forwards;
    `}
`;

const PokemonImage = styled.img`
  width: 100px;
  height: 100px;
`;

const EvolucaoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Arrow = styled.span`
  font-size: 35px;
  color: #fff;
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

// 🔧 Garante formato "001"
const formatNumber = (num) => num?.toString().padStart(3, "0");

function Pesquisa() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [evolvesList, setEvolvesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEvolves, setShowEvolves] = useState(false);

  useEffect(() => {
    async function fetchPokemons() {
      try {
        const response = await fetch("http://localhost:8000/home");
        if (!response.ok) throw new Error("Erro ao buscar pokemons");
        const data = await response.json();
        setAllPokemons(data);
      } catch (err) {
        console.error("Falha no fetch:", err.message);
        setAllPokemons([]);
      } finally {
        setLoading(false);
      }
    }
    fetchPokemons();
  }, []);

  useEffect(() => {
    async function fetchEvolves() {
      try {
        const response = await fetch("http://localhost:8000/evolves");
        if (!response.ok) throw new Error("Erro ao buscar evoluções");
        const data = await response.json();
        setEvolvesList(data);
      } catch (err) {
        console.error("Falha no fetch /evolves:", err.message);
        setEvolvesList([]);
      }
    }
    fetchEvolves();
  }, []);

  async function insert_fav(id) {
    try {
      // consulta a lista atual de favoritos
      const res = await fetch("http://localhost:8000/fav");
      if (!res.ok) throw new Error("Erro ao buscar favoritos");
      const favs = await res.json();

      if (favs.length >= 7) {
        alert("Atingiu o limite, favor visitar a página de favoritos");
        return;
      }

      await post_fav(id);
      alert(`Item de id:${id} inserido!`);
    } catch (err) {
      console.error("Erro ao inserir favorito:", err.message);
      alert("Falha ao adicionar aos favoritos.");
    }
  }

  function handleSearch(evento) {
    const textoDigitado = evento.target.value.toLowerCase();
    if (textoDigitado.trim() === "") {
      setPokemons([]);
      return;
    }

    const encontrados = allPokemons.filter((p) =>
      p.name?.toLowerCase().includes(textoDigitado)
    );

    setPokemons(encontrados);
  }

  if (loading) return <Spinner />;

  // 🔹 Quando Evolves está ativo → agrupa resultados por cadeia evolutiva
  const resultados = showEvolves
    ? [
        ...new Map(
          pokemons
            .map((pokemon) => {
              const evolucao = evolvesList.find(
                (linha) =>
                  linha.pokemon?.number === formatNumber(pokemon.id) ||
                  linha.evolve?.some(
                    (ev) => ev.number === formatNumber(pokemon.id)
                  )
              );
              return evolucao ? [evolucao.pokemon.number, evolucao] : null;
            })
            .filter(Boolean)
        ).values(),
      ]
    : pokemons;

  return (
    <PesquisaContainer>
      <Titulo>Pesquise por um pokemon</Titulo>
      <FrameInput>
        <Input placeholder="Pesquise por nome" onChange={handleSearch} />

        {/* 🔹 Checkbox que controla exibição de evoluções */}
        <CheckboxContainer>
          <InputCxBx
            id="evolves"
            checked={showEvolves}
            onChange={(e) => setShowEvolves(e.target.checked)}
          />
          <label htmlFor="evolves">Evolves</label>
        </CheckboxContainer>
      </FrameInput>

      {resultados.length > 0 && (
        <ResultadosGrid>
          {resultados.map((item) => {
            // 🔹 Se showEvolves está ativo, item é cadeia de evolução
            if (showEvolves) {
              return (
                <Resultado
                  key={item.pokemon.number}
                  hasEvolves
                  onClick={() => insert_fav(item.pokemon.number)}
                >
                  <EvolucaoRow>
                    {[item.pokemon, ...(item.evolve || [])].map(
                      (poke, index, arr) => (
                        <div
                          key={poke.number}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <div>
                            <PokemonImage
                              src={`http://localhost:8000/home/${poke.number}/img`}
                              alt={poke.name}
                            />
                            <p>{poke.name.toUpperCase()}</p>
                          </div>
                          {index < arr.length - 1 && <Arrow>→</Arrow>}
                        </div>
                      )
                    )}
                  </EvolucaoRow>
                </Resultado>
              );
            }

            // 🔹 Caso normal (sem evoluções agrupadas)
            const evolucao = evolvesList.find(
              (linha) =>
                linha.pokemon?.number === formatNumber(item.id) ||
                linha.evolve?.some((ev) => ev.number === formatNumber(item.id))
            );

            return (
              <Resultado
                key={item.id}
                hasEvolves={!!evolucao}
                onClick={() => insert_fav(item.id)}
              >
                <PokemonImage
                  src={`http://localhost:8000/home/${formatNumber(item.id)}/img`}
                  alt={item.name}
                />
                <p>{item.name.toUpperCase()}</p>
              </Resultado>
            );
          })}
        </ResultadosGrid>
      )}
    </PesquisaContainer>
  );
}

export default Pesquisa;
