import { useEffect, useState } from 'react';
import styled, { keyframes } from "styled-components";

const Card = styled.div`
    height: auto;
    margin: 0 auto; 
    background-color: #FFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
`;

const PokemonImage = styled.img`
    width: 200px;
    heigth: 150px;
`;

const PokeName = styled.p`
    font-size: 20px;                  /* tamanho da fonte */
    font-family: 'Montserrat',        /* principal */
             'Helvetica Neue',    /* alternativa moderna */
             Arial,               /* fallback clássico */
             sans-serif;          /* fallback genérico */
    font-weight: 700;                 /* bold */
    line-height: 1.5;                 /* altura da linha para melhor leitura */
    letter-spacing: 0.5px;            /* espaçamento entre letras */
    color: #333;                       /* cor mais suave que preto puro */
`

const PokeNumber = styled.p`
    font-size: 20px;
    font-family: Montserrat;
`

const PokemonCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    margin: 5px;
    border-radius: 8px;
    background: #f5f5f5;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
`;

/* animação do spinner */
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

    if (loading || pokemons.length === 0) {
        return <Spinner />;
    }

    return (
        <Card>
            {pokemons.map(pokemon => (
                <PokemonCard key={pokemon.id}>
                    <PokeName style={{ textTransform: "uppercase" }}>{pokemon.name}</PokeName>
                    <PokeNumber>#{pokemon.id}</PokeNumber>
                    <PokemonImage
                        src={pokemon.image || `http://localhost:8000/home/${pokemon.id}/img`}
                        alt={pokemon.name}
                    />
                    <p>Tipo: {pokemon.type.join(", ")}</p>
                    <p>{pokemon.evolves ? "Evolui" : "Não evolui"}</p>
                </PokemonCard>
            ))}
        </Card>
    )
}

export default CardPokemons;
