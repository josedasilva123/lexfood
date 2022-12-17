import { FieldError } from "react-hook-form";
import styled, { css } from "styled-components";

interface iStyledInputProps{
    error: FieldError;
}

export const StyledInput = styled.input<FieldError>`
    ${({error}) => {
        if(error){
            return css`
                border: 2px solid red;
            `
        }
    }}
`