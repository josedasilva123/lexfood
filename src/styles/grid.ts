import styled from "styled-components";

interface iStyledContainerProps{
    containerWidth?: number;
}

export const StyledContainer = styled.div<iStyledContainerProps>`
    width: 100%;
    max-width: ${({containerWidth}) => containerWidth ? containerWidth : 1024}px;
    margin: 0 auto;
    padding: 10px;   
`