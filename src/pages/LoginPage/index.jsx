import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../../components/Form/LoginForm";
import { StyledButton } from "../../styles/buttons";
import { StyledTitle } from "../../styles/typography";
import { StyledLoginPage, StyledLoginPageFlexBox } from "./style";

const LoginPage = ({ userLogin }) => {
   /* 
      Link: componente que exclusivamente faça um redirecionamento 
      useNavigate: redirecionamento dentro de funções lógicas
   */
   return (
      <StyledLoginPage>
         <div className="container">
            <StyledLoginPageFlexBox>
               <div className="innerBox">
                  <StyledTitle tag="h1" fontSize="one" fontWeight={600} textAlign="center">
                     Bem vindo as receitinhas do Alex
                  </StyledTitle>

                  <LoginForm userLogin={userLogin} />
               </div>
            </StyledLoginPageFlexBox>
         </div>
      </StyledLoginPage>
   );
};

export default LoginPage;
