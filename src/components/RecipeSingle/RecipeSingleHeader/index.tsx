import { Rating } from "@mui/material";
import { iRecipe } from "../../../providers/RecipeContext/@types";
import { StyledTitle } from "../../../styles/typography";
import Breadcrumbs from "../../Breadcrumbs";
import FavoriteButton from "../../FavoriteButton";
import { StyledRecipeSingleHeader } from "./style";

interface iRecipeSingleHeaderProps {
   recipe: iRecipe;
}

const RecipeSingleHeader = ({ recipe }: iRecipeSingleHeaderProps) => {
   const totalRating = recipe.reviews?.reduce((prevValue, currentReview) => {
      return currentReview.score + prevValue;
   }, 0);

   return (
      <StyledRecipeSingleHeader>
         <Breadcrumbs currentPage={recipe?.title as string} />
         <div>
            <div>
               {recipe.reviews && recipe.reviews.length > 0 && (
                  <div className="totalScore">
                     <span>{(totalRating / recipe.reviews.length).toFixed(1)}</span>
                     <Rating value={totalRating / recipe.reviews.length} readOnly precision={0.25} />
                  </div>
               )}

               <StyledTitle tag="h1" fontSize="two" fontWeight={700}>
                  {recipe?.title}
               </StyledTitle>
            </div>

            <FavoriteButton currentRecipe={recipe} />
         </div>
      </StyledRecipeSingleHeader>
   );
};

export default RecipeSingleHeader;
