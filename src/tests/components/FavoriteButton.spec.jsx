/* eslint-disable testing-library/no-wait-for-side-effects */
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import FavoriteButton from "../../components/FavoriteButton";
import { FavoriteContext } from "../../providers/FavoriteContext/FavoriteContext";
import { mockTheme } from "../mocks/theme";

/* addRecipeToFavoriteList, removeRecipeFromFavoriteList  */

const addRecipeToFavoriteListMock = jest.fn();
const removeRecipeFromFavoriteListMock = jest.fn();

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');

  return {
    __esModule: true,
    ...originalModule,
    useNavigate: jest.fn(),
  };
});

const currentRecipeMock = {
   _id: "123abc",
   userID: "123abc",
   title: "Receita Exemplo",
   content: "Conteúdo da receita exemplo...",
   thumbnail_filename: "example.jpeg",
   thumbnail_url: "https://example.com/example.jpeg",
   categories: ["exemplo"],
};

describe("<FavoriteButton />", () => {
   it("should render correctly and fire add function when the current recipe is not in favorite", async () => {
      const favoriteRecipesMock = [];
      render(
         <ThemeProvider theme={mockTheme}>
            <FavoriteContext.Provider
               value={{
                  favoriteRecipes: favoriteRecipesMock,
                  addRecipeToFavoriteList: addRecipeToFavoriteListMock,
               }}
            >
               <FavoriteButton currentRecipe={currentRecipeMock} />
            </FavoriteContext.Provider>
         </ThemeProvider>
      );

      const addButton = screen.getByRole("button");

      expect(addButton).toBeInTheDocument();

      await waitFor(() => {
         fireEvent.click(addButton);
      });

      expect(addRecipeToFavoriteListMock).toBeCalledTimes(1);
   });

   it("should render correctly and fire remove function when the current recipe is in favorite", async () => {
      const favoriteRecipesMock = [
         {
            recipeId: "123abc",
            title: "Receita Exemplo",
            thumbnail_url: "https://example.com/example.jpeg",
         },
      ];

      render(
         <ThemeProvider theme={mockTheme}>
            <FavoriteContext.Provider
               value={{
                  favoriteRecipes: favoriteRecipesMock,
                  removeRecipeFromFavoriteList: removeRecipeFromFavoriteListMock,
               }}
            >
               <FavoriteButton currentRecipe={currentRecipeMock} />
            </FavoriteContext.Provider>
         </ThemeProvider>
      );

      const removeButton = screen.getByRole("button");

      expect(removeButton).toBeInTheDocument();

      await waitFor(() => {
         fireEvent.click(removeButton);
      });

      expect(removeRecipeFromFavoriteListMock).toBeCalledTimes(1);
   });
});
