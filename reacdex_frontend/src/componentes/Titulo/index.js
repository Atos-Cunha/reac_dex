import styled from 'styled-components';

export const Titulo = styled.h2`
    width: 100%;
    padding: 30px 0;
    background-color: #FFF;
    color: ${props => props.cor || '#EB9B00'};
    font-size: ${props => props.tamanhoFonte || 'reacdex_frontend/src/componentes/Titulo/index.jspx;'};
    text-align: ${props => props.alinhamento || 'center'};
    margin: 0;
`