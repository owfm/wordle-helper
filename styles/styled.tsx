import styled from "styled-components";

import { LetterState } from "../models";

export const Submit = styled.button<{ small: boolean | undefined }>`
  -webkit-user-select: none;
  align-items: center;
  background-color: #18dfdf;
  border-radius: 8px;
  border: 2px solid #111;
  box-sizing: border-box;
  color: #111;
  cursor: pointer;
  display: flex;
  font-family: Inter,sans-serif;
  font-size: 16px;
  font-weight: 600;
  height: 40px;
  justify-content: center;
  line-height: 24px;
  margin-left: 10px;
  max-width: 100%;
  padding: 0 ${props => props.small ? "10px" : "25px"};
  position: relative;
  text-align: center;
  text-decoration: none;
  touch-action: manipulation;
  user-select: none;
  max-width: fit-content;

&:after {
  background-color: #111;
  border-radius: 8px;
  content: "";
  display: block;
  height: 40px;
  left: 0;
  width: 100%;
  position: absolute;
  top: -2px;
  transform: translate(3px, 3px);
  transition: transform .2s ease-out;
  z-index: -1;
}

&:hover:after {
  transform: translate(0, 0);
}

&:active {
  background-color: #ffdeda;
  outline: 0;
}

&:hover {
  outline: 0;
}

@media (min-width: 768px) {
  & {
    padding: 0 40px;
  }
}
`


export const LettersWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 100%;
  justify-content: left;
`

export const Letter = styled.button<{ letterState: number }>`
  text-transform: uppercase;
  display: flex;
  margin-bottom: 15px;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  font-size: 16px;
  border: 1px solid black;
  border-radius: 3px;
  font-weight: 600;
  background-color: 'lightgray';
  background-color: ${props => {
    switch (props.letterState) {
      case LetterState.WRONG:
        return "lightgray";
      case LetterState.MISPLACED:
        return "orange";
      case LetterState.CORRECT:
        return "green";
    }
  }}
`;

export const Wrapper = styled.main`
display: flex;
flex-direction: column;
  padding: 0 2rem;
  height: 100%;
`

export const Form = styled.form`
  display: flex;
  flex-direction: row;
  input: {
    padding: 8px 10px;
  }
  label {
    display: flex;
    flex-direction: column;
    font-weight: 600;
    margin-right: 8px;
  }
`