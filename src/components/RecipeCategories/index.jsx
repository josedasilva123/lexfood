import React from 'react'

const RecipeCategories = ({categoryList, setFilter}) => {
  return (
    <ul>
        <li onClick={() => setFilter("todos")}>Todas</li>
        {categoryList.map(category => (
            <li key={category.value} onClick={() => setFilter(category.value)}>{category.label}</li>
        ))}
    </ul>
  )
}

export default RecipeCategories