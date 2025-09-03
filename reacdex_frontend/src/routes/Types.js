import styled from 'styled-components';
// import Pesquisa from '../componentes/Pesquisa';
// import FramePokeCards from '../componentes/FramePokeCards';
import FrameTypes from '../componentes/FrameTypes';

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  background-image: linear-gradient(90deg,#002F52 35%,#326589 165%);
`

function Types() {
  return (
    <AppContainer>
      <FrameTypes />
    </AppContainer>
  );
}

export default Types;