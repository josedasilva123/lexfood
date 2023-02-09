/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-wait-for-side-effects */
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { ThemeProvider } from "styled-components";
import RegisterForm from "../../../components/Form/RegisterForm";
import { UserContext } from "../../../providers/UserContext/UserContext";
import { mockTheme } from "../../mocks/theme";

const userRegisterMock = jest.fn();

describe("<RegisterForm />", () => {
   it("should render correctly and be able to submit", async () => {
      render(
         <ThemeProvider theme={mockTheme}>
            <UserContext.Provider value={{ userRegister: userRegisterMock }}>
               <RegisterForm />
            </UserContext.Provider>
         </ThemeProvider>
      );

      const nameInput = screen.getByPlaceholderText("Digite o seu nome");
      const emailInput = screen.getByPlaceholderText("Digite o seu e-mail");
      const passwordInput = screen.getByPlaceholderText("Crie a sua senha");
      const confirmPassword = screen.getByPlaceholderText("Confirme sua senha");

      expect(nameInput).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(confirmPassword).toBeInTheDocument();

      await waitFor(() => {
         fireEvent.change(nameInput, { target: { value: "José da Silva" } });
         fireEvent.change(emailInput, { target: { value: "josedasilva@email.com" } });
         fireEvent.change(passwordInput, { target: { value: "@12Patinhos" } });
         fireEvent.change(confirmPassword, { target: { value: "@12Patinhos" } });
      });

      expect(nameInput).toHaveValue("José da Silva");
      expect(emailInput).toHaveValue("josedasilva@email.com");
      expect(passwordInput).toHaveValue("@12Patinhos");
      expect(confirmPassword).toHaveValue("@12Patinhos");

      const submitButton = screen.getByText("Cadastrar");

      await act(() => {
        fireEvent.submit(submitButton);
      });

      expect(userRegisterMock).toHaveBeenCalledTimes(1);
   });
});
