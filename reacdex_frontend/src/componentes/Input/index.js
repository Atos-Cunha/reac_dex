import styled from 'styled-components';


const Input = styled.input`
background: transparent;    
text-align: center;
width: 200px;
padding: 10px 140px;
border-radius: 20px;
margin-bottom: 10px;
border: 1px solid #FFF;
color: #fff;
font-family: 'Montserrat','Helvetica Neue',Arial,sans-serif;
font-size: 20px;
font-weight: 700;
line-height: 1;
letter-spacing: 0.5px;

    &::placeholder {
        color: #fff;
        font-size: 15px;
        // text-shadow: 2px 2px 0 #000,
        //              -2px 2px 0 #000,
        //              -2px -2px 0 #000,
        //              2px -2px 0 #000;
    }

    &:focus {
        outline: none;
        background: rgba(255, 255, 255, 0.2);
    }
`;

export default Input;