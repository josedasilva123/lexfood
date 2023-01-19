/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { RecipeProvider } from "../../providers/RecipeContext/RecipeContext";
import { UserContext } from "../../providers/UserContext/UserContext";

const ProtectedRoutes = () => {
   const navigate = useNavigate();

   const routeURL = window.location.pathname;

   const { setCachedRoute } = useContext(UserContext);

   const { user } = useContext(UserContext);

   useEffect(() => {
      setCachedRoute(routeURL);
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
