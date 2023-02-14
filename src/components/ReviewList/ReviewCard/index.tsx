import { useContext, useState } from "react";
import { iReview } from "../../../providers/RecipeContext/RecipeSinglePageContext/@types";
import { StyledParagraph } from "../../../styles/typography";
import { stringAvatar } from "../../../utils/material/avatar";
import { StyledAvatar, StyledRating, StyledReviewCard, StyledReviewEditBox } from "./style";
import { UserContext } from "../../../providers/UserContext/UserContext";
import ReviewCardControls from "./ReviewCardControls";
import ReviewEditForm from "../../Form/ReviewEditForm";
import { StyledButton } from "../../../styles/buttons";
import { MdCancel } from "react-icons/md";

interface iReviewCardProps {
   review: iReview;
}

const ReviewCard = ({ review }: iReviewCardProps) => {
   const { user } = useContext(UserContext);
   const [isEditing, setIsEditing] = useState(false);
   return (
      <StyledReviewCard>
         {!isEditing ? (
            <>
               <header>
                  <div className="name">
                     <StyledAvatar {...stringAvatar(review.userName)} />
                     <StyledParagraph>
                        <strong>{review.userName}</strong>
                     </StyledParagraph>
                  </div>
                  <div className="score">
                     <span className="scoreText">{review.score}</span>
                     <StyledRating value={review.score} precision={0.5} readOnly />
                  </div>
               </header>
               <StyledParagraph>{review.content}</StyledParagraph>
               {user?.id === review.userId && <ReviewCardControls review={review} setIsEditing={setIsEditing} />}
            </>
         ) : (
            <StyledReviewEditBox>
               <StyledButton $buttonSize="round" $buttonStyle="outline1" className="close" aria-label="close" onClick={() => setIsEditing(false)}>
                  <MdCancel />
               </StyledButton>
               <ReviewEditForm review={review} setIsEditing={setIsEditing} />
            </StyledReviewEditBox>
         )}
      </StyledReviewCard>
   );
};

export default ReviewCard;
