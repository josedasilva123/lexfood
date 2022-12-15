import { ThemeProvider } from "styled-components";
import { darkTheme, mainTheme } from "./styles/theme";
import "react-toastify/dist/ReactToastify.css";
import FavoriteList from "./components/FavoriteList";
import RoutesComponent from "./routes";
import { useContext } from "react";
import { FavoriteContext } from "./providers/FavoriteContext";
import { UserContext } from "./providers/UserContext";
import { DarkModeContext } from "./providers/DarkModeContext";

function App() {
   const { globalLoading } = useContext(UserContext);
   const { favoriteModal } = useContext(FavoriteContext);  
   const { darkMode } = useContext(DarkModeContext);   
   
   return (
      <ThemeProvider theme={darkMode ? darkTheme : mainTheme}>
         <div className="App">
            {globalLoading ? (
               <h1>Carregando...</h1>
            ) : (
               <>
                  {favoriteModal && <FavoriteList />}
                  <RoutesComponent
                  />
               </>
            )}
         </div>
      </ThemeProvider>
   );
}

export default App;