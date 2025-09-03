import styled from 'styled-components';
import FrameEvolve from '../componentes/FrameEvolve';

const AppContainer = styled.div`
    width: 100%;
    height: 100%;
    background-image: linear-gradient(90deg,#002F52 35%,#326589 165%);
`

function Evolves() {
  return (
    <AppContainer>
      <FrameEvolve />
    </AppContainer>
  );
}

export default Evolves;