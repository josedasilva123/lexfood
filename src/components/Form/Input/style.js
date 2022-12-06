import styled, { css } from "styled-components";

export const StyledInput = styled.input`
    ${({error}) => {
        if(error){
            return css`
                border: 2px solid red;
            `
        }
    }}
`