import React from "react";
import { iContextProviderProps } from "./@types";
import { DarkModeProvider } from "./DarkModeContext/DarkModeContext";
import { FavoriteProvider } from "./FavoriteContext/FavoriteContext";
import { UserProvider } from "./UserContext/UserContext";

const Providers = ({ children }: iContextProviderProps) => {
   return (
      <DarkModeProvider>
         <UserProvider>
            <FavoriteProvider>{children}</FavoriteProvider>
         </UserProvider>
      </DarkModeProvider>
   );
};

export default Providers;
