import { useState } from "react";
import { createContext } from "react";
import { iContextProviderProps } from "../@types";
import { iDarkModeContext } from "./@types";

export const DarkModeContext = createContext({} as iDarkModeContext);

export const DarkModeProvider = ({ children }: iContextProviderProps) => {
   const [darkMode, setDarkMode] = useState(false);

   return (
      <DarkModeContext.Provider
         value={{
            darkMode,
            setDarkMode,
         }}
      >
         {children}
      </DarkModeContext.Provider>
   );
};
