import styled from 'styled-components';
import perfil from '../../img/public/perfil.svg';
import light_theme from '../../img/public/light_theme.svg';

const Icone = styled.li`
    margin-right: 40px;
    width: 25px;
    list-style: none;
`;

const Icones = styled.ul`
    display: flex;
    align-items: center;
`

const icones = [perfil, light_theme];

function IconesHeader() {
    return (
        <Icones>
            {icones.map((icone) => (
                <Icone><img src={icone} alt='icone'></img></Icone>
            ))}
        </Icones>
    )
}

export default IconesHeader;