import { yupResolver } from "@hookform/resolvers/yup";
import { SyntheticEvent, useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { RecipeSinglePageContext } from "../../../providers/RecipeContext/RecipeSinglePageContext/RecipeSinglePageContext";
import { StyledButton } from "../../../styles/buttons";
import { StyledParagraph, StyledTitle } from "../../../styles/typography";
import ScoreBox from "../ScoreBox";
import Select from "../Select";
import TextArea from "../Textarea";
import { iReviewFormValues } from "./@types";
import { reviewCreateFormSchema } from "./reviewCreateFormSchema";
import { StyledReviewCreateForm } from "./styles";

const ReviewCreateForm = () => {
   const { addReviewToRecipe } = useContext(RecipeSinglePageContext);
   const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
      watch,
   } = useForm<iReviewFormValues>({
      resolver: yupResolver(reviewCreateFormSchema),
   });

   const submit: SubmitHandler<iReviewFormValues> = (formData) => {
      addReviewToRecipe(formData);
   };

   const currentScore = watch("score");

   const changeScore = (event: SyntheticEvent, newValue: string) => {
      if(newValue === null){
         setValue('score', "");
      } else {
         setValue("score", String(newValue));
      }
   }

   return (
      <StyledReviewCreateForm onSubmit={handleSubmit(submit)}>
         <StyledTitle tag="h2" fontSize="four" fontWeight={600}>
            Avalie está receita:
         </StyledTitle>
         <StyledParagraph>Preencha os campos abaixo e deixe uma avaliação sobre essa receita:</StyledParagraph>
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
            Enviar avaliação
         </StyledButton>
      </StyledReviewCreateForm>
   );
};

export default ReviewCreateForm;
