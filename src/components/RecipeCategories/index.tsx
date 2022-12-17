import React, { useContext } from "react";
import { RecipeContext } from "../../providers/RecipeContext/RecipeContext";
import { StyledButton } from "../../styles/buttons";
import { StyledRecipeCategories } from "./style";

const RecipeCategories = () => {
   const { categoryList, recipeList, filter, setFilter } = useContext(RecipeContext);
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
