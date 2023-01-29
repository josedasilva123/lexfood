import styled from "styled-components";

export const StyledScoreBox = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;

    .currentScore{
        font-weight: 600;
        color: ${({theme}) => theme.colors.black}
    }
    
`