import styled from "styled-components";

export const StyledRecipeCard = styled.li`    
    box-shadow: 0 0 12px 0 rgba(0,0,0, .25);
    background: var(--color-white);

    .content{
        padding: 2rem 1rem;
    }

    img{
        width: 100%;
        height: 180px;
        object-fit: cover;
    }

    h3{
        margin-bottom: 1rem;
    }

    button{
        margin-top: 2rem;
    }
`