import { Link } from "react-router-dom";
import { StyledButton } from "../../styles/buttons";
import { StyledContainer } from "../../styles/grid";
import { StyledHeader, StyledHeaderFlexBox } from "./style";
import { MdFavorite, MdDarkMode, MdLightMode } from "react-icons/md";
import { useContext } from "react";
import { UserContext } from "../../providers/UserContext/UserContext";
import { FavoriteContext } from "../../providers/FavoriteContext/FavoriteContext";
import { DarkModeContext } from "../../providers/DarkModeContext/DarkModeContext";
import { useContextSelector } from "use-context-selector";

const Header = () => {
   const user = useContextSelector(UserContext, context => context.user);
   const userLogout = useContextSelector(UserContext, context => context.userLogout);
   const { favoriteModal, setFavoriteModal, favoriteRecipes } = useContext(FavoriteContext);
   const { darkMode, setDarkMode } = useContext(DarkModeContext);

   return (
      <StyledHeader>
         <StyledContainer>
            <StyledHeaderFlexBox>
               <Link to="/recipes">
                  <span className="logo">
                     Lex<strong>Food</strong>
                  </span>
               </Link>
               {user ? (
                  <div className="controls">
                     <div>
                        <span>Bem vindo, {user.name}</span>
                        <span>{user.email}</span>
                     </div>
                     <StyledButton $buttonStyle="solid2" $buttonSize="default" onClick={() => userLogout()}>
                        Sair
                     </StyledButton>
                     <button className="favorite" onClick={() => setFavoriteModal(!favoriteModal)}>
                        <MdFavorite size={21} />
                        <span>({favoriteRecipes?.length})</span>
                     </button>
                     <button className="darkMode" onClick={() => setDarkMode(!darkMode)}>
                        {darkMode ? <MdLightMode size={21} /> : <MdDarkMode size={21} />}
                     </button>
                  </div>
               ) : (
                  <Link to="/">Faça o login</Link>
               )}
            </StyledHeaderFlexBox>
         </StyledContainer>
      </StyledHeader>
   );
};

export default Header;
