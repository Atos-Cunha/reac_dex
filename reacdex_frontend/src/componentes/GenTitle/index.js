import styled from 'styled-components';

export const GenTitle = styled.h2`
    width: 100%;
    padding: 50px 0;
    // background-color: #77757517;
    background-color: #ffffff24;
    color: ${props => props.cor || '#EB9B00'};
    font-size: 50px;
    text-align: ${props => props.alinhamento || 'center'};
    margin: 0;
    // border : 2px solid #000;
    border-radius: 20px;
`