import React from "react";
import RecipeCreateForm from "../../../components/Form/RecipeCreateForm";
import Header from "../../../components/Header";
import { StyledLinkButton } from "../../../styles/buttons";
import { StyledContainer } from "../../../styles/grid";
import { StyledParagraph, StyledTitle } from "../../../styles/typography";
import { MdArrowBack } from "react-icons/md"

const RecipeCreatePage = () => {
   return (
      <div>
         <Header />
         <StyledContainer containerWidth={720}>
            <StyledLinkButton to="/recipes" buttonStyle="outline1" buttonSize="small">
               <MdArrowBack />
               Voltar
            </StyledLinkButton>
            <StyledTitle tag="h1" fontSize="one">Criar nova receita</StyledTitle>
            <StyledParagraph>Preencha os campos abaixo para adicionar uma nova receita</StyledParagraph>
            <RecipeCreateForm />
         </StyledContainer>
      </div>
   );
};

export default RecipeCreatePage;
