import styled from "styled-components";

export const StyledHeader = styled.header`
   background: ${({ theme }) => theme.colors.orange};
   padding: 0.8rem 0;

   .logo {
      font-size: 2rem;
      color: ${({ theme }) => theme.colors.lockWhite};

      strong {
         font-weight: 700;
      }

      @media (max-width: 800px) {
         font-size: 1.2rem;
      }
   }

   .controls {
      display: flex;
      align-items: center;
      gap: 15px;
      color: ${({ theme }) => theme.colors.lockWhite};

      span {
         display: block;

         @media (max-width: 800px) {
            display: none;
         }
      }
   }

   .darkMode {
      color: ${({ theme }) => theme.colors.lockWhite};
   }

   .favorite {
      display: flex;
      align-items: center;
      gap: 10px;
      color: ${({ theme }) => theme.colors.lockWhite};
   }

   @media (max-width: 800px){
      padding: 0;
   }
`;

export const StyledHeaderFlexBox = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   gap: 20px;

   @media (max-width: 400px){
      gap: 10px;
   }
`;
