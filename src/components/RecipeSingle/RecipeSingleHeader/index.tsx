import React, { useContext } from "react";
import { MdFavorite } from "react-icons/md";
import { FavoriteContext } from "../../../providers/FavoriteContext/FavoriteContext";
import { iRecipe } from "../../../providers/RecipeContext/@types";
import { StyledButton } from "../../../styles/buttons";
import { StyledTitle } from "../../../styles/typography";
import Breadcrumbs from "../../Breadcrumbs";
import { StyledRecipeSingleHeader } from "./style";

interface iRecipeSingleHeaderProps {
   recipe: iRecipe;
}

const RecipeSingleHeader = ({ recipe }: iRecipeSingleHeaderProps) => {
   const { addRecipeToFavoriteList } = useContext(FavoriteContext);
   return (
      <StyledRecipeSingleHeader>
         <Breadcrumbs currentPage={recipe?.title as string} />
         <div>
            <StyledTitle tag="h1" fontSize="two" fontWeight={700}>
               {recipe?.title}
            </StyledTitle>
            <StyledButton buttonSize="round" buttonStyle="solid1" onClick={() => addRecipeToFavoriteList(recipe)}>
               <MdFavorite />
            </StyledButton>
         </div>
      </StyledRecipeSingleHeader>
   );
};

export default RecipeSingleHeader;
