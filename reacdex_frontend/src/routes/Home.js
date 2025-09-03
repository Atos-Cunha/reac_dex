import styled from 'styled-components';
import Pesquisa from '../componentes/Pesquisa';
import FrameHome from '../componentes/FrameHome';

const AppContainer = styled.div`
    width: 100%;
    height: 100%;
    background-image: linear-gradient(90deg,#002F52 35%,#326589 165%);
`

function Home() {
  return (
    <AppContainer>
      <Pesquisa />
      <FrameHome />
    </AppContainer>
  );
}

export default Home;