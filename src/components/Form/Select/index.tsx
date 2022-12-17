import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { StyledFieldError } from "../../../styles/form";
import { StyledSelect } from "./style";

interface iSelectProps{
   children: React.ReactNode;
   id: string;
   label?: string;
   register: UseFormRegisterReturn;
   error?: FieldError;
}

const Select = ({ children, id, label, register, error }: iSelectProps) => {
   return (
      <fieldset>
         {label && <label htmlFor="category">Categoria:</label>}
         <StyledSelect id={id} {...register} error={error}>
            {children}
         </StyledSelect>
         {error && <StyledFieldError>{error.message}</StyledFieldError>}
      </fieldset>
   );
};

export default Select;
