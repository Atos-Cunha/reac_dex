import { useEffect, useState } from 'react';
import { get_fav, post_fav, del_fav } from '../services/fav';
import styled from 'styled-components';
import img from '../img/public/livro.png';

const AppContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-image: linear-gradient(90deg,#002F52 35%,#326589 165%);
`

const ResultadoContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`

const Resultado = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    cursor: pointer;
    text-align: center;
    padding: 0 100px;
    p {
        width: 200px;
        color: #FFF;
    }
    img {
        width: 100px;
    }
    &:hover {
        border: 1px solid white;
    }
`

const Titulo = styled.h2`
    color: #FFF;
    font-size: 36px;
    text-align: center;
    width: 100%;
    padding-top: 35px
`

function Fav() {
  const [fav, set_fav] = useState([]);

  async function fetch_fav() {
    const fav_api = await get_fav();
    set_fav(fav_api);
  }

  async function delete_fav(id) {
    await del_fav(id);
    await fetch_fav();
    alert(`Item de id:${id} deletado!`);
  }

  useEffect(() => {
    fetch_fav();
  }, []);

  return (
    <AppContainer>
      <div>
        <Titulo>Aqui estão seus itens favoritos:</Titulo>
        <ResultadoContainer>
          {
            fav.length !== 0 ? fav.map(fav => (
              <Resultado onClick={() => delete_fav(fav.id)}>
                <p>{fav.nome}</p>
                {/* <img src={img} alt='imagem do livro' /> */}
              </Resultado>
            )) : null
          }
        </ResultadoContainer>
      </div>
    </AppContainer>
  );
}

export default Fav;