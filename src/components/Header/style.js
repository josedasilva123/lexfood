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
   }

   .controls {
      display: flex;
      align-items: center;
      gap: 15px;
      color: ${({ theme }) => theme.colors.lockWhite};

      span {
         display: block;
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
`;

export const StyledHeaderFlexBox = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   gap: 20px;
`;
