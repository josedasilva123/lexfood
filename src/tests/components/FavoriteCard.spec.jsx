/* eslint-disable testing-library/no-wait-for-side-effects */
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import FavoriteCard from "../../components/FavoriteList/FavoriteCard";
import { FavoriteContext } from "../../providers/FavoriteContext/FavoriteContext";
import { mockTheme } from "../mocks/theme";

const mockRecipe = {
   recipeId: "123abc",
   title: "Receita Exemplo",
   thumbnail_url: "https://example.com/example.jpeg",
};

const removeRecipeFromFavoriteListMock = jest.fn();

describe("<FavoriteCard />", () => {
   it("should render correctly and fire remove when clicked in the button", async () => {
      render(
         <ThemeProvider theme={mockTheme}>
            <FavoriteContext.Provider value={{ removeRecipeFromFavoriteList: removeRecipeFromFavoriteListMock }}>
               <FavoriteCard recipe={mockRecipe} />
            </FavoriteContext.Provider>
         </ThemeProvider>
      );

      const recipeTitle = screen.getByText("Receita Exemplo");
      expect(recipeTitle).toBeInTheDocument();

      const removeButton = screen.getByRole("button");
      expect(removeButton).toBeInTheDocument();

      await waitFor(() => {
         fireEvent.click(removeButton);
      });

      expect(removeRecipeFromFavoriteListMock).toBeCalledTimes(1);
   });
});
