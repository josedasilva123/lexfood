import styled, {css} from "styled-components";

export const StyledSelect = styled.select`
    ${({error}) => {
        if(error){
            return css`
                border: 2px solid red;
            `
        }
    }}
`