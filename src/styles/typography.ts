/* eslint-disable default-case */
import styled, { css } from "styled-components";
import BaseTitle, { iBaseTitleProps } from "./components/BaseTitle";

interface iStyledTitleProps extends iBaseTitleProps{
   textAlign?: number;
   fontWeight: number;
   fontSize: "one" | "two" | "three" | "four";
}

export const StyledTitle = styled(BaseTitle)<iStyledTitleProps>`
   text-align: ${({ textAlign }) => textAlign};
   font-weight: ${({ fontWeight }) => fontWeight};

   color: ${({ theme }) => theme.colors.black};

   ${({ fontSize }) => {
      switch (fontSize) {
         case "one":
            return css`
               font-size: 2.8rem;
               @media (max-width: 800px) {
                  font-size: 2rem;
               }
               @media (max-width: 400px) {
                  font-size: 1.6rem;
               }
            `;
         case "two":
            return css`
               font-size: 2.5rem;
               @media (max-width: 800px) {
                  font-size: 1.8rem;
               }
               @media (max-width: 400px) {
                  font-size: 1.4rem;
               }
            `;
         case "three":
            return css`
               font-size: 1.8rem;
               @media (max-width: 800px) {
                  font-size: 1.5rem;
               }
               @media (max-width: 400px) {
                  font-size: 1.25rem;
               }
            `;
         case "four":
            return css`
               font-size: 1.25rem;
               @media (max-width: 800px) {
                  font-size: 1rem;
               }
            `;
      }
   }}
`;

export const StyledParagraph = styled.p`
   font-size: 1rem;
   font-weight: 400;
   color: ${({ theme }) => theme.colors.black};
`;
