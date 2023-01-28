import React, { useContext } from "react";
import { RecipeSinglePageContext } from "../../providers/RecipeContext/RecipeSinglePageContext/RecipeSinglePageContext";
import { StyledParagraph } from "../../styles/typography";
import ReviewCard from "./ReviewCard";
import { StyledAlertBox, StyledReviewList } from "./style";

const ReviewList = () => {
   const { recipe } = useContext(RecipeSinglePageContext);
   return (
      <>
         {(recipe?.reviews && recipe?.reviews.length > 0) ? (
            <StyledReviewList>
               {recipe?.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
               ))}
            </StyledReviewList>
         ) : (
            <StyledAlertBox>
               <StyledParagraph>Nenhuma avaliação foi cadastrada ainda, porque você não deixa a primeira?</StyledParagraph>
            </StyledAlertBox>           
         )}
      </>
   );
};

export default ReviewList;
