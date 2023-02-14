import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import TextArea from "../../../components/Form/Textarea";
import { mainTheme } from "../../../styles/theme";

describe("<TextArea />", () => {
   it("should render correcly", () => {
      render(
         <ThemeProvider theme={mainTheme}>
            <TextArea id="exemplo" placeholder="Exemplo" />
         </ThemeProvider>
      );

      const textarea = screen.getByPlaceholderText("Exemplo");

      expect(textarea).toBeInTheDocument();
   });

   it("should render label tag when label in valid", () => {
      render(
         <ThemeProvider theme={mainTheme}>
            <TextArea label="Exemplo:" id="exemplo" placeholder="Exemplo" />
         </ThemeProvider>
      );

      const textarea = screen.getByPlaceholderText("Exemplo");
      const label = screen.getByText("Exemplo:");

      expect(textarea).toBeInTheDocument();
      expect(label).toBeInTheDocument();
   });

   it("should render error when error is valid", () => {
      const errorMock = { message: "Ocorreu um erro." };
      render(
         <ThemeProvider theme={mainTheme}>
            <TextArea id="exemplo" placeholder="Exemplo" error={errorMock} />
         </ThemeProvider>
      );

      const textarea = screen.getByPlaceholderText("Exemplo");
      const error = screen.getByText("Ocorreu um erro.");

      expect(textarea).toBeInTheDocument();
      expect(error).toBeInTheDocument();
   });
});
