/* eslint-disable default-case */
import styled, { css } from "styled-components";
import BaseTitle from "./components/BaseTitle";

/* passagem de props simples */

// com uma arrow function você pode receber a props com callback
// (assim como componente lógicos de React fazem)
// (props) =>
// estas props podem ser desestruturadas. ex ({potato} => potato)
// o valor da props podem ter diversas finalidades 
// (finalidades simples como nos exemplos iniciais) (fontWeight, color)
// ou finalidades complexas como no fontSize

export const StyledTitle = styled(BaseTitle)`
   text-align: ${({ textAlign }) => textAlign};
   font-weight: ${({ fontWeight }) => fontWeight}; 

   color: ${({theme}) => theme.colors.black};

   ${({ fontSize }) => {
      switch (fontSize) {
         case "one":
            return css`
               font-size: 2.8rem;
               @media (max-width: 800px){
                 font-size: 2rem;
               }
               @media (max-width: 400px){
                 font-size: 1.6rem;  
               }
            `;
         case "two":
            return css`
               font-size: 2.5rem;
               @media (max-width: 800px){
                  font-size: 1.8rem;
               }
               @media (max-width: 400px){
                  font-size: 1.4rem; 
               }
            `;
         case "three":
            return css`
               font-size: 1.8rem;
               @media (max-width: 800px){
                  font-size: 1.5rem;
               }
               @media (max-width: 400px){
                  font-size: 1.25rem;
               }
            `;
      }

      /*
        if(fontSize === "one"){
            return css`
                font-size: 2.8rem;
            `
        
        } else if (fontSize === "two"){
            return css`
                font-size: 2.5rem;
            `
       
        } else if (fontSize === "three"){
           return css`
                font-size: 1.8rem;
           ` 
        } else if (fontSize === "three"){
           return css`
                font-size: 1.8rem;
           ` 
        } else if (fontSize === "three"){
           return css`
                font-size: 1.8rem;
           ` 
        } else if (fontSize === "three"){
           return css`
                font-size: 1.8rem;
           ` 
        }
        */
   }}
`;

