import { ThemeProvider } from "styled-components";
import { darkTheme, mainTheme } from "./styles/theme";
import "react-toastify/dist/ReactToastify.css";
import FavoriteList from "./components/FavoriteList";
import RoutesComponent from "./routes";
import { FavoriteContext } from "./providers/FavoriteContext/FavoriteContext";
import { UserContext } from "./providers/UserContext/UserContext";
import { DarkModeContext } from "./providers/DarkModeContext/DarkModeContext";
import { useContextSelector } from "use-context-selector";

function App() {
   const globalLoading = useContextSelector(UserContext, (context) => context.globalLoading);
   const favoriteModal = useContextSelector(FavoriteContext, (context) => context.favoriteModal);
   const darkMode = useContextSelector(DarkModeContext, (context) => context.darkMode);

   return (
      <>
         <ThemeProvider theme={darkMode ? darkTheme : mainTheme}>
            <div className="App">
               {globalLoading ? (
                  <h1>Carregando...</h1>
               ) : (
                  <>
                     {favoriteModal && <FavoriteList />}
                     <RoutesComponent />
                  </>
               )}
            </div>
         </ThemeProvider>
      </>
   );
}

export default App;
