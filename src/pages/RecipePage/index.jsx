import React, { useEffect, useState } from "react";
import RecipeCategories from "../../components/RecipeCategories";
import RecipeList from "../../components/RecipeList";
import Header from "../../components/Header";
import { api } from "../../api/api";
import SearchForm from "../../components/SearchSection/SearchForm";
import { StyledTitle } from "../../styles/typography";
import { StyledButton } from "../../styles/buttons";
import { StyledContainer } from "../../styles/grid";
import { StyledRecipePage } from "./style";
import SearchSection from "../../components/SearchSection";
import { useContext } from "react";
import { RecipeContext } from "../../providers/RecipeContext";
import CreateRecipeForm from "../../components/Form/CreateRecipeForm";

const RecipePage = () => {
   const { loading } = useContext(RecipeContext);

   return (
      <StyledRecipePage>
         {loading ? (
            <h1>Carregando...</h1>
         ) : (
            <>
               <Header />
               <CreateRecipeForm />
               <StyledContainer>
                  <SearchSection />
                  <RecipeCategories />
                  <RecipeList  />
               </StyledContainer>
            </>
         )}
      </StyledRecipePage>
   );
};

export default RecipePage;
