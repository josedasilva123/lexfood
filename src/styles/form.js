import styled from "styled-components";

export const StyledForm = styled.form`
   width: 100%;
   display: flex;
   flex-direction: column;
   gap: 16px;

   label,
   input {
      display: block;
   }

   input[type="text"],
   input[type="email"],
   input[type="password"],
   input[type="password"],
   select {
      background: ${({ theme }) => theme.colors.lightgray};
      width: 100%;
      padding: 0 20px;
      height: 48px;
      color: ${({ theme }) => theme.colors.black};
   }

   input:focus {
      outline-color: ${({ theme }) => theme.colors.orange};
   }

   input:disabled {
      cursor: not-allowed;
      opacity: 0.5;
   }

   fieldset {
      display: flex;
      flex-direction: column;
      gap: 8px;
   }
`;

export const StyledFieldError = styled.p`
   font-weight: 500;
   color: red;
`;

/*
${({ inputValue }) => {
      if (inputValue) {
         return css`
            input {
               opacity: 1;
               transform: translate(0, -80px);
            }
         `;
      } else {
         return css`
            label {
               opacity: 0.5;
               transform: translate(20px, -45px);
               transition: 0.3s;
            }

            input:focus + label {
               opacity: 1;
               transform: translate(0, -80px);
            }
         `;
      }
   }}
   */
