import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { StyledButton } from '../../../styles/buttons'
import { yupResolver } from '@hookform/resolvers/yup'
import Input from '../Input'
import { loginSchema } from './loginSchema'

const LoginForm = ({userLogin}) => {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(loginSchema)
  });

  const submit = (data) => {
    userLogin(data, setLoading);
  } 

  return (
    <form onSubmit={handleSubmit(submit)}>
        <Input id="email" label="E-mail" type="text" placeholder="Seu e-mail" register={register("email")} disabled={loading} />
        {errors.email && <p>{errors.email.message}</p>}

        <Input id="password" label="Senha" type="password" placeholder="Sua senha" register={register("password")} disabled={loading} />
        {errors.password && <p>{errors.password.message}</p>}
        
        <StyledButton type="submit" buttonStyle="solid1" buttonSize="big" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
        </StyledButton>
    </form>    
  )
}

export default LoginForm