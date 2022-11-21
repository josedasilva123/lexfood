import React from 'react'
import RecipeCategories from '../../components/RecipeCategories'
import RecipeList from "../../components/RecipeList"
import RecipeForm from "../../components/RecipeForm"
import Header from '../../components/Header'

const RecipePage = ({ recipeList, categoryList, addRecipe, removeRecipe, setFilter, setLogin }) => {
  return (
    <div>      
      <Header setLogin={setLogin} />
      <div className='container'>
        <h1 className='title one'>As melhores receitas do momento.</h1>
        <RecipeForm categoryList={categoryList} addRecipe={addRecipe} />
        <RecipeCategories categoryList={categoryList} setFilter={setFilter} />
        <RecipeList recipeList={recipeList} removeRecipe={removeRecipe}/>   
      </div>
    </div>
  )
}

export default RecipePage