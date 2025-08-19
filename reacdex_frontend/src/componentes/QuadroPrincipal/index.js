import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Titulo } from '../Titulo';
import CardPokemons from '../CardPokemons';

const QuadroPrincipalContainer = styled.section`
    max-width: 80%;
    margin: 0 auto; 

    background-color: #EBECEE;
    padding-bottom: 20px;
    display: flex;
    flex-direction: column;
    margin-left: 20%;
    margin-right: 20%;
`;

const Card = styled.div`
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    cursor: pointer;
`;

const PokemonCard = styled.div`
    background: white;
    border-radius: 12px;
    padding: 12px;
    width: 150px;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
`;

function QuadroPrincipal() {
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
        <QuadroPrincipalContainer>
            <Titulo cor="#EB9B00" tamanhoFonte="36px">1º GEN</Titulo>
            <CardPokemons />
        </QuadroPrincipalContainer>
    );
}

export default QuadroPrincipal;
