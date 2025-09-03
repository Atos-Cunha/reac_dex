import styled from 'styled-components';
import Pesquisa from '../componentes/Pesquisa';
import FrameHome from '../componentes/FrameHome';

const AppContainer = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;  
flex-wrap: nowrap;
justify-content: center;
align-items: center;
padding-top: 20px;
gap: 20px;
border-radius: 20px;
background: linear-gradient(95deg,  #d4e5feff 0%,  #3a6ea5 50%);
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