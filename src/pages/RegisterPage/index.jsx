import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver} from '@hookform/resolvers/yup'
import Input from '../../components/Form/Input'
import { registerSchema } from './registerSchema'
import { api } from "../../api/api"
import { toast } from 'react-toastify'

const RegisterPage = () => {
  const [loading, setLoading] = useState(false); 
  const { register, handleSubmit, formState: {errors}, reset } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(registerSchema)
  });  


  /* oneOf (yup.ref("password")) */
  const userRegister = async (formData) => {
    try {
      setLoading(true);  
      const response = await api.post('user', formData);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.error);  
    } finally {
      setLoading(false);  
    }
  }

  const submit = async (data) => {
    await userRegister(data);
    //Se estiver vazio, o reset vai resetar todos os campos
    reset({
        name: "Batatinha",
        email: "",
        password: "",
    });
  }

  return (
    <form noValidate onSubmit={handleSubmit(submit)}>
        <Input type="text" id="name" label="Nome: " placeholder="Digite o seu nome" register={register("name")} disabled={loading} />
        {errors.name && <p>{errors.name.message}</p>}

        <Input type="email" id="email" label="E-mail: " placeholder="Digite o seu e-mail" register={register("email")} disabled={loading} />
        {errors.email && <p>{errors.email.message}</p>}

        <Input type="password" id="password" label="Senha: " placeholder="Crie a sua senha" register={register("password")} disabled={loading} />
        {errors.password && <p>{errors.password.message}</p>}

        <button type="submit" disabled={loading}>
            {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
    </form>    
  )
}

export default RegisterPage