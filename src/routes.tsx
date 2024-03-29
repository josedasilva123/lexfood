import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RecipePage from "./pages/RecipePage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import RecipeCreatePage from "./pages/RecipePage/RecipeCreatePage";
import RecipeSinglePage from "./pages/RecipePage/RecipeSinglePage";
import { RecipePageProvider } from "./providers/RecipeContext/RecipePageContext/RecipePageContext";
import { RecipeSinglePageProvider } from "./providers/RecipeContext/RecipeSinglePageContext/RecipeSinglePageContext";

const RoutesComponent = () => {
   return (
      <Routes>
         <Route path="/" element={<LoginPage />} />
         <Route path="/register" element={<RegisterPage />} />
         <Route path="/recipes" element={<ProtectedRoutes />}>
            <Route
               index
               element={
                  <RecipePageProvider>
                     <RecipePage />
                  </RecipePageProvider>
               }
            />
            <Route
               path="/recipes/:recipeId"
               element={
                  <RecipeSinglePageProvider>
                     <RecipeSinglePage />
                  </RecipeSinglePageProvider>
               }
            />
            <Route path="/recipes/create" element={<RecipeCreatePage />} />
         </Route>
      </Routes>
   );
};

export default RoutesComponent;
