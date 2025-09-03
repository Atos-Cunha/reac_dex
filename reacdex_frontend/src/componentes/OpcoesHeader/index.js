import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Opcao = styled.li`
    // display: flex;
    // justify-content: center;
    // align-items: center;
    // text-align: center;

    // color: #000;
    // font-size: 20px;

    // min-width: 120px;
    // padding: 0 5px;
    // height: 100%;
    
    // cursor: pointer;
    
    // font-size: 20px;
    // font-family: 'Montserrat','Helvetica Neue',Arial,sans-serif; 
    // font-weight: 800;
    // letter-spacing: 0.5px; 


  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  min-width: 120px;
  padding: 10px 20px;
  height: 50px;
  margin: 0 5px;

  font-size: 20px;
  font-family: 'Montserrat','Helvetica Neue',Arial,sans-serif; 
  font-weight: 700;
  letter-spacing: 0.5px;

  color: #fff;
  background: #3a6ea5;
  border-radius: 20px;
  border: 2px solid transparent;

  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #28527a;
    border-color: #1c3a57;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
    background: #1c3a57;
  }
`;

const Opcoes = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const opcoes = ['HOME', 'EVOLVES', 'TYPES', 'FAV'];

function opcoes_header() {
    return (
        <Opcoes>
            {opcoes.map((texto) => (
                <Link
                    key={texto}
                    to={texto.toLowerCase() === "home" ? "/" : `/${texto.toLowerCase()}`}
                >
                    <Opcao>
                        <p>{texto === "FAV" ? "FAVORITES" : texto}</p>
                    </Opcao>
                </Link>
            ))}
        </Opcoes>
    );
}

export default opcoes_header;
