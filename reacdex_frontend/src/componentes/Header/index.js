import styled from 'styled-components';
import Logo from '../Logo';
import OpcoesHeader from '../OpcoesHeader';
import OpcoesHeaderDark from '../OpcoesHeaderDark';
import IconesHeader from '../IconesHeader';
import IconesHeaderDark from '../IconesHeaderDark';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
  background-color: #FFF;
  display: flex;
  justify-content: center;
`

function Header() {
  return (
    <HeaderContainer>
      <Link to="/">
        <Logo />
        {/* <LogoDark /> */}
      </Link>
      <OpcoesHeader />
      
      {/* <OpcoesHeaderDark /> */}
      
      {/* <OpcoesHeaderDark /> */}

      <IconesHeader />


      {/* <IconesHeaderDark /> */}

    </HeaderContainer>
  )
}

export default Header;