/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-wait-for-side-effects */
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import LoginForm from "../../../components/Form/LoginForm";
import { UserContext } from "../../../providers/UserContext/UserContext";
import { mockTheme } from "../../mocks/theme";

const userLoginMock = jest.fn();

describe("<LoginForm />", () => {
   it("should render correct and be able to submit", async () => {
      render(
         <ThemeProvider theme={mockTheme}>
            <UserContext.Provider value={{ userLogin: userLoginMock }}>
                <LoginForm />
            </UserContext.Provider>
         </ThemeProvider>
      );

      const emailInput = screen.getByPlaceholderText("Seu e-mail");
      const passwordInput = screen.getByPlaceholderText("Sua senha");

      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();

      await waitFor(() => {
        fireEvent.change(emailInput, { target: { value: "example@gmail.com"}});
        fireEvent.change(passwordInput, { target: { value: "123456"}});
      })

      expect(emailInput).toHaveValue("example@gmail.com");
      expect(passwordInput).toHaveValue("123456");

      const submitButton = screen.getByText("Entrar");

      await act(() => {
        fireEvent.submit(submitButton);
      })

      expect(userLoginMock).toBeCalledTimes(1);
   });

   it("should show error when a field is empty", async () => {
    render(
       <ThemeProvider theme={mockTheme}>
          <UserContext.Provider value={{ userLogin: userLoginMock }}>
              <LoginForm />
          </UserContext.Provider>
       </ThemeProvider>
    );

    const submitButton = screen.getByText("Entrar");

    await act(() => {
        fireEvent.submit(submitButton);
    })

    const emailError = screen.getByText("O email é obrigatório.");
    const passwordError = screen.getByText("A senha é obrigatória.");

    expect(emailError).toBeInTheDocument();
    expect(passwordError).toBeInTheDocument();

    expect(userLoginMock).not.toHaveBeenCalled();    
 });
});
