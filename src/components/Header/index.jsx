import React from "react";
import { Link } from "react-router-dom";
import { StyledButton } from "../../styles/buttons";
import { StyledContainer } from "../../styles/grid";
import { StyledHeader, StyledHeaderFlexBox } from "./style";
import { MdFavorite, MdDarkMode, MdLightMode } from "react-icons/md"

const Header = ({ user, userLogout, darkMode, setDarkMode, favoriteList, favoriteModal, setFavoriteModal }) => {
   return (
      <StyledHeader>
         <StyledContainer>
            <StyledHeaderFlexBox>
               <span className="logo">
                  Lex<strong>Food</strong>
               </span>
               {user ? (
                  <div className="controls">
                     <div>
                        <span>Bem vindo, {user.name}</span>
                        <span>{user.email}</span>
                     </div>
                     <StyledButton buttonStyle="solid2" buttonSize="default" onClick={() => userLogout()}>
                        Sair
                     </StyledButton>
                     <button class="favorite" onClick={() => setFavoriteModal(!favoriteModal)}>
                        <MdFavorite size={21} />
                        <span>({favoriteList.length})</span>
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
