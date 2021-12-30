import styled from "styled-components";

import { LetterState } from "../models";

export const Submit = styled.button<{ small: boolean | undefined }>`
  margin-left: 10px;
  align-items: center;
  background-color: #18dfdf;
  border: 2px solid #111;
  border-radius: 8px;
  box-sizing: border-box;
  color: #111;
  cursor: pointer;
  display: flex;
  font-family: Inter,sans-serif;
  font-size: 16px;
  height: 40px;
  justify-content: center;
  line-height: 24px;
  max-width: 100%;
  padding: 0 ${props => props.small ? "10px" : "25px"};
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  font-weight: 600;

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
  padding: 0 2rem;
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