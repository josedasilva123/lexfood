import React from "react";
import { DarkModeProvider } from "./DarkModeContext";
import { FavoriteProvider } from "./FavoriteContext";
import { UserProvider } from "./UserContext";

const Providers = ({ children }) => {
   return (
      <UserProvider>
         <FavoriteProvider>
            <DarkModeProvider>{children}</DarkModeProvider>
         </FavoriteProvider>
      </UserProvider>
   );
};

export default Providers;
