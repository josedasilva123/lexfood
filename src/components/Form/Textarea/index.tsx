import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { StyledFieldError } from "../../../styles/form";
import { StyledTextarea } from "./style";


interface iInputProps {
   id: string;
   label?: string;
   register: UseFormRegisterReturn;
   placeholder?: string;
   error?: FieldError;
   disabled?: boolean;
}

const TextArea = ({ id, label, register, placeholder, error, disabled }: iInputProps) => {
   return (
      <fieldset>
         {label && <label htmlFor={id}>{label}</label>}
         <StyledTextarea error={error} id={id} placeholder={placeholder} disabled={disabled} {...register} />
         {error && <StyledFieldError>{error.message}</StyledFieldError>}
      </fieldset>
   );
};

export default TextArea;
