import React from "react";

const LoginPage = ({ setLogin }) => {
   return (
      <>
         <h1>Bem vindo as receitinhas do Alex</h1>
         <button onClick={() => setLogin(true)}>Logar</button>
      </>
   );
};

export default LoginPage;
