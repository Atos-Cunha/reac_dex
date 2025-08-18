// import { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import { imagens } from '../../img/pokemons';
// import { Titulo } from '../Titulo';
// import CardPokemon from '../CardPokemon';
// import CardRecomenda from '../CardRecomenda';


// const QuadroPrincipalContainer = styled.section`
//     background-color: #EBECEE;
//     padding-bottom: 20px;
//     display: flex;
//     flex-direction: column;
//     margin-left: 20%;
//     margin-right: 20%;
// `
// const Card = styled.div`
//     margin-top: 30px;
//     display: flex;
//     width: 100%;
//     justify-content: center;
//     cursor: pointer;
// `

// function QuadroPrincipal() {
//     return (
//         <QuadroPrincipalContainer>
//             <Titulo or={"#EB9B00"} tamanhoFonte={"36px"}>1º GEN</Titulo>
//             <Card>
//                 {imagens.map(item => (
//                     <img src={item.src} alt='img' />
//                 ))}
//             </Card>
//             {/* <CardRecomenda
//                 titulo="Teste"
//                 subtitulo="Teste"
//                 descricao="teste teste teste ..."
//                 img={imagemItem}
//             /> */}
//         </QuadroPrincipalContainer>
//     )
// }

// export default QuadroPrincipal;


import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Titulo } from '../Titulo';
// import CardPokemon from '../CardPokemon';
// import CardRecomenda from '../CardRecomenda';

const QuadroPrincipalContainer = styled.section`
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

    if (loading) return <p>Carregando pokémons...</p>;
    if (error) return <p>Erro: {error}</p>;

    return (
        <QuadroPrincipalContainer>
            <Titulo cor="#EB9B00" tamanhoFonte="36px">1º GEN</Titulo>
            <Card>
                {pokemons.map(pokemon => (
                    <PokemonCard key={pokemon.id}>
                        {/* Se o backend não mandar a imagem, 
                            você pode montar a URL pelo ID, 
                            por ex: usando sprites do pokeapi */}
                        <img 
                            src={pokemon.image || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} 
                            alt={pokemon.name} 
                        />
                        <h3>{pokemon.name}</h3>
                        <p>Tipo: {pokemon.type.join(", ")}</p>
                        <p>{pokemon.evolves ? "Evolui" : "Não evolui"}</p>
                    </PokemonCard>
                ))}
            </Card>
        </QuadroPrincipalContainer>
    );
}

export default QuadroPrincipal;
