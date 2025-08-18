import Input from "../Input";
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { get_all_itens } from "../../services/home";
import { post_fav } from "../../services/fav";

const imagens = require.context('../../img/pokemons', false, /\.(png|jpe?g|svg)$/);

const PesquisaContainer = styled.section`
    background-image: linear-gradient(90deg, #002F52 35%, #326589 165%);
    color: #FFF;
    text-align: center;
    padding: 85px 0;
    height: auto;
    width: 100%;
`;

const Titulo = styled.h2`
    color: #FFF;
    font-size: 36px;
    text-align: center;
    width: 100%;
`;

const Subtitulo = styled.h3`
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 40px;
`;

const Resultado = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    cursor: pointer;

    p {
        width: 200px;
    }

    img {
        width: 100px;
    }
    
    &:hover {
        border: 1px solid white;
    }
`;
function getImagem(id) {
    try {
        return imagens(`./${id}.png`);
    } catch {
        return null;
    }
}

function Pesquisa() {
    const [researched_item, set_researched_item] = useState([]);
    const [itens, set_itens] = useState([]);

    useEffect(() => {
        fetch_itens();
    }, []);

    async function fetch_itens() {
        const reacdex_api = await get_all_itens();
        set_itens(reacdex_api);
    }

    async function insert_fav(id) {
        await post_fav(id);
        alert(`Item de id:${id} inserido!`);
    }

    return (
        <PesquisaContainer>
            <Titulo>Pesquise por um pokemon</Titulo>
            {/* <Subtitulo>Encontre seu pokemon aqui.</Subtitulo> */}
            <Input

                placeholder="Pesquise por nome"
                onBlur={evento => {
                    const textoDigitado = evento.target.value;
                    const resultadoPesquisa = itens.filter(item =>
                        item.name?.toLowerCase().includes(textoDigitado.toLowerCase())
                    );
                    set_researched_item(resultadoPesquisa);
                }}
            />
            {researched_item.map(item => (
                <Resultado
                // key={item.id} onClick={() => insert_fav(item.id)} // adidiona aos favoritos ao clicar
                >
                    <img src={getImagem(item.id)} alt={item.name} />
                    <p>{item.name}</p>
                </Resultado>
            ))}
        </PesquisaContainer>
    );
}
export default Pesquisa;
