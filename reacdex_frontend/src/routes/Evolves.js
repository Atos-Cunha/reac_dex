import styled from 'styled-components';
import FrameEvolve from '../componentes/FrameEvolve';

const AppContainer = styled.div`
width: 100%;
height: 100%;
border-radius: 20px;
background: linear-gradient(100deg,  #d4e5feff 0%,  #3a6ea5 50%);
`

function Evolves() {
  return (
    <AppContainer>
      <FrameEvolve />
    </AppContainer>
  );
}

export default Evolves;