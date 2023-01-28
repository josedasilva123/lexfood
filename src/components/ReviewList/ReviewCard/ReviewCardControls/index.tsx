import React, { useContext, useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { iReview } from "../../../../providers/RecipeContext/RecipeSinglePageContext/@types";
import { RecipeSinglePageContext } from "../../../../providers/RecipeContext/RecipeSinglePageContext/RecipeSinglePageContext";
import { StyledButton } from "../../../../styles/buttons";
import ConfirmDialog from "../../../Dialog/ConfirmDialog";
import { StyledReviewCardControls } from "./style";

interface iReviewCardControlsProps{
   review: iReview;
}

const ReviewCardControls = ({ review }: iReviewCardControlsProps) => {
   const { removeReviewFromRecipe } = useContext(RecipeSinglePageContext);
   const [isDeleting, setIsDeleting] = useState(false);

   return (
      <>
         <StyledReviewCardControls>
            <StyledButton $buttonStyle="link">
               <MdEdit />
            </StyledButton>
            <StyledButton $buttonStyle="link" aria-label="delete" onClick={() => setIsDeleting(true)}>
               <MdDelete />
            </StyledButton>
         </StyledReviewCardControls>
         <ConfirmDialog
            isOpen={isDeleting}
            setIsOpen={setIsDeleting}
            title="Confirmação de exclusão de avaliação"
            content="Você deseja mesmo excluir está avaliação?"
            onConfirm={() => {
               removeReviewFromRecipe(review._id)
               setIsDeleting(false);
            }}
         />
      </>
   );
};

export default ReviewCardControls;
