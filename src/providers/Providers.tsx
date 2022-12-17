import React from "react";
import { iContextProviderProps } from "./@types";
import { DarkModeProvider } from "./DarkModeContext/DarkModeContext";
import { FavoriteProvider } from "./FavoriteContext/FavoriteContext";
import { UserProvider } from "./UserContext/UserContext";

const Providers = ({ children }: iContextProviderProps) => {
   return (
      <UserProvider>
         <FavoriteProvider>
            <DarkModeProvider>{children}</DarkModeProvider>
         </FavoriteProvider>
      </UserProvider>
   );
};

export default Providers;
