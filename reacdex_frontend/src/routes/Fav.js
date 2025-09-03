import { useEffect, useState } from 'react';
import { get_fav, post_fav, del_fav } from '../services/fav';
import styled from 'styled-components';
import img from '../img/public/livro.png';

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
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
      </div>
    </AppContainer>
  );
}

//   return (
//     <AppContainer>
//       <div>
//         <Titulo>Aqui estão seus itens favoritos:</Titulo>
//         <ResultadoContainer>
//           {
//             fav.length !== 0 ? fav.map(fav => (
//               <Resultado onClick={() => delete_fav(fav.id)}>
//                 <p>{fav.nome}</p>
//                 {/* <img src={img} alt='imagem do livro' /> */}
//               </Resultado>
//             )) : null
//           }
//         </ResultadoContainer>
//       </div>
//     </AppContainer>
//   );
// }

export default Fav;