/* eslint-disable testing-library/no-debugging-utils */
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import FavoriteList from ".";
import { FavoriteContext } from "../../providers/FavoriteContext/FavoriteContext";
import { UserContext } from "../../providers/UserContext/UserContext";
import { mainTheme } from "../../styles/theme";

const favoriteRecipesMock = [
   {
      recipeId: "1",
      title: "Receita Exemplo 1",
      thumbnail_url: "https://example.com/example.jpg",
   },
   {
      recipeId: "1",
      title: "Receita Exemplo 2",
      thumbnail_url: "https://example.com/example.jpg",
   },
];

const setStateMock = jest.fn();

describe("<FavoriteList />", () => {
   it("should render correctly", () => {
      render(
         <ThemeProvider theme={mainTheme}>
            <UserContext.Provider value={{ favoriteRecipes: favoriteRecipesMock }}>
               <FavoriteContext.Provider value={{ setFavoriteModal: setStateMock }}>
                  <FavoriteList />
               </FavoriteContext.Provider>
            </UserContext.Provider>
         </ThemeProvider>
      );

      const recipes = screen.getAllByRole("listitem");
      expect(recipes).toHaveLength(2);
   });

   it("should render empty message when favoriteRecipes is a empty array", () => {
    render(
       <ThemeProvider theme={mainTheme}>
          <UserContext.Provider value={{ favoriteRecipes: [] }}>
             <FavoriteContext.Provider value={{ setFavoriteModal: setStateMock }}>
                <FavoriteList />
             </FavoriteContext.Provider>
          </UserContext.Provider>
       </ThemeProvider>
    );

    const empty = screen.getByText("Adicione um favorito");
    expect(empty).toBeInTheDocument();
 });
});
