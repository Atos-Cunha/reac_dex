import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Opcao = styled.li`
    color: #000;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100%;
    padding: 0 5px;
    cursor: pointer;
    min-width: 120px;
`;

const Opcoes = styled.ul`
    display: flex;
`;

const opcoes = ['HOME', 'EVOLVES', 'TYPES', 'FAVORITES'];

function opcoes_header() {
    return (
        <Opcoes>
            {
                opcoes.map((texto) => (
                    <Link
                        key={texto}
                        to={texto.toLowerCase() === "home" ? "/" : `/${texto.toLowerCase()}`}
                    >
                        <Opcao><p>{texto}</p></Opcao>
                    </Link>
                ))
            }
        </Opcoes>
    )
}

export default opcoes_header;