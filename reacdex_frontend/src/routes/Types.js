import styled from 'styled-components';
// import Pesquisa from '../componentes/Pesquisa';
// import FramePokeCards from '../componentes/FramePokeCards';
import FrameTypes from '../componentes/FrameTypes';

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  width-max: 80%;
  width-max: 100%;
`

function Types() {
  return (
    <AppContainer>
      <FrameTypes />
    </AppContainer>
  );
}

export default Types;