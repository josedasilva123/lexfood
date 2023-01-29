import styled from "styled-components";

export const StyledRecipeSingleHeader = styled.header`
   padding: 20px;
   & > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
   }

   .totalScore{
      display: flex;
      align-items: center;
      gap: 10px;
      
      & > span:first-child{
         font-size: 1rem;
         font-weight: 600;
         color: ${({theme}) => theme.colors.black};        
      }
   }   
`;
