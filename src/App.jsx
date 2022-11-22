import LoginPage from "./pages/LoginPage";
import RecipePage from "./pages/RecipePage";
import { useState } from "react";
import { categoryData, recipeData } from "./data/data";

function App() {
   const [login, setLogin] = useState(false); // estado boleano responsável pelo login (gatilho da renderização condicional)
   const [categoryList, setCategoryList] = useState(categoryData); // estado responsável pela lista de categorias
   const [recipeList, setRecipeList] = useState(recipeData); // estado responsável pela lista de receitas
   const [filter, setFilter] = useState("todos"); // estado responsável por indicar qual filtro está selcionado
   const [count, setCount] = useState(recipeList.length);
   // Variável: string, number, array, object
   /* [getter, setter] = useState(initialValue) */


   const filteredRecipeList = recipeList.filter((recipe) => (filter === "todos" ? true : recipe.category === filter));
   // caso filtro for = todos retorna todos os resultados, do contrário somente os resultados que tiverem categoria correspondente ao filtro

   function addRecipe(recipeData) {
      //spread espalha todos os itens atuais, e em seguida, no final da nova lista é adicionado a nova receita
      const newRecipeData = { ...recipeData, id: count };
      setCount(count + 1);
      setRecipeList([...recipeList, newRecipeData]);
   }

   function removeRecipe(recipeId) {
      //filtro retorna todas as receitas com exceção da que tem o mesmo nome recipeName
      //remover único
      const newList = recipeList.filter((recipe) => recipe.id !== recipeId);
      setRecipeList(newList);
   }

   return (
      <div className="App">
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
