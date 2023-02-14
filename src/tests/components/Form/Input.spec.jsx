import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import Input from "../../../components/Form/Input";
import { mockTheme } from "../../mocks/theme";

describe("<Input />", () => {
   it("should render correctly and with the correct input type", () => {
      render(
         <ThemeProvider theme={mockTheme}>
            <Input id="example" type="text" placeholder="Exemplo" />
         </ThemeProvider>
      );

      const input = screen.getByPlaceholderText("Exemplo");

      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("type", "text");
   });

   it("should render label tag when label in valid", () => {
      render(
         <ThemeProvider theme={mockTheme}>
            <Input id="example" label="Exemplo:" type="text" placeholder="Exemplo" />
         </ThemeProvider>
      );

      const input = screen.getByPlaceholderText("Exemplo");
      const label = screen.getByText("Exemplo:");

      expect(input).toBeInTheDocument();
      expect(label).toBeInTheDocument();
   });

   it("should render error when error is valid", () => {
      const errorMock = { message: "Ocorreu um erro." };
      render(
         <ThemeProvider theme={mockTheme}>
            <Input id="example" type="text" placeholder="Exemplo" error={errorMock} />
         </ThemeProvider>
      );

      const input = screen.getByPlaceholderText("Exemplo");
      const error = screen.getByText("Ocorreu um erro.");

      expect(input).toBeInTheDocument();
      expect(error).toBeInTheDocument();
   });
});
