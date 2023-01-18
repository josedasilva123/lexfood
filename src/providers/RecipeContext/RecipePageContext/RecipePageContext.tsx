import { createContext, useState } from "react";
import { useQuery } from "react-query";
import { api } from "../../../api/api";
import { iContextProviderProps } from "../../@types";
import { iRecipeGetResponse, iRecipePageContext } from "./@types";

export const RecipePageContext = createContext({} as iRecipePageContext);

export const RecipePageProvider = ({ children }: iContextProviderProps) => {
   const [filter, setFilter] = useState("todos");
   const [search, setSearch] = useState("");

   const { isLoading: recipeListLoading, data: recipeList } = useQuery({
      queryKey: ["recipeList"],
      queryFn: async () => {
         try {
            const response = await api.get<iRecipeGetResponse>("recipe");
            return response.data.recipes;
         } catch (error) {
            console.log(error);
            throw new Error("Ocorreu um erro!");
         }
      },
      initialData: [],
   });

   const filteredRecipeList = recipeList?.filter(
      (recipe) =>
         (filter === "todos" ? true : recipe.categories.includes(filter)) &&
         (!search ? true : recipe.title.toLowerCase().includes(search.toLowerCase()))
   );

   return (
      <RecipePageContext.Provider
         value={{
            recipeList,
            recipeListLoading,
            filteredRecipeList,
            filter,
            setFilter,
            search,
            setSearch,
         }}
      >
         {children}
      </RecipePageContext.Provider>
   );
};
