import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const FrameDef = styled.div`
    // max-width: 80%;
    // max-height: 100%;
    margin: 0 auto; 
    padding-top: 20px;
    padding-bottom: 20px;
    display: flex;
    flex-direction: column;
    margin-left: 10%;
    margin-right: 10%;

    // background: linear-gradient(-45deg, #e3f5fd, #c9e9fa, #e3f5fd);
    background-image: linear-gradient(90deg,#002F52 35%,#326589 165%);
`

const FramePokeImgType = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 20px;
  padding: 15px;
  margin: 5px;
`;

const Card = styled.div`
  height: auto;
  margin: 0 auto;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  background: linear-gradient(-45deg, #e3f5fd, #c9e9fa, #e3f5fd);
  padding: 15px;
`;

const PokeImgType = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
`;

const TitleType = styled.h3`
  text-transform: uppercase;
  font-size: 18px;
  margin: 10px 0;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 6px solid #f3f3f3;
  border-top: 6px solid #3498db;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: ${spin} 1s linear infinite;
  margin: 50px auto;
`;

function FrameTypes() {
  const [types, setTypes] = useState([]); // ⬅️ começa como array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTypes() {
      try {
        const res = await fetch("http://localhost:8000/types");
        if (!res.ok) throw new Error("Erro ao buscar tipos");
        const data = await res.json();
        console.log("Resposta do backend /types:", data);

        // data já vem no formato [{ name, url }]
        setTypes(data);
      } catch (err) {
        console.error("Erro no fetch:", err.message);
        setTypes([]);
      } finally {
        setLoading(false);
      }
    }

    fetchTypes();
  }, []);

  if (loading) return <Spinner />;
  if (!types.length) return <p>Nenhum tipo encontrado.</p>;

  return (
    <FrameDef>
      <FramePokeImgType>
        {types.map((typeObj) => (
          <Card key={typeObj.name}>
            <TitleType>{typeObj.name}</TitleType>
            <PokeImgType
              src={`http://localhost:8000${typeObj.url}`} // backend devolve /types/xxx.png
              alt={typeObj.name}
            />
          </Card>
        ))}
      </FramePokeImgType>
    </FrameDef>
  );
}

export default FrameTypes;
