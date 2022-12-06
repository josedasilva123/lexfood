import React from "react";
import { MdArrowBack } from "react-icons/md";
import RegisterForm from "../../components/Form/RegisterForm";
import { StyledLinkButton } from "../../styles/buttons";
import { StyledRegisterPage, StyledRegisterPageFlexBox } from "./style";

const RegisterPage = ({ userRegister }) => {
   return (
      <StyledRegisterPage>
         <StyledRegisterPageFlexBox>
            <div className="innerBox">
               <RegisterForm userRegister={userRegister} />
               <StyledLinkButton to="/" buttonStyle="outline1" buttonSize="big">
                  <MdArrowBack size={21} /> Voltar para o início
               </StyledLinkButton>
            </div>
         </StyledRegisterPageFlexBox>
      </StyledRegisterPage>
   );
};

export default RegisterPage;
