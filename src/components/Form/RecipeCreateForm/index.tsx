import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { RecipeContext } from "../../../providers/RecipeContext/RecipeContext";
import { UserContext } from "../../../providers/UserContext/UserContext";
import { StyledButton } from "../../../styles/buttons";
import { StyledForm } from "../../../styles/form";
import Input from "../Input";
import Select from "../Select";
import { iRecipeCreateFormValues } from "./@types";
import { recipeCreateSchema } from "./recipeCreateSchema";

const RecipeCreateForm = () => {
   const { user } = useContext(UserContext);
   const { categoryList, recipeCreate } = useContext(RecipeContext);

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<iRecipeCreateFormValues>({
      resolver: yupResolver(recipeCreateSchema)
   });

   const submit: SubmitHandler<iRecipeCreateFormValues> = (formData) => {
      const newRecipe = {
         userID: user?.id,
         file: formData.file[0],
         title: formData.title,
         content: formData.content,
         categories: JSON.stringify([formData.category]),
      };

      const newRecipeFormData = new FormData();
      newRecipeFormData.append("file", newRecipe.file);
      newRecipeFormData.append("title", newRecipe.title);
      newRecipeFormData.append("content", newRecipe.content);
      newRecipeFormData.append("categories", newRecipe.categories);

      recipeCreate(newRecipeFormData);
   };

   return (
      <>
         <StyledForm onSubmit={handleSubmit(submit)}>
            <Input
               id="title"
               label="Título:"
               type="text"
               placeholder="Digite um título"
               register={register("title")}
               error={errors.title}
            />
            <Input
               id="content"
               label="Conteúdo:"
               type="text"
               placeholder="Digite um conteúdo"
               register={register("content")}
               error={errors.content}
            />

            <label htmlFor="file">Selecione uma imagem de destaque:</label>
            <input id="file" type="file" {...register("file")} />

            <Select id="category" label="category" register={register("category")} error={errors.category}>
               <option value="">Escolha uma categoria</option>
               {categoryList?.map((category) => (
                  <option value={category.slug}>{category.name}</option>
               ))}
            </Select>

            <StyledButton type="submit" buttonStyle="solid1" buttonSize="big">
               Enviar
            </StyledButton>
         </StyledForm>
      </>
   );
};

export default RecipeCreateForm;
