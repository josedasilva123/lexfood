import React from "react";
import { StyledButton } from "../../styles/buttons";
import { StyledRecipeCategories } from "./style";

const RecipeCategories = ({ recipeList, categoryList, filter, setFilter }) => {
   const filteredCategoryList = categoryList.filter((category) => recipeList.some((recipe) => recipe.categories.includes(category.slug)));

   return (
      <StyledRecipeCategories>
         <li>
            <StyledButton onClick={() => setFilter("todos")} buttonSize="small" buttonStyle={filter === "todos" ? "solid1" : "outline1"}>
               Todas
            </StyledButton>
         </li>
         {filteredCategoryList.map((category) => {
            return (
               <li key={category.slug}>
                  <StyledButton
                     onClick={() => setFilter(category.slug)}
                     buttonSize="small"
                     buttonStyle={filter === category.slug ? "solid1" : "outline1"}
                  >
                     {category.name}
                  </StyledButton>
               </li>
            );
         })}
      </StyledRecipeCategories>
   );
};

export default RecipeCategories;
