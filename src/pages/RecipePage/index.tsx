import React from "react";
import RecipeCategories from "../../components/RecipeCategories";
import RecipeList from "../../components/RecipeList";
import Header from "../../components/Header";
import { StyledContainer } from "../../styles/grid";
import { StyledRecipePage } from "./style";
import SearchSection from "../../components/SearchSection";
import { useContext } from "react";
import { RecipeContext } from "../../providers/RecipeContext/RecipeContext";
import RecipeControls from "../../components/RecipeControls";

const RecipePage = () => {
   const { loading } = useContext(RecipeContext);

   return (
      <StyledRecipePage>
         {loading ? (
            <h1>Carregando...</h1>
         ) : (
            <>
               <Header />
               <StyledContainer>
                  <RecipeControls />
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
