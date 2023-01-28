import React from "react";
import { iRecipe } from "../../../providers/RecipeContext/@types";
import { StyledTitle } from "../../../styles/typography";
import Breadcrumbs from "../../Breadcrumbs";
import FavoriteButton from "../../FavoriteButton";
import { StyledRecipeSingleHeader } from "./style";

interface iRecipeSingleHeaderProps {
   recipe: iRecipe;
}

const RecipeSingleHeader = ({ recipe }: iRecipeSingleHeaderProps) => {
   return (
      <StyledRecipeSingleHeader>
         <Breadcrumbs currentPage={recipe?.title as string} />
         <div>
            <StyledTitle tag="h1" fontSize="two" fontWeight={700}>
               {recipe?.title}
            </StyledTitle>
            <FavoriteButton currentRecipe={recipe}/>
         </div>
      </StyledRecipeSingleHeader>
   );
};

export default RecipeSingleHeader;
