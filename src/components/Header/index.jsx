import React, { useState } from "react";
import styles from "./style.module.css";

const Header = ({ setLogin }) => {
   return (
      <header className={styles.header}>
         <div className="container">
            <div className={styles.flexGrid}>
               <span className={styles.logo}>LexFood</span>
               <button className="btn solid1 outline" onClick={() => setLogin(false)}>Sair</button>
            </div>
         </div>
      </header>
   );
};

export default Header;
