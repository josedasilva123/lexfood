import styled from "styled-components";

export const StyledRecipeCreatePage = styled.div`
   background: ${({ theme }) => theme.colors.lightgray};
   min-height: 100vh;
   .flexBox {
      position: relative;
      display: flex;
      gap: 40px;
      background: ${({ theme }) => theme.colors.white};
      padding: 80px 40px 40px;
      margin-top: 30px;
      .left,
      .right {
         width: 100%;
      }
      .left {
         display: flex;
         flex-direction: column;
         gap: 20px;
         svg {
            fill: ${({ theme }) => theme.colors.lockOrange};
         }
      }
      .backButton {
         position: absolute;
         top: 20px;
         left: 20px;
      }
   }
`;
