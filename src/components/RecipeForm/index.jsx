import React, { useState } from "react";
import Input from "../Input";

const RecipeForm = ({ categoryList, addRecipe }) => {
   const [formData, setFormData] = useState({
      title: "",
      description: "",
      category: categoryList[0].value,
   });

   function submit(event) {
      event.preventDefault();
      if (!formData.title || !formData.description) {
         alert("Preencha os campos");
      } else {
         addRecipe(formData);
         setFormData({
            title: "",
            description: "",
            category: categoryList[0].value,
         });
      }
   }

   return (
      <form onSubmit={submit}>
         <Input
            id="title"
            label="Título"
            type="text"
            value={formData.title}
            onChange={(event) => setFormData({ ...formData, title: event.target.value })}
         />
         <Input
            id="description"
            label="Descrição"
            type="text"
            value={formData.description}
            onChange={(event) => setFormData({ ...formData, description: event.target.value })}
         />
         <select value={formData.category} onChange={(event) => setFormData({ ...formData, category: event.target.value })}>
            {categoryList.map((category) => (
               <option key={category.value} value={category.value}>
                  {category.label}
               </option>
            ))}
         </select>
         <button type="submit">Enviar</button>
      </form>
   );
};

export default RecipeForm;
