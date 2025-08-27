import styled from 'styled-components';
import Pesquisa from '../componentes/Pesquisa';
import FrameHome from '../componentes/FrameHome';
import FramePokeCards from '../componentes/FramePokeCards';

const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
  width-max: 80%;
  width-max: 100%;
`

function Home() {
  return (
    <AppContainer>
      <Pesquisa />
      <FrameHome />
      {/* <FramePokeCards /> */}
    </AppContainer>
  );
}

export default Home;