import { createContext, useEffect, useState } from "react";
import { api } from "../api/api";

export const RecipeContext = createContext({});

export const RecipeProvider = ({ children }) => {
   const [loading, setLoading] = useState(false);
   const [categoryList, setCategoryList] = useState([]);
   const [recipeList, setRecipeList] = useState([]);
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
            const response = await api.get("recipe");
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
            const response = await api.get("category");
            setCategoryList(response.data.categories);
         } catch (error) {
            console.log(error);
         }
      })();
   });

   return (
      <RecipeContext.Provider value={{ categoryList, recipeList, filteredRecipeList, filter, setFilter, search, setSearch, loading }}>
         {children}
      </RecipeContext.Provider>
   );
};
