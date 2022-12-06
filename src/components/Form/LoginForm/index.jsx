import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { StyledButton } from "../../../styles/buttons";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../Input";
import { loginSchema } from "./loginSchema";
import { StyledFieldError, StyledForm } from "../../../styles/form";

const LoginForm = ({ userLogin }) => {
   const [loading, setLoading] = useState(false);

   const {
      register,
      handleSubmit,
      formState: { errors },
      getValues
   } = useForm({
      resolver: yupResolver(loginSchema),
   });

   const submit = (data) => {
      userLogin(data, setLoading);
   };

   return (
      <StyledForm onSubmit={handleSubmit(submit)}>
         
         <Input
            id="email"
            label="E-mail"
            type="text"
            placeholder="Seu e-mail"
            register={register("email")}           
            error={errors.email}
            disabled={loading}
 
         />

         <Input
            id="password"
            label="Senha"
            type="password"
            placeholder="Sua senha"
            register={register("password")}
            error={errors.password}
            disabled={loading}

         />

         <StyledButton type="submit" buttonStyle="solid1" buttonSize="big" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
         </StyledButton>
      </StyledForm>
   );
};

export default LoginForm;
