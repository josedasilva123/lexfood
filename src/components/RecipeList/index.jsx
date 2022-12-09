import React from "react";
import { useContext } from "react";
import { RecipeContext } from "../../providers/RecipeContext";
import { StyledParagraph } from "../../styles/typography";
import RecipeCard from "./RecipeCard";
import { StyledRecipeList } from "./style";

const RecipeList = () => {
   const { filteredRecipeList } = useContext(RecipeContext);
   
   return (
      <>
         {filteredRecipeList.length === 0 && <StyledParagraph>Desculpe, nenhum resultado foi encontrado...</StyledParagraph>}
         <StyledRecipeList>
            {filteredRecipeList.map((recipe, index) => (
               <RecipeCard key={index} recipe={recipe} />
            ))}
         </StyledRecipeList>
      </>
   );
};

export default RecipeList;
