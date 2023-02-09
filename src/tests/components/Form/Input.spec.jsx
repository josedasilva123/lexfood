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

   it("should render correctly and show label", () => {
      render(
         <ThemeProvider theme={mockTheme}>
            <Input id="example" label="Exemplo" type="text" placeholder="Exemplo" />
         </ThemeProvider>
      );

      const input = screen.getByPlaceholderText("Exemplo");
      const label = screen.getByText("Exemplo");

      expect(input).toBeInTheDocument();
      expect(label).toBeInTheDocument();
   });

   it("should show error paragraph and an error is valid", () => {
    render(
        <ThemeProvider theme={mockTheme}>
           <Input id="example" label="Exemplo" type="text" placeholder="Exemplo" />
        </ThemeProvider>
     );
   })
});
