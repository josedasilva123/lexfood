import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { mockTheme } from "../../mocks/theme";
import Select from "../../../components/Form/Select";

describe("<Select />", () => {
   it("should render correctly with the correctly with options inside select tag", () => {
      render(
         <ThemeProvider theme={mockTheme}>
            <Select id="exemplo">
               <option value="exemplo">Exemplo</option>
            </Select>
         </ThemeProvider>
      );

      const select = screen.getByRole("listbox");
      const selectOption = screen.getByText("Exemplo");

      expect(select).toBeInTheDocument();
      expect(selectOption).toBeInTheDocument();
   });

   it("should render label tag when label in valid", () => {
      render(
         <ThemeProvider theme={mockTheme}>
            <Select label="Exemplo:" id="exemplo">
               <option value="exemplo">Exemplo</option>
            </Select>
         </ThemeProvider>
      );

      const select = screen.getByRole("listbox");
      const selectLabel = screen.getByText("Exemplo:");

      expect(select).toBeInTheDocument();
      expect(selectLabel).toBeInTheDocument();
   });

   it("should render error when error is valid", () => {
      const errorMock = { message: "Ocorreu um erro." };

      render(
         <ThemeProvider theme={mockTheme}>
            <Select id="exemplo" error={errorMock}>
               <option value="exemplo">Exemplo</option>
            </Select>
         </ThemeProvider>
      );

      const select = screen.getByRole("listbox");
      const error = screen.getByText("Ocorreu um erro.");

      expect(select).toBeInTheDocument();
      expect(error).toBeInTheDocument();
   });
});
