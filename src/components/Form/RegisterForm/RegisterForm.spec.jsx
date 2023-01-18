/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-wait-for-side-effects */
import { fireEvent, render, screen, waitFor, act, getByText } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import RegisterForm from ".";
import { UserContext } from "../../../providers/UserContext/UserContext";
import { mainTheme } from "../../../styles/theme";

const userRegisterMock = jest.fn();

describe("<RegisterForm/>", () => {
   it("should be able to fill the form and call the register function", async () => {
      render(
         <BrowserRouter>
            <ThemeProvider theme={mainTheme}>
               <UserContext.Provider value={{ userRegister: userRegisterMock }}>
                  <RegisterForm />
               </UserContext.Provider>
            </ThemeProvider>
         </BrowserRouter>
      );

      const nameInput = screen.getByPlaceholderText("Digite o seu nome");
      const emailInput = screen.getByPlaceholderText("Digite o seu e-mail");
      const passwordInput = screen.getByPlaceholderText("Crie a sua senha");
      const confirmPasswordInput = screen.getByPlaceholderText("Confirme sua senha");
      const form = screen.getByRole("form");

      await waitFor(() => {
         fireEvent.change(nameInput, { target: { value: "John Doe" } });
         fireEvent.change(emailInput, { target: { value: "johndoe@email.com" } });
         fireEvent.change(passwordInput, { target: { value: "12345678" } });
         fireEvent.change(confirmPasswordInput, { target: { value: "12345678" } });
      });

      expect(nameInput).toHaveValue("John Doe");
      expect(emailInput).toHaveValue("johndoe@email.com");
      expect(passwordInput).toHaveValue("12345678");
      expect(confirmPasswordInput).toHaveValue("12345678");

      await act(() => {
         fireEvent.submit(form);
      });


      expect(userRegisterMock).toHaveBeenCalled();
   });

   it("should show errors and fields are empty", async () => {
      render(
         <BrowserRouter>
            <ThemeProvider theme={mainTheme}>
               <UserContext.Provider value={{ userRegister: userRegisterMock }}>
                  <RegisterForm />
               </UserContext.Provider>
            </ThemeProvider>
         </BrowserRouter>
      );
      const form = screen.getByRole("form");

      await act(() => {
         fireEvent.submit(form);
      });

      const nameError = screen.getByText("O nome é obrigatório.");
      const emailError = screen.getByText("O e-mail é obrigatório.");
      const passwordError = screen.getByText("A senha é obrigatória.");
      const confirmPasswordError = screen.getByText("A confirmação de senha é obrigatória.");

      expect(nameError).toBeInTheDocument();
      expect(emailError).toBeInTheDocument();
      expect(passwordError).toBeInTheDocument();
      expect(confirmPasswordError).toBeInTheDocument();
   });

   it("should show error when email is invalid", async () => {
      render(
         <BrowserRouter>
            <ThemeProvider theme={mainTheme}>
               <UserContext.Provider value={{ userRegister: userRegisterMock }}>
                  <RegisterForm />
               </UserContext.Provider>
            </ThemeProvider>
         </BrowserRouter>
      );

      const nameInput = screen.getByPlaceholderText("Digite o seu nome");
      const emailInput = screen.getByPlaceholderText("Digite o seu e-mail");
      const passwordInput = screen.getByPlaceholderText("Crie a sua senha");
      const confirmPasswordInput = screen.getByPlaceholderText("Confirme sua senha");
      const form = screen.getByRole("form");

      await waitFor(() => {
         fireEvent.change(nameInput, { target: { value: "John Doe" } });
         fireEvent.change(emailInput, { target: { value: "johndoe" } });
         fireEvent.change(passwordInput, { target: { value: "12345678" } });
         fireEvent.change(confirmPasswordInput, { target: { value: "12345678" } });
      });

      expect(nameInput).toHaveValue("John Doe");
      expect(emailInput).toHaveValue("johndoe");
      expect(passwordInput).toHaveValue("12345678");
      expect(confirmPasswordInput).toHaveValue("12345678");

      await act(() => {
         fireEvent.submit(form);
      });

      const emailError = screen.getByText("O e-mail digitado é inválido.");

      expect(emailError).toBeInTheDocument();
   });

   it("should show error when password has less than the min length", async () => {
      render(
         <BrowserRouter>
            <ThemeProvider theme={mainTheme}>
               <UserContext.Provider value={{ userRegister: userRegisterMock }}>
                  <RegisterForm />
               </UserContext.Provider>
            </ThemeProvider>
         </BrowserRouter>
      );

      const nameInput = screen.getByPlaceholderText("Digite o seu nome");
      const emailInput = screen.getByPlaceholderText("Digite o seu e-mail");
      const passwordInput = screen.getByPlaceholderText("Crie a sua senha");
      const confirmPasswordInput = screen.getByPlaceholderText("Confirme sua senha");
      const form = screen.getByRole("form");

      await waitFor(() => {
         fireEvent.change(nameInput, { target: { value: "John Doe" } });
         fireEvent.change(emailInput, { target: { value: "johndoe" } });
         fireEvent.change(passwordInput, { target: { value: "123456" } });
         fireEvent.change(confirmPasswordInput, { target: { value: "123456" } });
      });

      expect(nameInput).toHaveValue("John Doe");
      expect(emailInput).toHaveValue("johndoe");
      expect(passwordInput).toHaveValue("123456");
      expect(confirmPasswordInput).toHaveValue("123456");

      await act(() => {
         fireEvent.submit(form);
      });

      const passwordError = screen.getByText("A senha precisa conter pelo menos 8 caracteres.");

      expect(passwordError).toBeInTheDocument();
   });

   it("should show error when confirmPassword doesn't match with password", async () => {
      render(
         <BrowserRouter>
            <ThemeProvider theme={mainTheme}>
               <UserContext.Provider value={{ userRegister: userRegisterMock }}>
                  <RegisterForm />
               </UserContext.Provider>
            </ThemeProvider>
         </BrowserRouter>
      );

      const nameInput = screen.getByPlaceholderText("Digite o seu nome");
      const emailInput = screen.getByPlaceholderText("Digite o seu e-mail");
      const passwordInput = screen.getByPlaceholderText("Crie a sua senha");
      const confirmPasswordInput = screen.getByPlaceholderText("Confirme sua senha");
      const form = screen.getByRole("form");

      await waitFor(() => {
         fireEvent.change(nameInput, { target: { value: "John Doe" } });
         fireEvent.change(emailInput, { target: { value: "johndoe" } });
         fireEvent.change(passwordInput, { target: { value: "12345678" } });
         fireEvent.change(confirmPasswordInput, { target: { value: "123456" } });
      });

      expect(nameInput).toHaveValue("John Doe");
      expect(emailInput).toHaveValue("johndoe");
      expect(passwordInput).toHaveValue("12345678");
      expect(confirmPasswordInput).toHaveValue("123456");

      await act(() => {
         fireEvent.submit(form);
      });

      const confirmPasswordError = screen.getByText("A confirmação de senha não corresponde a senha do campo anterior.");

      expect(confirmPasswordError).toBeInTheDocument();
   });

   it("should show no loading text when is not loading", () => {
      render(
         <BrowserRouter>
            <ThemeProvider theme={mainTheme}>
               <UserContext.Provider value={{ userRegister: userRegisterMock }}>
                  <RegisterForm />
               </UserContext.Provider>
            </ThemeProvider>
         </BrowserRouter>
      );
      
      const submitButton = screen.getByText("Cadastrar");
      
      expect(submitButton).toBeInTheDocument();
   })
});
