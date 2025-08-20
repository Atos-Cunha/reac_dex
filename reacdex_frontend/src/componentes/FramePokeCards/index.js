import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GenTitle } from '../GenTitle';
import CardPokemons from '../CardPokemons';

const FramePokeCardsContainer = styled.section`
    // background: linear-gradient(90deg, #EB9B00, #7A4A00);
    max-width: 80%;
    margin: 0 auto; 
    background-color: #EBECEE;
    padding-bottom: 20px;
    display: flex;
    flex-direction: column;
    margin-left: 20%;
    margin-right: 20%;
`;

function FramePokeCards() {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchPokemons() {
            try {
                const response = await fetch("http://localhost:3001/pokemons");
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

    return (
        <FramePokeCardsContainer>
            <GenTitle>Kanto - First Gen</GenTitle>
            <CardPokemons />
        </FramePokeCardsContainer>

    );
}

export default FramePokeCards;
