import styled from "styled-components";

export const StyledSinglePage = styled.div`
    background: ${({theme})=> theme.colors.lightgray};
    min-height: 100vh;
    .recipeBox{
        margin-top: 30px;
        background: ${({theme})=> theme.colors.white};
        & > .thumbnail{
            display: flex;
            width: 100%;
            object-fit: cover;
            height: 360px;
        }
        .contentBox{
            padding: 30px 20px 40px;
        }
    }
`