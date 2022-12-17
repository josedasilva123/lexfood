import { FieldError } from "react-hook-form";
import styled, {css} from "styled-components";

interface iStyledSelectProps{
    error?: FieldError;
}

export const StyledSelect = styled.select<iStyledSelectProps>`
    ${({error}) => {
        if(error){
            return css`
                border: 2px solid red;
            `
        }
    }}
`