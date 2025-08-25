import styled from 'styled-components';

export const GenTitle = styled.h2`
    width: 100%;
    padding: 50px 0;
    background-color: #FFF;
    color: ${props => props.cor || '#EB9B00'};
    font-size: 50px;
    text-align: ${props => props.alinhamento || 'center'};
    margin: 0;
`