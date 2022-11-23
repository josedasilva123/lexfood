import React from "react";
import { StyledButton } from "../../styles/buttons";
import { StyledTitle } from "../../styles/typography";
import { StyledLoginPage, StyledLoginPageFlexBox } from "./style";

const LoginPage = ({ setLogin }) => {
   return (
      <StyledLoginPage>
         <div className="container">
            <StyledLoginPageFlexBox>
               <div className="innerBox">
                  <StyledTitle tag="h1" fontSize="one" fontWeight={600} textAlign="center">
                     Bem vindo as receitinhas do Alex
                  </StyledTitle>
                  <StyledButton type="button" buttonSize="big" buttonStyle="solid1" onClick={() => setLogin(true)}>
                     Logar
                  </StyledButton>
               </div>
            </StyledLoginPageFlexBox>
         </div>
      </StyledLoginPage>
   );
};

export default LoginPage;
