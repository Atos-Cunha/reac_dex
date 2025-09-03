import styled from "styled-components";
import { GenTitle } from '../GenTitle';
// import CardPokemons from '../CardPokemons';
import HomePokemons from '../HomePokemons';

const FramePokeCardsContainer = styled.section`
    display: flex;
    flex-direction: column;
    max-width: 80%;
    max-height: 100%;
    margin-left: 10%;
    margin-right: 10%;
    margin: 0 auto; 
    padding-top: 20px;
    padding-bottom: 20px;
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
