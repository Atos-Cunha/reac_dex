import styled from 'styled-components';

const InputCxBx = styled.input.attrs({ type: "checkbox" })`
  appearance: none;
  cursor: pointer;
  width: 20px;
  height: 20px;

  border: 2px solid #fff;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  background: #ffffff4c;

  transition: 
    background-color 0.5s ease, 
    border 1s ease, 
    border-radius 1s ease, 
    transform 0.3s ease;

  &:checked {
    appearance: none;
    border-radius: 50%;
    background-color: #000;
    border: 5px solid;
    border-image: linear-gradient(170deg, #f80606ff 50%, #fff 50%);
    // border-color: linear-gradient(170deg, #f80606ff 50%, #fff 50%);
    border-image-slice: 1;
  }
`;

export default InputCxBx;
