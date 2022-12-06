import React from "react";
import LoginForm from "../../components/Form/LoginForm";
import { StyledLinkButton } from "../../styles/buttons";
import { StyledTitle } from "../../styles/typography";
import { StyledLoginPage, StyledLoginPageFlexBox } from "./style";
import { MdLogin } from "react-icons/md"

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
                     Receitas do Alex
                  </StyledTitle>
                  <LoginForm userLogin={userLogin} />
                  <StyledLinkButton to="/register" buttonStyle="outline1" buttonSize="big">
                     <MdLogin size={21} /> Cadastrar-se
                  </StyledLinkButton>
               </div>
            </StyledLoginPageFlexBox>
         </div>
      </StyledLoginPage>
   );
};

export default LoginPage;
