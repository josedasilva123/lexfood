import React from "react";
import { StyledFieldError } from "../../../styles/form";
import { StyledSelect } from "./style";

const Select = ({ children, id, label, register, error }) => {
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
