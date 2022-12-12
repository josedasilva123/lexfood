import styled from "styled-components";

export const StyledRecipeCategories = styled.ul`
   display: flex;
   align-items: center;
   gap: 10px;
   flex-wrap: wrap;
   margin: 30px 0;

   @media (max-width: 800px) {
      margin-right: -10px;
      flex-wrap: nowrap;
      overflow-x: scroll;
      padding-bottom: 20px;

      ::-webkit-scrollbar {
         height: 8px;
      }

      ::-webkit-scrollbar-track {
         background: ${({ theme }) => theme.colors.lightgray};
      }

      ::-webkit-scrollbar-thumb {
         background: ${({ theme }) => theme.colors.orange};
      }
   }
`;
