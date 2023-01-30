import { screen, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Breadcrumbs from "../../components/Breadcrumbs";
import { mockTheme } from "../mocks/theme";

describe("<Breadcrumbs />", () => {
   it("should render correctly with the current page", () => {
      render(
         <ThemeProvider theme={mockTheme}>
            <BrowserRouter>
               <Breadcrumbs currentPage="Exemplo" />
            </BrowserRouter>
         </ThemeProvider>
      );

      const homeLink = screen.getByText("Receitas");
      const currentPage = screen.getByText("Exemplo");

      expect(homeLink).toBeInTheDocument();
      expect(currentPage).toBeInTheDocument();
   });

   it("should render correctly with the current page and breadcrumbs", () => {
    const mockBreadcrumbs = [{ label: 'Exemplo2', url: "#"}];
    render(
       <ThemeProvider theme={mockTheme}>
          <BrowserRouter>
             <Breadcrumbs currentPage="Exemplo" breadcrumbs={mockBreadcrumbs} />
          </BrowserRouter>
       </ThemeProvider>
    );

    const homeLink = screen.getByText("Receitas");
    const innerLink = screen.getByText("Exemplo2");
    const currentPage = screen.getByText("Exemplo");

    expect(homeLink).toBeInTheDocument();
    expect(innerLink).toBeInTheDocument();
    expect(currentPage).toBeInTheDocument();
 });
});
