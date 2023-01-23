import styled from "styled-components";

export const StyledRecipeCard = styled.li`    
    box-shadow: 0 0 12px 0 rgba(0,0,0, .25);
    background: ${({theme}) => theme.colors.white};

    .content{
        padding: 32px 16px;
    }

    .buttonBox{
        gap: 8px;
        margin-top: 30px;
        display: flex;
        align-items: center;
    }

    img{
        width: 100%;
        height: 180px;
        object-fit: cover;
    }

    h3{
        margin-bottom: 1rem;
    }

    p{
        min-height: 57px;
    }
`