import React from 'react'
import RecipeCategories from '../../components/RecipeCategories'
import RecipeList from "../../components/RecipeList"
import RecipeForm from "../../components/RecipeForm"

const RecipePage = ({ recipeList, categoryList, addRecipe, removeRecipe, setFilter, setLogin }) => {
  return (
    <div>
      <button onClick={() => setLogin(false)}>Sair</button>
      <h1>As melhores receitas do momento.</h1>
      <RecipeForm categoryList={categoryList} addRecipe={addRecipe} />
      <RecipeCategories categoryList={categoryList} setFilter={setFilter} />
      <RecipeList recipeList={recipeList} removeRecipe={removeRecipe}/>
      
    </div>
  )
}

export default RecipePage