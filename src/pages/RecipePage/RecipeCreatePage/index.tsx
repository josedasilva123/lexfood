import React from "react";
import RecipeCreateForm from "../../../components/Form/RecipeCreateForm";
import Header from "../../../components/Header";
import { StyledLinkButton } from "../../../styles/buttons";
import { StyledContainer } from "../../../styles/grid";
import { StyledParagraph, StyledTitle } from "../../../styles/typography";
import { MdArrowBack, MdLunchDining } from "react-icons/md";
import { StyledRecipeCreatePage } from "./style";

const RecipeCreatePage = () => {
   return (
      <StyledRecipeCreatePage>
         <Header />
         <StyledContainer containerWidth={900}>
            <div className="flexBox">
               <StyledLinkButton className="backButton" to="/recipes" buttonStyle="outline1" buttonSize="round" title="Voltar">
                  <MdArrowBack />
               </StyledLinkButton>
               <div className="left">
                  <MdLunchDining size={32} />
                  <StyledTitle tag="h1" fontSize="one">
                     Criar nova receita
                  </StyledTitle>
                  <StyledParagraph>Preencha os campos abaixo para adicionar uma nova receita</StyledParagraph>
               </div>
               <div className="right">
                  <RecipeCreateForm />
               </div>
            </div>
         </StyledContainer>
      </StyledRecipeCreatePage>
   );
};

export default RecipeCreatePage;
