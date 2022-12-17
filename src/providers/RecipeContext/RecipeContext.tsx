import { createContext, useEffect, useState } from "react";
import { api } from "../../api/api";
import { iContextProviderProps } from "../@types";
import { iRecipeContext, iCategory, iRecipe, iRecipeGetResponse, iCategoryGetResponse, iRecipeCreateResponse } from "./@types";

export const RecipeContext = createContext({} as iRecipeContext);

export const RecipeProvider = ({ children }: iContextProviderProps) => {
   const [loading, setLoading] = useState(false);
   const [categoryList, setCategoryList] = useState<iCategory[]>([]);
   const [recipeList, setRecipeList] = useState<iRecipe[]>([]);
   const [filter, setFilter] = useState("todos");
   const [search, setSearch] = useState("");

   const filteredRecipeList = recipeList.filter(
      (recipe) =>
         (filter === "todos" ? true : recipe.categories.includes(filter)) &&
         (!search ? true : recipe.title.toLowerCase().includes(search.toLowerCase()))
   );

   useEffect(() => {
      (async () => {
         try {
            setLoading(true);
            const response = await api.get<iRecipeGetResponse>("recipe");
            setRecipeList(response.data.recipes);
         } catch (error) {
            console.log(error);
         } finally {
            setLoading(false);
         }
      })();
   }, []);

   useEffect(() => {
      (async () => {
         try {
            const response = await api.get<iCategoryGetResponse>("category");
            setCategoryList(response.data.categories);
         } catch (error) {
            console.log(error);
         }
      })();
   });

   const recipeCreate = async (formData: FormData) => {
      const token = localStorage.getItem("@TOKEN");
      try {
         //Atualizou o back-end
          const response = await api.post<iRecipeCreateResponse>('recipe', formData, {
              headers: {
                  "Content-Type": "multipart/form-data",
                  auth: token
              }
          })
          /* response.data.recipe === receita nova */
          setRecipeList([...recipeList, response.data.recipe]);
          // 
          console.log(response);
      } catch (error) {
          console.log(error);
      }
    }

   return (
      <RecipeContext.Provider value={{ categoryList, recipeList, filteredRecipeList, filter, setFilter, search, setSearch, loading, recipeCreate }}>
         {children}
      </RecipeContext.Provider>
   );
};
