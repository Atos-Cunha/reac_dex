import styled from 'styled-components';
import logo from '../../img/public/logo.svg';

const LogoContainer = styled.div`
    color: #000;
    display: flex;
    font-size: 30px;
    display: flex;
    flex-direction: column;
    align-itens: center;
`;

const LogoName = styled.p`
    font-size: 25px;
    color: red;
    text-align: center;
`;

const LogoImage = styled.img`
    margin-right: 10px;;
`;

function Logo() {
    return (
        <LogoContainer>
            <LogoName><strong>Reac</strong>Dex</LogoName>
            <LogoImage src={logo} alt='logo'></LogoImage>

        </LogoContainer>
    )
}

export default Logo;