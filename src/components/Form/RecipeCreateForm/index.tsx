import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { RecipeContext } from "../../../providers/RecipeContext/RecipeContext";
import { UserContext } from "../../../providers/UserContext/UserContext";
import { StyledButton } from "../../../styles/buttons";
import { StyledFieldError, StyledForm } from "../../../styles/form";
import Input from "../Input";
import Select from "../Select";
import TextArea from "../Textarea";
import { iRecipeCreateFormValues } from "./@types";
import { recipeCreateSchema } from "./recipeCreateSchema";
import { StyledRecipeCreateFormBox } from "./style";

const RecipeCreateForm = () => {
   const { user } = useContext(UserContext);
   const { categoryList, recipeCreate } = useContext(RecipeContext);

   const {
      register,
      handleSubmit,
      formState: { errors },
      watch,
   } = useForm<iRecipeCreateFormValues>({
      resolver: yupResolver(recipeCreateSchema),
   });

   const watchFile = watch("file");

   const submit: SubmitHandler<iRecipeCreateFormValues> = (formData) => {
      const newRecipe = {
         userId: user?.id,
         file: formData.file[0],
         title: formData.title,
         content: formData.content,
         categories: JSON.stringify([formData.category]),
      };

      const newRecipeFormData = new FormData();
      newRecipeFormData.append("userId", newRecipe.userId as string);
      newRecipeFormData.append("file", newRecipe.file);
      newRecipeFormData.append("title", newRecipe.title);
      newRecipeFormData.append("content", newRecipe.content);
      newRecipeFormData.append("categories", newRecipe.categories);

      recipeCreate(newRecipeFormData);
   };

   return (
      <StyledRecipeCreateFormBox>
         <StyledForm onSubmit={handleSubmit(submit)}>
            <Input
               id="title"
               label="Título:"
               type="text"
               placeholder="Digite um título"
               register={register("title")}
               error={errors.title}
            />
            <TextArea
               id="content"
               label="Conteúdo:"
               placeholder="Digite um conteúdo"
               register={register("content")}
               error={errors.content}
            />
            {watchFile?.[0] ? (
               <label htmlFor="file">Imagem selecionada</label>
            ) : (
               <label htmlFor="file" className="fileLabel">Clique aqui e selecione uma imagem</label>
            )}            

            {watchFile?.[0] && <img src={URL.createObjectURL(watchFile[0])} alt={watchFile[0].name} className="fileImage" />}
            <input id="file" type="file" {...register("file")} accept="image/png, image/jpeg" />
            {errors.file && <StyledFieldError>{errors.file.message}</StyledFieldError>}

            <Select id="category" label="category" register={register("category")} error={errors.category}>
               <option value="">Escolha uma categoria</option>
               {categoryList?.map((category) => (
                  <option key={category.slug} value={category.slug}>
                     {category.name}
                  </option>
               ))}
            </Select>

            <StyledButton type="submit" $buttonStyle="solid1" $buttonSize="big">
               Enviar
            </StyledButton>
         </StyledForm>
      </StyledRecipeCreateFormBox>
   );
};

export default RecipeCreateForm;
