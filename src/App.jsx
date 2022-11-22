import LoginPage from "./pages/LoginPage";
import RecipePage from "./pages/RecipePage";
import { useState } from "react";
import { categoryData, recipeData } from "./data/data";
import { StyledTitle } from "./styles/typography";

function App() {
   const [login, setLogin] = useState(false); 
   const [categoryList, setCategoryList] = useState(categoryData); 
   const [recipeList, setRecipeList] = useState(recipeData); 
   const [filter, setFilter] = useState("todos"); 
   const [count, setCount] = useState(recipeList.length);

   const filteredRecipeList = recipeList.filter((recipe) => (filter === "todos" ? true : recipe.category === filter));

   function addRecipe(recipeData) {
      const newRecipeData = { ...recipeData, id: count };
      setCount(count + 1);
      setRecipeList([...recipeList, newRecipeData]);
   }

   function removeRecipe(recipeId) {
      const newList = recipeList.filter((recipe) => recipe.id !== recipeId);
      setRecipeList(newList);
   }

   return (
      <div className="App">
         <StyledTitle tag="h3" fontSize="one">Testando meu styled</StyledTitle>
         {login ? (
            <RecipePage
               recipeList={filteredRecipeList}
               categoryList={categoryList}
               addRecipe={addRecipe}
               removeRecipe={removeRecipe}
               setFilter={setFilter}
               setLogin={setLogin}
            />
         ) : (
            <LoginPage setLogin={setLogin} />
         )}
      </div>
   );
}

export default App;
