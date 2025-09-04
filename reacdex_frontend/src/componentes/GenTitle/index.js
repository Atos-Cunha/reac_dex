import styled from 'styled-components';

export const GenTitle = styled.h2`
    width: 100%;
    padding: 50px 0;
    color: ${props => props.cor || '#fff'};
    font-size: 50px;
    text-align: ${props => props.alinhamento || 'center'};
    margin: 0;
    border-radius: 20px;
`