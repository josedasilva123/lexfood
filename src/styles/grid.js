import styled from "styled-components";

export const StyledContainer = styled.div`
    width: 100%;
    max-width: ${({containerWidth}) => containerWidth ? containerWidth : 1024}px;
    margin: 0 auto;
    padding: 10px;   
`