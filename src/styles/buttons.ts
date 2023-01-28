/* eslint-disable default-case */
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

interface iStyledButtonProps {
   $buttonSize?: "default" | "big" | "small" | "round";
   $buttonStyle: "solid1" | "solid2" | "outline1" | "outline2" | "link";
}

export const buttonCSS = css<iStyledButtonProps>`
   display: inline-flex;
   align-items: center;
   justify-content: center;
   gap: 1rem;
   border-radius: 255px;
   transition: 0.4s;

   font-size: 1rem;

   &:hover {
      filter: brightness(1.2);
   }

   ${({ $buttonSize }) => {
      switch ($buttonSize) {
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
         case "round":
            return css`
               width: 40px;
               min-width: 40px;
               height: 40px;
            `;
      }
   }}

   ${({ theme, $buttonStyle }) => {
      switch ($buttonStyle) {
         case "solid1":
            return css`
               background: ${theme.colors.orange};
               color: ${theme.colors.lockWhite};
            `;
         case "solid2":
            return css`
               background: ${theme.colors.white};
               color: ${theme.colors.lockOrange};
            `;

         case "outline1":
            return css`
               border: 1px solid ${theme.colors.lockOrange};
               color: ${theme.colors.lockOrange};

               &:hover {
                  background: ${theme.colors.orange};
                  color: ${theme.colors.lockWhite};
               }
            `;

         case "outline2":
            return css`
               border: 1px solid ${theme.colors.lockWhite};
               color: ${theme.colors.lockWhite};

               &:hover {
                  background: ${theme.colors.lockWhite};
                  color: ${theme.colors.orange};
               }
            `;
         
         case "link":
            return css`
               color: ${theme.colors.orange};
            `   
      }
   }}
`;

export const StyledButton = styled.button<iStyledButtonProps>`
   ${buttonCSS}
`;

export const StyledLinkButton = styled(Link)<iStyledButtonProps>`
   ${buttonCSS}
`;
