import React from 'react'
import RecipeCard from "./RecipeCard"
import styles from "./style.module.css";

const RecipeList = ({recipeList, removeRecipe}) => {  
  return (
    <ul className={styles.title}>
      {recipeList.map((recipe, index) => (
        <RecipeCard key={index} recipe={recipe} removeRecipe={removeRecipe} />
      ))}
    </ul>  
  )
}

export default RecipeList