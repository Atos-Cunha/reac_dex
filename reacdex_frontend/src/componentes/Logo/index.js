import styled from 'styled-components';
import logo from '../../img/logo.svg';

const LogoContainer = styled.div`
    color: #000;
    display: flex;
    font-size: 30px;
`;

const LogoImage = styled.img`
    margin-right: 10px;;
`;

function Logo() {
    return (
        <LogoContainer>
            <LogoImage src={logo} alt='logo'></LogoImage>
            <p><strong>Reac</strong>Dex</p>
        </LogoContainer>
    )
}

export default Logo;