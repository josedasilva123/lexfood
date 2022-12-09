import React from "react";
import { StyledFieldError } from "../../../styles/form";
import { StyledInput } from "./style";

const Input = ({ id, label, type, register, placeholder, error, disabled }) => {
   return (
      <fieldset>
         <label htmlFor={id}>{label}</label>
         <StyledInput error={error} id={id} type={type} placeholder={placeholder} disabled={disabled} {...register} />
         {error && <StyledFieldError>{error.message}</StyledFieldError>}
      </fieldset>
   );
};

export default Input;
