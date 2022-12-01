import React from 'react'

const Input = ({ id, label, type, register, placeholder, disabled }) => {
  return (
    <fieldset>
        <label htmlFor={id}>{label}</label>
        <input id={id} type={type} placeholder={placeholder} disabled={disabled} {...register}  />
    </ fieldset>
    
  )
}

export default Input