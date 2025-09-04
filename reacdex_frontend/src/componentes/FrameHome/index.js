import styled from "styled-components";
import { GenTitle } from '../GenTitle';
// import CardPokemons from '../CardPokemons';
import HomePokemons from '../HomePokemons';

const FramePokeCardsContainer = styled.section`
  text-align: center;
  width: 80%;
  margin: auto;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(6px);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  transition: all 0.3s ease;
`;

function FrameHome() {
  return (
    <FramePokeCardsContainer>
      <GenTitle>Kanto - First Gen</GenTitle>
      <HomePokemons />
    </FramePokeCardsContainer>
  );
}

export default FrameHome;
