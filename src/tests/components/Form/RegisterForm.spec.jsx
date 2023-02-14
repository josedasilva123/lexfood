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

   it("should show error when a field is empty", async () => {
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
         fireEvent.change(emailInput, { target: { value: "josedasilva@email.com" } });
         fireEvent.change(passwordInput, { target: { value: "@12Patinhos" } });
         fireEvent.change(confirmPassword, { target: { value: "@12Patinhos" } });
      });

      expect(emailInput).toHaveValue("josedasilva@email.com");
      expect(passwordInput).toHaveValue("@12Patinhos");
      expect(confirmPassword).toHaveValue("@12Patinhos");

      const submitButton = screen.getByText("Cadastrar");

      await act(() => {
         fireEvent.submit(submitButton);
      });

      const nameError = screen.getByText("O nome é obrigatório.");

      expect(nameError).toBeInTheDocument();

      expect(userRegisterMock).not.toHaveBeenCalled();
   });

   it("should show error when name has less then three char", async () => {
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
         fireEvent.change(nameInput, { target: { value: "Ru" } });
         fireEvent.change(emailInput, { target: { value: "josedasilva@email.com" } });
         fireEvent.change(passwordInput, { target: { value: "@12Patinhos" } });
         fireEvent.change(confirmPassword, { target: { value: "@12Patinhos" } });
      });

      expect(nameInput).toHaveValue("Ru");
      expect(emailInput).toHaveValue("josedasilva@email.com");
      expect(passwordInput).toHaveValue("@12Patinhos");
      expect(confirmPassword).toHaveValue("@12Patinhos");

      const submitButton = screen.getByText("Cadastrar");

      await act(() => {
         fireEvent.submit(submitButton);
      });

      const nameError = screen.getByText("O nome precisa de pelo menos 3 caracteres.");

      expect(nameError).toBeInTheDocument();

      expect(userRegisterMock).not.toHaveBeenCalled();
   });

   it("should show error when email is invalid", async () => {
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
         fireEvent.change(nameInput, { target: { value: "Ru" } });
         fireEvent.change(emailInput, { target: { value: "josedasilva" } });
         fireEvent.change(passwordInput, { target: { value: "@12Patinhos" } });
         fireEvent.change(confirmPassword, { target: { value: "@12Patinhos" } });
      });

      expect(nameInput).toHaveValue("Ru");
      expect(emailInput).toHaveValue("josedasilva");
      expect(passwordInput).toHaveValue("@12Patinhos");
      expect(confirmPassword).toHaveValue("@12Patinhos");

      const submitButton = screen.getByText("Cadastrar");

      await act(() => {
         fireEvent.submit(submitButton);
      });

      const emailError = screen.getByText("O e-mail digitado é inválido.");

      expect(emailError).toBeInTheDocument();

      expect(userRegisterMock).not.toHaveBeenCalled();
   });

   it("should show error when password has less then 8 char or doesn't match", async () => {
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
         fireEvent.change(emailInput, { target: { value: "josedasilva" } });
         fireEvent.change(passwordInput, { target: { value: "1234" } });
         fireEvent.change(confirmPassword, { target: { value: "@12Patinhos" } });
      });

      expect(nameInput).toHaveValue("José da Silva");
      expect(emailInput).toHaveValue("josedasilva");
      expect(passwordInput).toHaveValue("1234");
      expect(confirmPassword).toHaveValue("@12Patinhos");

      const submitButton = screen.getByText("Cadastrar");

      await act(() => {
         fireEvent.submit(submitButton);
      });

      const passwordError = screen.getByText("A senha precisa conter pelo menos 8 caracteres.");
      const confirmPasswordError = screen.getByText("A confirmação de senha não corresponde a senha do campo anterior.");

      expect(passwordError).toBeInTheDocument();
      expect(confirmPasswordError).toBeInTheDocument();

      expect(userRegisterMock).not.toHaveBeenCalled();
   });
});
