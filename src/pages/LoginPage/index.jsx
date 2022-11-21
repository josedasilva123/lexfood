import React from "react";

const LoginPage = ({ setLogin }) => {
   return (
      <div className="container">
         <h1 className="title one">Bem vindo as receitinhas do Alex</h1>
         <button onClick={() => setLogin(true)}>Logar</button>
      </div>
   );
};

export default LoginPage;
