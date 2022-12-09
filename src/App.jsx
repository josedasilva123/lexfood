import { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme, mainTheme } from "./styles/theme";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FavoriteList from "./components/FavoriteList";
import RoutesComponent from "./routes";
import { api } from "./api/api";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FavoriteContext } from "./providers/FavoriteContext";
import { UserContext } from "./providers/UserContext";

function App() {
   const { globalLoading } = useContext(UserContext);
   const { favoriteModal } = useContext(FavoriteContext);  

   const [darkMode, setDarkMode] = useState(false);
   
   return (
      <ThemeProvider theme={darkMode ? darkTheme : mainTheme}>
         <div className="App">
            {globalLoading ? (
               <h1>Carregando...</h1>
            ) : (
               <>
                  {favoriteModal && <FavoriteList />}
                  <RoutesComponent
                     darkMode={darkMode}
                     setDarkMode={setDarkMode}
                  />
               </>
            )}
         </div>
      </ThemeProvider>
   );
}

export default App;