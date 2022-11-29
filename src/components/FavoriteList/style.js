import styled, { css } from "styled-components";
import { AnimationFade, AnimationFadeOut } from "../../styles/animations";

export const StyledFavoriteList = styled.div`
   position: fixed;
   width: 100%;
   max-width: 380px;
   right: 0;
   top: 0;
   background: ${({ theme }) => theme.colors.white};
   box-shadow: 0 0 25px 0 ${({ theme }) => theme.colors.black20};
   min-height: 100vh;
   ${({ isClosing }) => {
      if (isClosing) {
         return css`
            animation: ${AnimationFadeOut} 0.6s forwards;
         `;
      } else {
         return css`
            animation: ${AnimationFade} 0.6s forwards;
         `;
      }
   }}

   & > div {
      position: relative;
      padding: 30px;

      & > button {
         position: absolute;
         top: 10px;
         right: 10px;
         opacity: 0.5;
         transition: 0.4s;

         &:hover {
            opacity: 1;
         }
      }

      @media (max-width: 500px){
        padding: 25px 16px;
      }
   }
`;

export const StyledFavoriteListUL = styled.ul`
   padding-right: 20px;
   max-height: 80vh;
   overflow-y: scroll;
   margin-top: 32px;
   display: flex;
   flex-direction: column;
   gap: 20px;

   ::-webkit-scrollbar {
      width: 8px;
   }

   ::-webkit-scrollbar-track {
      background: ${({theme}) => theme.colors.lightgray}
   }

   ::-webkit-scrollbar-thumb {
      background: ${({theme}) => theme.colors.orange}
   }
`;
