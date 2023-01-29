import React, { SyntheticEvent, useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { iReview } from "../../../providers/RecipeContext/RecipeSinglePageContext/@types";
import { RecipeSinglePageContext } from "../../../providers/RecipeContext/RecipeSinglePageContext/RecipeSinglePageContext";
import { StyledButton } from "../../../styles/buttons";
import { StyledTitle, StyledParagraph } from "../../../styles/typography";
import { StyledReviewCreateForm } from "../ReviewCreateForm/styles";
import ScoreBox from "../ScoreBox";
import Select from "../Select";
import TextArea from "../Textarea";
import { iReviewEditFormValues } from "./@types";
import { reviewCreateEditSchema } from "./reviewEditFormSchema";
import { yupResolver } from "@hookform/resolvers/yup";

interface iReviewEditFormProps{
  review: iReview;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReviewEditForm = ({ review, setIsEditing }: iReviewEditFormProps) => {
   const { editReviewFromRecipe } = useContext(RecipeSinglePageContext);

   const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
      watch,
   } = useForm<iReviewEditFormValues>({
      resolver: yupResolver(reviewCreateEditSchema),
      defaultValues: {
        content: review.content,
        score: String(review.score),
      },
   });

   const submit: SubmitHandler<iReviewEditFormValues> = (formData) => {
      editReviewFromRecipe(formData, review._id);
      setIsEditing(false);
   };

   const currentScore = watch("score");

   const changeScore = (event: SyntheticEvent, newValue: string) => {
      if (newValue === null) {
         setValue("score", "");
      } else {
         setValue("score", String(newValue));
      }
   };

   return (
      <StyledReviewCreateForm onSubmit={handleSubmit(submit)}>
         <StyledTitle tag="h2" fontSize="four" fontWeight={600}>
            Edite sua avaliação:
         </StyledTitle>
    
         <TextArea label="Sua avaliação:" id="content" register={register("content")} error={errors.content} />

         <StyledParagraph>Selecione uma nota de 1 a 5:</StyledParagraph>

         <ScoreBox currentScore={currentScore} onChange={changeScore} />

         <Select id="score" register={register("score")} error={errors.score}>
            <option value="">Selecione uma nota</option>
            <option value="5">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option>
         </Select>

         <StyledButton type="submit" $buttonSize="default" $buttonStyle="solid1">
            Editar avaliação
         </StyledButton>
      </StyledReviewCreateForm>
   );
};

export default ReviewEditForm;
