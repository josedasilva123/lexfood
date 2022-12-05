import React, { useEffect, useState } from "react";
import RecipeCategories from "../../components/RecipeCategories";
import RecipeList from "../../components/RecipeList";
import Header from "../../components/Header";
import { api } from "../../api/api";
import SearchForm from "../../components/SearchForm";
import { StyledTitle } from "../../styles/typography";
import { StyledButton } from "../../styles/buttons";
import { StyledContainer } from "../../styles/grid";
import { StyledRecipePage } from "./style";

const RecipePage = ({
   recipeList,
   setRecipeList,
   filteredRecipeList,
   categoryList,
   setCategoryList,
   filter,
   setFilter,
   addRecipeToFavoriteList,
   search,
   setSearch,
   user,
   userLogout,
   darkMode,
   setDarkMode,
   favoriteList,
   favoriteModal,
   setFavoriteModal, 
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

   useEffect(() => {
      (async () => {
         try {
            const response = await api.get("category");
            setCategoryList(response.data.categories)
         } catch (error) {
            console.log(error);
         }
      })();
   })

   return (
      <StyledRecipePage>
         {loading ? (
            <h1>Carregando...</h1>
         ) : (
            <>
               <Header
                  user={user}
                  userLogout={userLogout}
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                  favoriteList={favoriteList}
                  favoriteModal={favoriteModal}
                  setFavoriteModal={setFavoriteModal}
               />

               <StyledContainer>
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
                  <StyledTitle tag="h1" fontSize="one" fontWeight={700}>
                     As melhores receitas do momento.
                  </StyledTitle>
                  <RecipeCategories recipeList={recipeList} categoryList={categoryList} filter={filter} setFilter={setFilter}  />
                  <RecipeList filteredRecipeList={filteredRecipeList} addRecipeToFavoriteList={addRecipeToFavoriteList} />
               </StyledContainer>
            </>
         )}
      </StyledRecipePage>
   );
};

export default RecipePage;
