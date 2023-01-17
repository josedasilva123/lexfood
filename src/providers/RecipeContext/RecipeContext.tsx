import { AxiosError } from "axios";
import { createContext, useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../api/api";
import { iContextProviderProps } from "../@types";
import { iRecipeContext, iCategory, iRecipe, iRecipeGetResponse, iCategoryGetResponse, iRecipeCreateResponse } from "./@types";

export const RecipeContext = createContext({} as iRecipeContext);

export const RecipeProvider = ({ children }: iContextProviderProps) => {
   const [filter, setFilter] = useState("todos");
   const [search, setSearch] = useState("");

   const queryClient = useQueryClient();

   const navigate = useNavigate();

   const {
      isLoading: recipeListLoading,
      data: recipeList,
   } = useQuery({
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

   const {
      isLoading: categoryListLoading,
      data: categoryList,
   } = useQuery<iCategory[]>("categoryList", async () => {
      try {
         const response = await api.get<iCategoryGetResponse>("category");
         return response.data.categories;
      } catch (error) {
         console.log(error);
         throw new Error("Ocorreu um erro!");
      }
   }, []);

   const filteredRecipeList = recipeList?.filter(
      (recipe) =>
         (filter === "todos" ? true : recipe.categories.includes(filter)) &&
         (!search ? true : recipe.title.toLowerCase().includes(search.toLowerCase()))
   );

   const recipeCreateMutation = useMutation({
      mutationFn: async ({ formData }: { formData: FormData }) => {
         try {
            const token = localStorage.getItem("@TOKEN");
            const response = await api.post<iRecipeCreateResponse>("recipe", formData, {
               headers: {
                  "Content-Type": "multipart/form-data",
                  auth: token,
               },
            });

            return response.data.recipe;
         } catch (error) {
            console.log(error);
         }
      },
      onSuccess: (data) => {
         queryClient.setQueryData<iRecipe[]>("recipeList", (currentRecipeList) => {
            return [...(currentRecipeList as iRecipe[]), data as iRecipe];
         });
         toast.success("Receita cadastrada como sucesso!");
         navigate('/recipes');
      },
      onError: (error) => {
         toast.error("Desculpe, ocorreu um erro.");
      },
   });

   const recipeCreate = (formData: FormData) => {
      recipeCreateMutation.mutate({formData})
   }
   /*
   const recipeCreate = async (formData: FormData) => {
      const token = localStorage.getItem("@TOKEN");
      try {
          const response = await api.post<iRecipeCreateResponse>('recipe', formData, {
              headers: {
                  "Content-Type": "multipart/form-data",
                  auth: token
              }
          })

          setRecipeList([...recipeList, response.data.recipe]);
          
          console.log(response);
      } catch (error) {
          console.log(error);
      }
    }
    */

   return (
      <RecipeContext.Provider
         value={{ categoryList, recipeList, filteredRecipeList, filter, setFilter, search, setSearch, recipeListLoading, recipeCreate }}
      >
         {children}
      </RecipeContext.Provider>
   );
};
