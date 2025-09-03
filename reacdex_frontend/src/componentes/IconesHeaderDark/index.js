import styled from 'styled-components';
// import perfil from '../../img/public/perfil.svg';
import light_theme from '../../img/public/light_theme.svg';

const Icone = styled.li`
    margin-right: 40px;
    width: 25px;
    list-style: none;
`;

const Icones = styled.ul`
    display: flex;
    align-items: top;
`
// const icones = [perfil, light_theme];
const icones = [light_theme];

function IconesHeader() {
    return (
        <Icones>
            {icones.map((icon, idx) => (
                <Icone key={idx}>
                    <img

                        src={icon}
                        alt={`icone-${idx}`}
                    />
                </Icone>
            ))}
        </Icones>
    )

}

export default IconesHeader;