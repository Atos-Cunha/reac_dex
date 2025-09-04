import styled from "styled-components";

const InputCxBx = styled.input.attrs({ type: "checkbox" })`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  
  cursor: pointer;
  width: 20px;
  height: 20px;
  border: 2px solid #fff;
  border-radius: 50%;
  display: inline-block;
  background: #ffffff4c;

  transition:
    background-color 0.5s ease, 
    border 1s ease,
    transform 0.3s ease;

  &:checked {
    height: 20px;
    width: 20px;
    background-color: #000;
    border-radius: 50%;
    border-block-style: solid;
    border-block-width: 6px;
    border-left: none;
    border-right: none;
    border-top-color: red;
    border-bottom-collor: white;
  }
`;

export default InputCxBx;