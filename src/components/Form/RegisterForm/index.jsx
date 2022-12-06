import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { StyledButton } from "../../../styles/buttons";
import { StyledForm } from "../../../styles/form";
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
         confirmPassword: "",
      });
   };

   return (
      <StyledForm onSubmit={handleSubmit(submit)}>
         <Input
            type="text"
            id="name"
            label="Nome: "
            placeholder="Digite o seu nome"
            register={register("name")}
            error={errors.name}
            disabled={loading}
         />

         <Input
            type="email"
            id="email"
            label="E-mail: "
            placeholder="Digite o seu e-mail"
            register={register("email")}
            error={errors.email}
            disabled={loading}
         />

         <Input
            type="password"
            id="password"
            label="Senha: "
            placeholder="Crie a sua senha"
            register={register("password")}
            error={errors.password}
            disabled={loading}
         />

         <Input
            type="password"
            id="password"
            label="Confirmação de senha: "
            placeholder="Confirme sua senha"
            register={register("confirmPassword")}
            error={errors.confirmPassword}
            disabled={loading}
         />

         <StyledButton type="submit" buttonStyle="solid1" buttonSize="big" disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar"}
         </StyledButton>
      </StyledForm>
   );
};

export default RegisterForm;
