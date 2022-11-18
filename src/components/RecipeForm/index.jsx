import React, { useState } from 'react'

const RecipeForm = ({categoryList, addRecipe}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: categoryList[0].value,
  });

  function submit(event){
    event.preventDefault();
    addRecipe(formData);
    setFormData({
      title: '',
      description: '',
      category: categoryList[0].value,
    })
  }

  return (
    <form onSubmit={submit}>
        <input type="text" value={formData.title} onChange={(event) => setFormData({ ...formData, title: event.target.value})} />
        <input type="text" value={formData.description} onChange={(event) => setFormData({ ...formData, description: event.target.value})}/>
        <select defaultValue={formData.category} onChange={(event) => setFormData({ ...formData, category: event.target.value})}>
          {categoryList.map(category => (
            <option key={category.value} value={category.value}>{category.label}</option>
          ))}
        </select>
        <button type="submit">Enviar</button>
    </form>  
  )
}

export default RecipeForm