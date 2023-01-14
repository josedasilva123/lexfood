import React from "react";
import LoginForm from "../../components/Form/LoginForm";
import { StyledLinkButton } from "../../styles/buttons";
import { StyledTitle } from "../../styles/typography";
import { StyledLoginPage, StyledLoginPageFlexBox } from "./style";
import { MdLogin } from "react-icons/md"
import Logo from "../../assets/LogoAlex.png"

const LoginPage = () => {
   /* 
      Link: componente que exclusivamente faça um redirecionamento 
      useNavigate: redirecionamento dentro de funções lógicas
   */
   return (
      <StyledLoginPage>
         <div className="container">
            <StyledLoginPageFlexBox>
               <div className="innerBox">
                  <img src={Logo} alt="Logo Receitinhas do Alex" />
                  <LoginForm />
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
