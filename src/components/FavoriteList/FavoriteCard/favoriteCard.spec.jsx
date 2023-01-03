import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import FavoriteCard from ".";
import { FavoriteContext } from "../../../providers/FavoriteContext/FavoriteContext";
import { mainTheme } from "../../../styles/theme";

const mockRecipe = {
   recipeId: "1",
   title: "Receita Exemplo 1",
   thumbnail_url: "https://example.com/example.jpg",
};

const removeRecipeFromFavoriteListMock = jest.fn();

describe("<FavoriteCard />", () => {
   it("should render correctly", () => {
      render(
         <ThemeProvider theme={mainTheme}>
            <FavoriteContext.Provider value={{ removeRecipeFromFavoriteList: removeRecipeFromFavoriteListMock }}>
               <FavoriteCard recipe={mockRecipe} />
            </FavoriteContext.Provider>
         </ThemeProvider>
      );

      const listItem = screen.getByRole("listitem");
      const title = screen.getByText("Receita Exemplo 1");
      const button = screen.getByRole("button");

      expect(listItem).toBeInTheDocument();
      expect(title).toBeInTheDocument();
      expect(button).toBeInTheDocument();
   });
});
