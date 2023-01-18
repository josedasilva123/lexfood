/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-wait-for-side-effects */
/* eslint-disable testing-library/no-debugging-utils */
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "styled-components";
import LoginPage from ".";
import { api } from "../../api/api";
import { UserProvider } from "../../providers/UserContext/UserContext";
import { mainTheme } from "../../styles/theme";

const apiMock = new MockAdapter(api);

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}))

jest.useFakeTimers();

describe("<LoginPage>", () => {
   it("should be able to login", async () => {
      apiMock.onPost("user/login").replyOnce(200, {
         user: {
            name: "John doe",
            email: "johndoe@example.com",
         },
      });
      render(
         <BrowserRouter>
            <ThemeProvider theme={mainTheme}>
               <UserProvider>
                  <LoginPage />
               </UserProvider>
            </ThemeProvider>
         </BrowserRouter>
      );

      const emailField = screen.getByPlaceholderText("Seu e-mail");
      const passwordField = screen.getByPlaceholderText("Sua senha");
      const form = screen.getByRole("form");

      await waitFor(() => {
         fireEvent.change(emailField, { target: { value: "johndoe@example.com" } });
         fireEvent.change(passwordField, { target: { value: "123456" } });
      });

      await act(() => {
         fireEvent.submit(form);
      });

      expect(emailField).toHaveValue("johndoe@example.com");
      expect(passwordField).toHaveValue("123456");
      expect(mockNavigate).toHaveBeenCalled();      
   });  

   it("should show error toast when user doesn't exist", async () => {
      apiMock.onPost("user/login").replyOnce(400, {
         error: "Desculpe, o usuário fornecido não existe."
      });
      render(
         <BrowserRouter>
            <ThemeProvider theme={mainTheme}>
               <UserProvider>
                  <LoginPage />
               </UserProvider>
            </ThemeProvider>
            <ToastContainer />
         </BrowserRouter>
      );

      const emailField = screen.getByPlaceholderText("Seu e-mail");
      const passwordField = screen.getByPlaceholderText("Sua senha");
      const form = screen.getByRole("form");

      await waitFor(() => {
         fireEvent.change(emailField, { target: { value: "johndoe@example.com" } });
         fireEvent.change(passwordField, { target: { value: "123456" } });
      });

      await act(() => {
         fireEvent.submit(form);
         jest.advanceTimersByTime(1000);
      });

      const errorToast = await screen.findByText("Desculpe, o usuário fornecido não existe.");
      
      expect(errorToast).toBeInTheDocument();
   });
});
