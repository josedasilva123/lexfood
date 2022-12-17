import styled from "styled-components"

export const StyledSearchSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

export const StyledSearchResults = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: space-between;

    h2 > span{
        color: ${({theme}) => theme.colors.orange};
    }
`