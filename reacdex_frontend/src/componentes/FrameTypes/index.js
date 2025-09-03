import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const FrameDef = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-left: 10%;
  margin-right: 10%;
  padding: 16px;
`;

const FrameRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  background-color: #ffffff3c;
  padding: 10px;
  border-radius: 20px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const SectionTitle = styled.h2`
  color: #fff;
  font-size: 16px;
  letter-spacing: 1px;
  margin: 8px 0 4px;
`;

const Card = styled.div`
  background-color: #0000002f;
  width: 100px;
  border-radius: 10px;
  text-align: center;
  padding: 6px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
`;

const PokeImgType = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
`;

const TitleType = styled.h3`
  text-transform: uppercase;
  font-size: 13px;
  margin: 6px 0 0;
  color: #fff;
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

function buildImgSrc(typeName) {
  return `http://localhost:8000/types/${typeName}.png`;
}

/** Normaliza cada type em um bloco com { type, advantage[], weak[] } */
function normalizeTypesFf(data) {
  const result = [];

  data.forEach((obj) => {
    Object.entries(obj).forEach(([typeName, details]) => {
      result.push({
        type: { name: typeName, url: buildImgSrc(typeName) },
        advantage: (details.advantage || []).map((a) => ({
          name: a,
          url: buildImgSrc(a),
        })),
        weak: (details.foes || []).map((f) => ({
          name: f,
          url: buildImgSrc(f),
        })),
      });
    });
  });

  return result;
}

function FrameTypes() {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTypes() {
      try {
        // 1) Buscar lista de tipos (com imagens corretas)
        const resTypes = await fetch("http://localhost:8000/types");
        if (!resTypes.ok) throw new Error("Erro ao buscar /types");
        const typesData = await resTypes.json();

        // Monta dicionário { Fire: "/types/fire.png", ... }
        const typeMap = {};
        typesData.forEach((t) => {
          typeMap[t.name.toLowerCase()] = `http://localhost:8000${t.url}`;
        });

        // 2) Buscar relações advantage/foes
        const resFf = await fetch("http://localhost:8000/typesFf");
        if (!resFf.ok) throw new Error("Erro ao buscar /typesFf");
        const ffData = await resFf.json();

        // 3) Normalizar blocos
        const normalized = [];
        ffData.forEach((obj) => {
          Object.entries(obj).forEach(([typeName, details]) => {
            const typeKey = typeName.toLowerCase();

            // Só monta se o tipo tiver imagem no /types
            if (!typeMap[typeKey]) return;

            normalized.push({
              type: { name: typeName, url: typeMap[typeKey] },
              advantage: (details.advantage || []).map((a) => ({
                name: a,
                url: typeMap[a.toLowerCase()] || "",
              })),
              weak: (details.foes || []).map((f) => ({
                name: f,
                url: typeMap[f.toLowerCase()] || "",
              })),
            });
          });
        });

        console.log("✅ Normalizado com imagens:", normalized);
        setBlocks(normalized);
      } catch (err) {
        console.error("❌ Erro no fetch:", err);
        setBlocks([]);
      } finally {
        setLoading(false);
      }
    }

    fetchTypes();
  }, []);


  if (loading) return <Spinner />;

  if (!blocks.length) {
    return <p>Nenhum tipo encontrado.</p>;
  }

  return (
    <FrameDef>
      {blocks.map((block, idx) => (
        <FrameRow key={`block-${block.type.name}-${idx}`}>
          {/* TYPE */}
          <Column>
            <SectionTitle>TYPE</SectionTitle>
            <Card>
              <PokeImgType src={block.type.url} alt={block.type.name} />
              <TitleType>{block.type.name}</TitleType>
            </Card>
          </Column>

          {/* ADVANTAGE */}
          <Column>
            <SectionTitle>ADVANTAGE</SectionTitle>
            {block.advantage.map((t, i) => (
              <Card key={`adv-${t.name}-${i}`}>
                <PokeImgType src={t.url} alt={t.name} />
                <TitleType>{t.name}</TitleType>
              </Card>
            ))}
          </Column>

          {/* WEAK */}
          <Column>
            <SectionTitle>WEAK</SectionTitle>
            {block.weak.map((t, i) => (
              <Card key={`weak-${t.name}-${i}`}>
                <PokeImgType src={t.url} alt={t.name} />
                <TitleType>{t.name}</TitleType>
              </Card>
            ))}
          </Column>
        </FrameRow>
      ))}
    </FrameDef>
  );
}

export default FrameTypes;
