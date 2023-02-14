import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { StyledFieldError } from "../../../styles/form";
import { StyledInput } from "./style";

interface iInputProps {
   id: string;
   label?: string;
   type: string;
   register: UseFormRegisterReturn;
   placeholder?: string;
   error?: FieldError;
   disabled?: boolean;
}

const Input = ({ id, label, type, register, placeholder, error, disabled }: iInputProps) => {
   return (
      <fieldset>
         {label && <label htmlFor={id}>{label}</label>}
         <StyledInput error={error} id={id} type={type} placeholder={placeholder} disabled={disabled} {...register} />
         {error && <StyledFieldError>{error.message}</StyledFieldError>}
      </fieldset>
   );
};

export default Input;
