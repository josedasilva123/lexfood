import { createContext, useEffect, useState } from "react";
import { api } from "../api/api";
import { iContextProviderProps } from "./@types";

interface iCategory{
   _id: string;
   name: string;
   slug: string;
   createdAt: string;
   updatedAt: string;
}


interface iRecipe{
   _id: string;
   userID: string;
   title: string;
   cntent: string;
   thumbnail_filename: string;
   thumbnail_url: string;
   categories: string[];
   createdAt: string;
   updatedAt: string;
}

interface iCategoryGetResponse{
   categories: iCategory[];
}

interface iRecipeGetResponse{
   count: number;
   recipes: iRecipe[];
}

interface iRecipeCreateResponse{
   recipe: iRecipe;
   message: string;
}

export const RecipeContext = createContext({});

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
