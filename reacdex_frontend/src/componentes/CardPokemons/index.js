import { useEffect, useState } from 'react';
import styled from "styled-components";
import { Titulo } from "../Titulo";

const Card = styled.div`
    align-items: center;
    background-color: #FFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    display: flex;
    margin: 0 auto;
    max-width: 600px;
    padding: 25px 20px;
    justify-content: space-around;
    width: 100%;  
`;

const Botao = styled.button`
    background-color: #EB9B00;
    color: #FFF;
    padding: 10px 0px;
    font-size: 16px;
    border: none;
    font-weight: 900;
    display: block;
    text-align: center;
    width: 150px;
    &:hover {
        cursor: pointer;
    }
`;

const Descricao = styled.p`
    max-width: 300px;
`;

const Subtitulo = styled.h4`
    color: #002F52;
    font-size: 18px;
    font-weight: bold;
    margin: 15px 0;
`;

// Renomeei para não conflitar com <img>
const PokemonImage = styled.img`
    width: 150px;
`;

// Este é o que você queria usar no map:
const PokemonCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px;
    margin: 10px;
    border-radius: 8px;
    background: #f5f5f5;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
`;

function CardPokemons() {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchPokemons() {
            try {
                const response = await fetch("http://localhost:8000/home");
                if (!response.ok) throw new Error("Erro ao buscar pokemons");
                const data = await response.json();
                setPokemons(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchPokemons();
    }, []);

    if (loading) return <p>Carregando pokémons...</p>;
    if (error) return <p>Erro: {error}</p>;

    return (
        <Card>
            <Botao> 👌 </Botao>
            
            <Card>
                {pokemons.map(pokemon => (
                    <PokemonCard key={pokemon.id}>
                        <PokemonImage
                            src={pokemon.image || `http://localhost:8000/home/${pokemon.id}.png`}
                            alt={pokemon.name}
                        />
                        <h3>{pokemon.name}</h3>
                        <p>Tipo: {pokemon.type.join(", ")}</p>
                        <p>{pokemon.evolves ? "Evolui" : "Não evolui"}</p>
                    </PokemonCard>
                ))}
            </Card>
        </Card>
    )
}

export default CardPokemons;
