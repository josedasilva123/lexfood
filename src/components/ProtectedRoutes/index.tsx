/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useContextSelector } from "use-context-selector";
import { RecipeProvider } from "../../providers/RecipeContext/RecipeContext";
import { UserContext } from "../../providers/UserContext/UserContext";

const ProtectedRoutes = () => {
   const navigate = useNavigate();

   const routeURL = window.location.pathname;

   const user = useContextSelector(UserContext, context => context.user);

   const setCachedRoute = useContextSelector(UserContext, context => context.setCachedRoute);

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
