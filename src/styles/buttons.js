/* eslint-disable default-case */
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

export const buttonCSS = css`
   display: inline-flex;
   align-items: center;
   justify-content: center;
   gap: 1rem;
   border-radius: 255px;
   transition: 0.4s;

   &:hover {
      filter: brightness(1.2);
   }

   ${({ buttonSize }) => {
      switch (buttonSize) {
         case "default":
            return css`
               padding: 0 2rem;
               height: 44px;
            `;
         case "big":
            return css`
               padding: 0 2.5rem;
               height: 52px;
            `;
         case "small":
            return css`
               padding: 0 1.75rem;
               height: 40px;
            `;
      }
   }}

   ${({ theme, buttonStyle }) => {
      switch (buttonStyle) {
         case "solid1":
            return css`
               background: ${theme.colors.orange};
               color: ${theme.colors.white};
            `;
         case "solid2":
            return css`
               background: ${theme.colors.white};
               color: ${theme.colors.orange};
            `;

         case "outline1":
            return css`
               border: 1px solid ${theme.colors.orange};
               color: ${theme.colors.orange};

               &:hover {
                  background: ${theme.colors.orange};
                  color: ${theme.colors.white};
               }
            `;

         case "outline2":
            return css`
               border: 1px solid ${theme.colors.white};
               color: ${theme.colors.white};

               &:hover {
                  background: ${theme.colors.white};
                  color: ${theme.colors.orange};
               }
            `;
      }
   }}
`;

export const StyledButton = styled.button`
   ${buttonCSS}
`;

export const StyledLinkButton = styled(Link)`
   ${buttonCSS}
`;
