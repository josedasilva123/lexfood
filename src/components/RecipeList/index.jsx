import React from "react";
import { StyledParagraph } from "../../styles/typography";
import RecipeCard from "./RecipeCard";
import { StyledRecipeList } from "./style";

const RecipeList = ({ filteredRecipeList, addRecipeToFavoriteList }) => {
   return (
      <>
         {filteredRecipeList.length === 0 && <StyledParagraph>Desculpe, nenhum resultado foi encontrado...</StyledParagraph>}
         <StyledRecipeList>
            {filteredRecipeList.map((recipe, index) => (
               <RecipeCard key={index} recipe={recipe} addRecipeToFavoriteList={addRecipeToFavoriteList} />
            ))}
         </StyledRecipeList>
      </>
   );
};

export default RecipeList;
