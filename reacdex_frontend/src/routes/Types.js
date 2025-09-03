import styled from 'styled-components';
// import Pesquisa from '../componentes/Pesquisa';
// import FramePokeCards from '../componentes/FramePokeCards';
import FrameTypes from '../componentes/FrameTypes';

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background: linear-gradient(100deg,  #d4e5feff 0%,  #3a6ea5 50%);
`

function Types() {
  return (
    <AppContainer>
      <FrameTypes />
    </AppContainer>
  );
}

export default Types;