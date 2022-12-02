import React, { useEffect, useState } from "react";
import RecipeCategories from "../../components/RecipeCategories";
import RecipeList from "../../components/RecipeList";
import Header from "../../components/Header";
import { api } from "../../api/api";
import SearchForm from "../../components/SearchForm";
import { StyledTitle } from "../../styles/typography";
import { StyledButton } from "../../styles/buttons";

const RecipePage = ({
   recipeList,
   categoryList,
   setFilter,
   setRecipeList,
   addRecipeToFavoriteList,
   search,
   setSearch,
   user,
   userLogout,
}) => {
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
               <Header user={user} userLogout={userLogout} />

               <div className="container">
                  {search && (
                     <>
                        <StyledTitle tag="h2" fontSize="one" fontWeight={700}>
                           Resultados de busca para: {search}
                        </StyledTitle>
                        <StyledButton buttonStyle="solid1" buttonSize="default" onClick={() => setSearch("")}>
                           Limpar busca
                        </StyledButton>
                     </>
                  )}
                  <SearchForm setSearch={setSearch} />
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
