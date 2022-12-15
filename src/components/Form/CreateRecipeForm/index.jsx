import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { api } from '../../../api/api';
import { RecipeContext } from '../../../providers/RecipeContext';
import { UserContext } from '../../../providers/UserContext';

const CreateRecipeForm = () => {
  const { user } = useContext(UserContext);
  const { recipeCreate } = useContext(RecipeContext);

  const { register, handleSubmit, formState: {errors} } = useForm();  

  const submit = (formData) => {    const newRecipe = {
        userID: user._id,
        file: formData.file[0],
        title: formData.title,
        content: formData.content,
        categories: JSON.stringify([formData.category])
    }

    const newRecipeFormData = new FormData();
    newRecipeFormData.append("userID", newRecipe.userID);
    newRecipeFormData.append("file", newRecipe.file);
    newRecipeFormData.append("title", newRecipe.title);
    newRecipeFormData.append("content", newRecipe.content);
    newRecipeFormData.append("categories", newRecipe.categories);

    recipeCreate(newRecipeFormData);
  } 

  return (
    <form onSubmit={handleSubmit(submit)}>
        <input type="text" {...register("title")} />
        <input type="text" {...register("content")} />
        <input type="file" {...register("file")} />
        <input type="text" {...register("category")} />
        <button type="submit">Enviar</button>
    </form>    
  )
}

export default CreateRecipeForm