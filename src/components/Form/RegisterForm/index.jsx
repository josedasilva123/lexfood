import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { StyledButton } from "../../../styles/buttons";
import Input from "../Input";
import { registerSchema } from "./registerSchema";

const RegisterForm = ({ userRegister }) => {
   const [loading, setLoading] = useState(false);
   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
   } = useForm({
      mode: "onBlur",
      resolver: yupResolver(registerSchema),
   });

   const submit = async (data) => {
      await userRegister(data, setLoading);
      reset({
         name: "Batatinha",
         email: "",
         password: "",
      });
   };
   
   return (
      <form noValidate onSubmit={handleSubmit(submit)}>
         <Input type="text" id="name" label="Nome: " placeholder="Digite o seu nome" register={register("name")} disabled={loading} />
         {errors.name && <p>{errors.name.message}</p>}

         <Input
            type="email"
            id="email"
            label="E-mail: "
            placeholder="Digite o seu e-mail"
            register={register("email")}
            disabled={loading}
         />
         {errors.email && <p>{errors.email.message}</p>}

         <Input
            type="password"
            id="password"
            label="Senha: "
            placeholder="Crie a sua senha"
            register={register("password")}
            disabled={loading}
         />
         {errors.password && <p>{errors.password.message}</p>}

         <StyledButton type="submit" buttonStyle="solid1" buttonSize="big" disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar"}
         </StyledButton>
      </form>
   );
};

export default RegisterForm;
