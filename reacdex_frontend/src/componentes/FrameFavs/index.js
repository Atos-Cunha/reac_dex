import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { get_fav, del_fav } from '../../services/fav.js';
import { ReactComponent as Trash } from '../../img/icons/trash.svg';

const FrameDef = styled.div`
  height: 100%;
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 20px;
`;

const FrameRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  background-color: #ffffff3c;
  padding: 10px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  gap: 20px;
`;

const Card = styled.div`
  background-color: #ffffff3c;
  width: 120px;
  border-radius: 10px;
  text-align: center;
  // padding: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  border: 1px solid #fff;
`;

const PokeName = styled.p`
  font-family: 'Montserrat','Helvetica Neue',Arial,sans-serif;
  text-transform: uppercase;
  font-size: 15px;
  margin: 6px 0 0;
  color: #fff;
`;

const PokeImg = styled.img`
  width: 100px;
  height: 100px;
`;

const TrashIcon = styled(Trash)`
  cursor: pointer;
  padding: 10px;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 6px solid #f3f3f3;
  border-top: 6px solid #3498db;
  border-radius: 50px;
  width: 60px;
  height: 60px;
  animation: ${spin} 1s linear infinite;
  margin: 50px auto;
`;

function FrameFavs() {
  const [pokemons, setPokemons] = useState([]);
  const [favs, setFavs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [resPokemons, resFavs] = await Promise.all([
          fetch("http://localhost:8000/home"),
          fetch("http://localhost:8000/fav"),
        ]);

        if (!resPokemons.ok) throw new Error("Erro ao buscar pokemons");
        if (!resFavs.ok) throw new Error("Erro ao buscar favoritos");

        const pokemonsData = await resPokemons.json();
        const favsData = await resFavs.json();

        setPokemons(pokemonsData || []);
        setFavs(favsData || []);
      } catch (err) {
        console.error("Falha no fetch:", err.message);
        setPokemons([]);
        setFavs([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  async function fetch_fav() {
    const fav_api = await get_fav();
    setFavs(fav_api);
  }

  async function delete_fav(id) {
    await del_fav(id);
    await fetch_fav();
    alert(`Item de id:${id} deletado!`);
  }

  if (loading) return <Spinner />;

  // ---- filtra apenas os pokemons que estão nos favoritos ----
  const favPokemons = pokemons.filter(p => favs.some(f => String(f.id) === String(p.id)));

  return (
    <FrameDef>
      <FrameRow>
        {favPokemons.map((p) => (
          <Card key={p.id}>
            <PokeImg
              src={`http://localhost:8000/home/${p.id}/img`}
              alt={p.name}
            />
            <PokeName>{p.name}</PokeName>
            <TrashIcon
              width={20}
              height={20}
              fill="#fff"
              onClick={() => delete_fav(p.id)}
            />
          </Card>
        ))}
      </FrameRow>
    </FrameDef>
  );
}

export default FrameFavs;