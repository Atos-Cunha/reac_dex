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
    padding: 40px 0;
    width: 100%;
    height: 100%;
    min-width: ${props => (props.vazio ? "200px" : "100%")}; /* <= altura mínima quando vazio */
    min-height: ${props => (props.vazio ? "200px" : "100%")}; /* <= altura mínima quando vazio */
    transition: all 0.3s ease;
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

const ResultadosGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); /* até 5 colunas */
    max-width: 1000px;
    margin: 20px auto;
    gap: 20px;
`;

const Resultado = styled.div`
    background: rgba(255, 255, 255, 0.1);
    padding: 10px;
    border-radius: 12px;
    text-align: center;
    cursor: pointer;
    transition: 0.2s;

    p {
        margin-top: 8px;
        font-size: 14px;
        color: #fff;
    }

    img {
        width: 100px;
        height: 100px;
        object-fit: contain;
    }
    
    &:hover {
        border: 1px solid white;
        transform: scale(1.05);
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
        <PesquisaContainer vazio={researched_item.length === 0}>
            <Titulo>Pesquise por um pokemon</Titulo>
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

            {researched_item.length > 0 && (
                <ResultadosGrid>
                    {researched_item.map(item => (
                        <Resultado key={item.id} onClick={() => insert_fav(item.id)}>
                            <img src={getImagem(item.id)} alt={item.name} />
                            <p>{item.name}</p>
                        </Resultado>
                    ))}
                </ResultadosGrid>
            )}
        </PesquisaContainer>
    );
}

export default Pesquisa;
