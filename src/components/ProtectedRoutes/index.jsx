import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { RecipeProvider } from "../../providers/RecipeContext/RecipeContext";
import { UserContext } from "../../providers/UserContext/UserContext";

const ProtectedRoutes = () => {
   const navigate = useNavigate();

   const { user } = useContext(UserContext);

   useEffect(() => {
      if (!user) {
         navigate("/");
      }
   }, []);

   return (
      <>
         {user ? (
            <RecipeProvider>
               <Outlet />
            </RecipeProvider>
         ) : (
            <span>Carregando...</span>
         )}
      </>
   );
};

export default ProtectedRoutes;
