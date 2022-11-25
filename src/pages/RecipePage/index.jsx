import React, { useEffect, useState } from "react";
import RecipeCategories from "../../components/RecipeCategories";
import RecipeList from "../../components/RecipeList";
import Header from "../../components/Header";
import { api } from "../../api/api";

const RecipePage = ({ recipeList, categoryList, setFilter, setLogin, setRecipeList, addRecipeToFavoriteList }) => {
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      (async () => {
         try {
            setLoading(true);
            const response = await api.get("recipe");
            setRecipeList(response.data.recipes);
         } catch (error) {
            console.log(error);
         } finally {
            setLoading(false);
         }
      })();
   }, []);

   return (
      <div>
         {loading ? (
            <h1>Carregando...</h1>
         ) : (
            <>
               <Header setLogin={setLogin} />
               <div className="container">
                  <h1 className="title one">As melhores receitas do momento.</h1>

                  <RecipeCategories categoryList={categoryList} setFilter={setFilter} />
                  <RecipeList recipeList={recipeList} addRecipeToFavoriteList={addRecipeToFavoriteList} />
               </div>
            </>
         )}
      </div>
   );
};

export default RecipePage;
