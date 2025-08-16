import styled from 'styled-components';
import { itens } from './dados_pokemon';
import { Titulo } from '../Titulo';
import CardRecomenda from '../CardRecomenda';
// import imagemLivro from '../../img/livro2.png';

const QuadroPrincipalContainer = styled.section`
    background-color: #EBECEE;
    padding-bottom: 20px;
    display: flex;
    flex-direction: column;
`
// QuadroPrincipalContiner
const  container_new_itens = styled.div`
    margin-top: 30px;
    display: flex;
    width: 100%;
    justify-content: center;
    cursor: pointer;
`

function QuadroPrincipal() {
    return (
        <QuadroPrincipalContainer>
            <Titulo or={"#EB9B00"} tamanhoFonte={"36px"}>1º GEN</Titulo>
            <container_new_itens>
                {itens.map(item => (
                    <img src={item.src} alt='img' />
                ))}
            </container_new_itens>
            {/* <CardRecomenda
                titulo="Teste"
                subtitulo="Teste"
                descricao="teste teste teste ..."
                img={imagemLivro}
            /> */}
        </QuadroPrincipalContainer>
    )
}

export default QuadroPrincipal;