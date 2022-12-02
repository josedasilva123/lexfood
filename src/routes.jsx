import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RecipePage from "./pages/RecipePage";
import ProtectedRoutes from "./components/ProtectedRoutes";

const RoutesComponent = ({
   recipeList,
   categoryList,
   setFilter,
   setRecipeList,
   addRecipeToFavoriteList,
   search,
   setSearch,
   user,
   userLogin,
   userLogout,
}) => {
   return (
      <Routes>
         <Route path="/" element={<LoginPage userLogin={userLogin} />} />
         <Route path="/register" element={<RegisterPage />} />
         <Route path="/recipes" element={<ProtectedRoutes user={user} />}>
            <Route
               index
               element={
                  <RecipePage
                     recipeList={recipeList}
                     categoryList={categoryList}
                     setFilter={setFilter}
                     setRecipeList={setRecipeList}
                     addRecipeToFavoriteList={addRecipeToFavoriteList}
                     search={search}
                     setSearch={setSearch}
                     user={user}
                     userLogout={userLogout}
                  />
               }
            />
         </Route>
      </Routes>
   );
};

export default RoutesComponent;
