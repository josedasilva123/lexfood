/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { RecipeProvider } from "../../providers/RecipeContext/RecipeContext";
import { UserContext } from "../../providers/UserContext/UserContext";

const ProtectedRoutes = () => {
   const navigate = useNavigate();

   const pathname = window.location.pathname;
  

   const { user,setCurrentRoute } = useContext(UserContext);

   useEffect(() => {
      if (!user) {
         setCurrentRoute(pathname);
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
