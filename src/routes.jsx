import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RecipePage from "./pages/RecipePage";
import ProtectedRoutes from "./components/ProtectedRoutes";

const RoutesComponent = ({
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
   userLogin,
   userLogout,
   userRegister,
   darkMode,
   setDarkMode,
   favoriteList,
   favoriteModal,
   setFavoriteModal   
}) => {
   return (
      <Routes>
         <Route path="/" element={<LoginPage userLogin={userLogin} />} />
         <Route path="/register" element={<RegisterPage userRegister={userRegister} />} />
         <Route path="/recipes" element={<ProtectedRoutes user={user} />}>
            <Route
               index
               element={
                  <RecipePage
                     recipeList={recipeList}
                     setRecipeList={setRecipeList}
                     filteredRecipeList={filteredRecipeList}
                     categoryList={categoryList}
                     setCategoryList={setCategoryList}
                     filter={filter}
                     setFilter={setFilter}                  
                     addRecipeToFavoriteList={addRecipeToFavoriteList}
                     search={search}
                     setSearch={setSearch}
                     user={user}
                     userLogout={userLogout}
                     darkMode={darkMode}
                     setDarkMode={setDarkMode}
                     favoriteList={favoriteList}
                     favoriteModal={favoriteModal}
                     setFavoriteModal={setFavoriteModal}                   
                  />
               }
            />
         </Route>
      </Routes>
   );
};

export default RoutesComponent;
