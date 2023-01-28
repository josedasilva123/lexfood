import React, { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { RecipeSinglePageContext } from "../../../providers/RecipeContext/RecipeSinglePageContext/RecipeSinglePageContext";
import { StyledButton } from "../../../styles/buttons";
import { StyledForm } from "../../../styles/form";
import { StyledParagraph, StyledTitle } from "../../../styles/typography";
import Select from "../Select";
import TextArea from "../Textarea";
import { iReviewFormValues } from "./@types";

const ReviewCreateForm = () => {
   const { addReviewToRecipe } = useContext(RecipeSinglePageContext) 
   const { register, handleSubmit, formState: {errors}} = useForm<iReviewFormValues>(); 

   const submit: SubmitHandler<iReviewFormValues> = (formData) => {
    addReviewToRecipe(formData);
   }
   return (
      <StyledForm onSubmit={handleSubmit(submit)}>
         <StyledTitle tag="h2" fontSize="four" fontWeight={600}>Avalie está receita:</StyledTitle>
         <StyledParagraph>
            Preencha os campos abaixo e deixe uma avaliação sobre essa receita:
         </StyledParagraph>
         <TextArea label="Sua avaliação:" id="content" register={register("content")} error={errors.content} />
         <Select label="Sua nota:" id="score" register={register("score")} error={errors.score}>
            <option value="5">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option>
         </Select>   
         <StyledButton type="submit"$buttonSize="default" $buttonStyle="solid1">Enviar avaliação</StyledButton>
      </StyledForm>
   );
};

export default ReviewCreateForm;
