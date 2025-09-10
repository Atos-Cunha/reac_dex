// import { useEffect, useState } from 'react';
import styled from 'styled-components';
import FrameFavs from '../componentes/FrameFavs';

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background: linear-gradient(100deg,  #d4e5feff 0%,  #3a6ea5 50%);
`

const Titulo = styled.h2`
    color: #FFF;
    font-size: 36px;
    text-align: center;
    width: 100%;
    padding-top: 35px
`

function Fav() {
  return (
    <AppContainer>
      <div>
        <Titulo>Aqui estão seus itens favoritos:</Titulo>
        <FrameFavs />
      </div>
    </AppContainer>
  );
}

export default Fav;