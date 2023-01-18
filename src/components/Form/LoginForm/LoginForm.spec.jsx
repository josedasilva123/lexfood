/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-wait-for-side-effects */
import React from "react";
import { ThemeProvider } from "styled-components";
import { mainTheme } from "../../../styles/theme";
import { UserContext } from "../../../providers/UserContext/UserContext";
import LoginForm from ".";
import { BrowserRouter } from "react-router-dom";
import { fireEvent, render, screen, waitFor, act } from "@testing-library/react";

const userLoginMock = jest.fn();

describe("<LoginForm />", () => {
   it("should be able to fill form and call the login function", async () => {
      render(
         <BrowserRouter>
            <ThemeProvider theme={mainTheme}>
               <UserContext.Provider value={{ userLogin: userLoginMock }}>
                  <LoginForm />
               </UserContext.Provider>
            </ThemeProvider>
         </BrowserRouter>
      );

      const emailInput = screen.getByPlaceholderText("Seu e-mail");
      const passwordInput = screen.getByPlaceholderText("Sua senha");
      const form = screen.getByRole("form");

      await waitFor(() => {
         fireEvent.change(emailInput, { target: { value: "johndoe@email.com" } });
         fireEvent.change(passwordInput, { target: { value: "123456" } });
      });

   

      expect(emailInput).toHaveValue("johndoe@email.com");
      expect(passwordInput).toHaveValue("123456");

      await act(() => {
         fireEvent.submit(form);
      });

      expect(userLoginMock).toHaveBeenCalled();
   });

   it("should show errors when the fields are empty", async () => {
      render(
         <BrowserRouter>
            <ThemeProvider theme={mainTheme}>
               <UserContext.Provider value={{ userLogin: userLoginMock }}>
                  <LoginForm />
               </UserContext.Provider>
            </ThemeProvider>
         </BrowserRouter>
      );

      const form = screen.getByRole("form");

      await act(() => {
         fireEvent.submit(form);
      });

      const emailError = screen.getByText("O email é obrigatório.");
      const passwordError = screen.getByText("A senha é obrigatória.");

      expect(emailError).toBeInTheDocument();
      expect(passwordError).toBeInTheDocument();
   });

   it("should show no loading text when is not loading", () => {
      render(
         <BrowserRouter>
            <ThemeProvider theme={mainTheme}>
               <UserContext.Provider value={{ userLogin: userLoginMock }}>
                  <LoginForm />
               </UserContext.Provider>
            </ThemeProvider>
         </BrowserRouter>
      );
      
      const submitButton = screen.getByText("Entrar");
      
      expect(submitButton).toBeInTheDocument();
   })
});
