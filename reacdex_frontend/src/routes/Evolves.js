import styled from 'styled-components';
import FrameEvolve from '../componentes/FrameEvolve';

const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
  width-max: 80%;
  width-max: 100%;
`

function Evolves() {
  return (
    <AppContainer>
      <FrameEvolve />
    </AppContainer>
  );
}

export default Evolves;