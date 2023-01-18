/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-wait-for-side-effects */
/* eslint-disable testing-library/no-debugging-utils */
import { render, screen, waitFor, act, fireEvent } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "styled-components";
import RegisterPage from ".";
import { api } from "../../api/api";
import { UserProvider } from "../../providers/UserContext/UserContext";
import { mainTheme } from "../../styles/theme";

const apiMock = new MockAdapter(api);

jest.useFakeTimers();

describe("<RegisterPage />", () => {
   it("should be able to register user", async () => {
      apiMock.onPost("user").replyOnce(200, {
        message: "Usuário cadastrado com sucesso!",
      });
      render(
         <BrowserRouter>
            <ThemeProvider theme={mainTheme}>
               <UserProvider>
                  <RegisterPage />
               </UserProvider>
            </ThemeProvider>
            <ToastContainer />
         </BrowserRouter>
      );

      const nameInput = screen.getByPlaceholderText("Digite o seu nome");
      const emailInput = screen.getByPlaceholderText("Digite o seu e-mail");
      const passwordInput = screen.getByPlaceholderText("Crie a sua senha");
      const confirmPassword = screen.getByPlaceholderText("Confirme sua senha");
      const form = screen.getByRole("form");

      await waitFor(() => {
         fireEvent.change(nameInput, { target: { value: "JohnDoe" } });
         fireEvent.change(emailInput, { target: { value: "johndoe@email.com" } });
         fireEvent.change(passwordInput, { target: { value: "@12Patinhos" } });
         fireEvent.change(confirmPassword, { target: { value: "@12Patinhos" } });
      });

      expect(nameInput).toHaveValue("JohnDoe");
      expect(emailInput).toHaveValue("johndoe@email.com");
      expect(passwordInput).toHaveValue("@12Patinhos");
      expect(confirmPassword).toHaveValue("@12Patinhos");

      await act(() => {
         fireEvent.submit(form);
         jest.advanceTimersByTime(1000);
      });

      const sucessToast = await screen.findByText("Usuário cadastrado com sucesso!");
      expect(sucessToast).toBeInTheDocument();      
   });

   it("should show error toast when email is already used by another user", async () => {
      apiMock.onPost("user").replyOnce(400, {
        error: "Desculpe, o e-mail fornecido já pertence a um usuário cadastrado.",
      });
      render(
         <BrowserRouter>
            <ThemeProvider theme={mainTheme}>
               <UserProvider>
                  <RegisterPage />
               </UserProvider>
            </ThemeProvider>
            <ToastContainer />
         </BrowserRouter>
      );

      const nameInput = screen.getByPlaceholderText("Digite o seu nome");
      const emailInput = screen.getByPlaceholderText("Digite o seu e-mail");
      const passwordInput = screen.getByPlaceholderText("Crie a sua senha");
      const confirmPassword = screen.getByPlaceholderText("Confirme sua senha");
      const form = screen.getByRole("form");

      await waitFor(() => {
         fireEvent.change(nameInput, { target: { value: "JohnDoe" } });
         fireEvent.change(emailInput, { target: { value: "johndoe@email.com" } });
         fireEvent.change(passwordInput, { target: { value: "@12Patinhos" } });
         fireEvent.change(confirmPassword, { target: { value: "@12Patinhos" } });
      });

      expect(nameInput).toHaveValue("JohnDoe");
      expect(emailInput).toHaveValue("johndoe@email.com");
      expect(passwordInput).toHaveValue("@12Patinhos");
      expect(confirmPassword).toHaveValue("@12Patinhos");

      await act(() => {
         fireEvent.submit(form);
         jest.advanceTimersByTime(1000);
      });

      const errorToast = await screen.findByText("Desculpe, o e-mail fornecido já pertence a um usuário cadastrado.");
      expect(errorToast).toBeInTheDocument();      
   });
});
