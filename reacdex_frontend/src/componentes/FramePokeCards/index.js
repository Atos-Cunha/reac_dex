import styled from "styled-components";
import { GenTitle } from '../GenTitle';
import CardPokemons from '../CardPokemons';

const FramePokeCardsContainer = styled.section`
    max-width: 80%;
    max-height: 100%;
    margin: 0 auto; 
    padding-top: 20px;
    padding-bottom: 20px;
    display: flex;
    flex-direction: column;
    margin-left: 10%;
    margin-right: 10%;
`;

function FramePokeCards() {
    return (
        <FramePokeCardsContainer>
            <GenTitle>Kanto - First Gen</GenTitle>
            <CardPokemons />
        </FramePokeCardsContainer>

    );
}

export default FramePokeCards;
