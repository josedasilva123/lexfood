import React from 'react'

const Input = ({ id, label, type, value, onChange }) => {
  return (
    <fieldset>
        <label htmlFor={id}>{label}</label>
        <input id={id} type={type} value={value} onChange={onChange} />
    </ fieldset>
    
  )
}

export default Input