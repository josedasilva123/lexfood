import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RecipePage from "./pages/RecipePage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { RecipeProvider } from "./providers/RecipeContext";

const RoutesComponent = ({ darkMode, setDarkMode }) => {
   return (
      <Routes>
         <Route path="/" element={<LoginPage />} />
         <Route path="/register" element={<RegisterPage />} />
         <Route path="/recipes" element={<ProtectedRoutes />}>
            <Route
               index
               element={
                  <RecipeProvider>
                     <RecipePage darkMode={darkMode} setDarkMode={setDarkMode} />
                  </RecipeProvider>
               }
            />
         </Route>
      </Routes>
   );
};

export default RoutesComponent;
