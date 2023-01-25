import { FieldError } from "react-hook-form";
import styled, { css } from "styled-components";

interface iStyledTeaareaProps{
    error?: FieldError;
}

export const StyledTextarea = styled.textarea<iStyledTeaareaProps>`
    ${({error}) => {
        if(error){
            return css`
                border: 2px solid red;
            `
        }
    }}
`