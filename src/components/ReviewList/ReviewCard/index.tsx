import React, { useContext } from "react";
import { iReview } from "../../../providers/RecipeContext/RecipeSinglePageContext/@types";
import { StyledParagraph } from "../../../styles/typography";
import { stringAvatar } from "../../../utils/material/avatar";
import { StyledAvatar, StyledRating, StyledReviewCard } from "./style";
import { UserContext } from "../../../providers/UserContext/UserContext";
import ReviewCardControls from "./ReviewCardControls";

interface iReviewCardProps {
   review: iReview;
}

const ReviewCard = ({ review }: iReviewCardProps) => {
   const { user } = useContext(UserContext);
   return (
      <StyledReviewCard>
         <header>
            <div className="name">
               <StyledAvatar {...stringAvatar(review.userName)} />
               <StyledParagraph>
                  <strong>{review.userName}</strong>
               </StyledParagraph>
            </div>
            <div className="score">
               <span>{review.score}</span>
               <StyledRating value={review.score} precision={0.5} readOnly />
            </div>
         </header>
         <StyledParagraph>{review.content}</StyledParagraph>
         {user?.id === review.userId && (
           <ReviewCardControls review={review} />
         )}         
      </StyledReviewCard>
   );
};

export default ReviewCard;
