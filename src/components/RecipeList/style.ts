import styled from "styled-components";

export const StyledRecipeList = styled.ul`
   display: grid;
   grid-template-columns: repeat(3, 1fr);
   gap: 2rem;

   @media (max-width: 900px) {
        grid-template-columns: repeat(2, 1fr);
   }

   @media (max-width: 520px) {      
        grid-template-columns: 1fr;      
   }
`;
