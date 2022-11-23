import LoginPage from "./pages/LoginPage";
import RecipePage from "./pages/RecipePage";
import { useState } from "react";
import { categoryData, recipeData } from "./data/data";
import { StyledTitle } from "./styles/typography";
import { ThemeProvider } from "styled-components";
import { darkTheme, mainTheme } from "./styles/theme";

function App() {
   const [login, setLogin] = useState(false);
   const [categoryList, setCategoryList] = useState(categoryData);
   const [recipeList, setRecipeList] = useState(recipeData);
   const [filter, setFilter] = useState("todos");
   const [count, setCount] = useState(recipeList.length);
   const [darkMode, setDarkMode] = useState(false);

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
      <ThemeProvider theme={darkMode ? darkTheme : mainTheme}>
         <div className="App">
            <button onClick={() => setDarkMode(!darkMode)}>Alternar tema</button>
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
      </ThemeProvider>
   );
}

export default App;
