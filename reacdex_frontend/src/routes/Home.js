// import UltimosLancamentos from '../componentes/UltimosLancamentos';
// import testeQuadro from '../componentes/testeQuadro';


import styled from 'styled-components';
import Pesquisa from '../componentes/Pesquisa';
import QuadroPrincipal from '../componentes/QuadroPrincipal';
import CardPokemons from '../componentes/CardPokemons';

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(90deg, #002F52 35%, #326589 165%);
`


function Home() {
  return (
    <AppContainer>
      <Pesquisa />
      <QuadroPrincipal />
      <CardPokemons />
    </AppContainer>
  );
}

export default Home;