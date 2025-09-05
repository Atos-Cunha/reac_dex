import styled, { keyframes } from "styled-components";
import { useEffect, useState } from 'react';
import Input from "../Input";
import InputCxBx from "../InputCxBx";
import { post_fav } from "../../services/fav";

const FrameInput = styled.div``;

const PesquisaContainer = styled.section`
	color: #fff;
	width: 80%;
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
  width: 80%; 
  display: grid;  
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
  max-width: 1000px; 
  margin: 20px auto; 
  gap: 20px; 
  border-radius: 20px;  
`;

const Resultado = styled.div` 
  background: rgba(255, 255, 255, 0.2); 
  padding: 10px; 
  border-radius: 20px; 
  text-align: center; 
  cursor: pointer; 
  transition: 0.2s; 
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
`;

const EvolvesContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;

  p {
    font-size: 14px;
    margin-top: 5px;
  }
`;

const PokemonImage = styled.img` 
	width: 100px; 
	height: 100px; 
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

// 🔧 Função para garantir formato "001", "002", "003"
const formatNumber = (num) => num?.toString().padStart(3, "0");

function Pesquisa() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [showEvolves, setShowEvolves] = useState(false);
  const [evolvesList, setEvolvesList] = useState([]);
  const [loading, setLoading] = useState(true);

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
    await post_fav(id);
    alert(`Item de id:${id} inserido!`);
  }

  function handleSearch(evento) {
    const textoDigitado = evento.target.value.toLowerCase();
    if (textoDigitado.trim() === "") {
      setPokemons([]);
      return;
    }

    let resultadoPesquisa = [];

    if (showEvolves) {
      resultadoPesquisa = evolvesList.filter(pokemon =>
        pokemon.pokemon?.name?.toLowerCase().includes(textoDigitado) ||
        pokemon.evolve?.some(ev => ev.name.toLowerCase().includes(textoDigitado))
      );
    } else {
      resultadoPesquisa = allPokemons.filter(pokemon =>
        pokemon.name?.toLowerCase().includes(textoDigitado)
      );
    }

    setPokemons(resultadoPesquisa);
  }

  if (loading) return <Spinner />;

  return (
    <PesquisaContainer>
      <Titulo>Pesquise por um pokemon</Titulo>
      <FrameInput>
        <Input placeholder="Pesquise por nome" onChange={handleSearch} />
        <CheckboxContainer>
          <InputCxBx
            id="evolves"
            checked={showEvolves}
            onChange={(e) => setShowEvolves(e.target.checked)}
          />
          <label htmlFor="evolves">Evolves</label>
        </CheckboxContainer>
      </FrameInput>

      {pokemons.length > 0 && (
        <ResultadosGrid>
          {pokemons.map(pokemon => (
            <Resultado
              key={pokemon.id || pokemon.pokemon?.number}
              onClick={() => insert_fav(pokemon.id || pokemon.pokemon?.number)}
            >
              {showEvolves ? (
                <EvolvesContainer>
                  {/* Pokémon base */}
                  <div style={{ textAlign: "center" }}>
                    <PokemonImage
                      src={`http://localhost:8000/home/${formatNumber(pokemon.pokemon?.number)}/img`}
                      alt={pokemon.pokemon?.name}
                    />
                    <p>{pokemon.pokemon?.name}</p>
                  </div>

                  {/* evoluções */}
                  {pokemon.evolve?.map((ev) => (
                    <div
                      key={ev.number}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px"
                      }}
                    >
                      <span>➡️</span>
                      <div style={{ textAlign: "center" }}>
                        <PokemonImage
                          src={`http://localhost:8000/home/${formatNumber(ev.number)}/img`}
                          alt={ev.name}
                        />
                        <p>{ev.name}</p>
                      </div>
                    </div>
                  ))}
                </EvolvesContainer>
              ) : (
                <>
                  <PokemonImage
                    src={pokemon.image || `http://localhost:8000/home/${formatNumber(pokemon.id)}/img`}
                    alt={pokemon.name}
                  />
                  <p>{pokemon.name}</p>
                </>
              )}
            </Resultado>
          ))}
        </ResultadosGrid>
      )}
    </PesquisaContainer>
  );
}

export default Pesquisa;
