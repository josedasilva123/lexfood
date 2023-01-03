/* eslint-disable testing-library/no-debugging-utils */
/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import RecipeCategories from ".";
import { ThemeProvider } from "styled-components";
import { RecipeContext } from "../../providers/RecipeContext/RecipeContext";
import { mainTheme } from "../../styles/theme";

const categoryListMock = [
   {
      slug: "exemplo",
      name: "Exemplo",
   },
   {
      slug: "exemplo2",
      name: "Exemplo 2",
   },
   {
      slug: "exemplo3",
      name: "Exemplo 3",
   },
];

const recipeListMock = [
   {
      _id: "1",
      userID: "1",
      title: "Receita Exemplo 1",
      content: "Receita...",
      thumbnail_filename: "example.jpg",
      thumbnail_url: "https://example.com/example.jpg",
      categories: ["exemplo"],
   },
   {
      _id: "2",
      userID: "1",
      title: "Receita Exemplo 2",
      content: "Receita...",
      thumbnail_filename: "example2.jpg",
      thumbnail_url: "https://example.com/example2.jpg",
      categories: ["exemplo2"],
   },
];

const setStateMock = jest.fn();

describe("<RecipeCatories />", () => {
   it("should render correctly", () => {
      render(
         <ThemeProvider theme={mainTheme}>
            <RecipeContext.Provider value={{ categoryList: categoryListMock, recipeList: recipeListMock, filter: "todos", setFilter: setStateMock }}>
               <RecipeCategories />
            </RecipeContext.Provider>
         </ThemeProvider>
      );

      const categoryItems = screen.getAllByRole("listitem");
      const allButton = screen.getByText("Todas");
      const category1 = screen.getByText("Exemplo");
      const category2 = screen.getByText("Exemplo 2");

      expect(categoryItems).toHaveLength(3);
      expect(allButton).toBeInTheDocument();
      expect(category1).toBeInTheDocument();
      expect(category2).toBeInTheDocument();
   });
   it("should not render category button if there is not a recipe with this category", async () => {
      render(
         <ThemeProvider theme={mainTheme}>
            <RecipeContext.Provider value={{ categoryList: categoryListMock, recipeList: recipeListMock, filter: "todos" }}>
               <RecipeCategories />
            </RecipeContext.Provider>
         </ThemeProvider>
      );

      const categoryItems = screen.getAllByRole("listitem");
      expect(categoryItems).toHaveLength(3);
   });
});
