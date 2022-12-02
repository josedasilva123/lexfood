import React, { useState } from "react";
import { Link } from "react-router-dom";
import { StyledButton } from "../../styles/buttons";
import styles from "./style.module.css";

const Header = ({ user, userLogout }) => {
   return (
      <header className={styles.header}>
         <div className="container">
            <div className={styles.flexGrid}>
               <span className={styles.logo}>LexFood</span>
               {user ? (
                  <div>
                     <span>Bem vindo, {user.name}</span>
                     <span>{user.email}</span>
                     <StyledButton buttonStyle="solid2" buttonSize="default" onClick={() => userLogout()}>
                        Sair
                     </StyledButton>
                  </div>
               ) : (
                  <Link to="/">Faça o login</Link>
               )}
            </div>
         </div>
      </header>
   );
};

export default Header;
