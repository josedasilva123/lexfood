import React from 'react'
import styles from "./style.module.css";

const RecipeCard = ({recipe, removeRecipe}) => {
  return (
    <li className={styles.recipeCard}>
      <h3 className='title three'>
        {recipe.title}
      </h3>
      <p>
        {recipe.description}
      </p>
      <button className='btn default outline1' onClick={() => removeRecipe(recipe.title)}>Remover</button>
    </li>
  )
}

export default RecipeCard