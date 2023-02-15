import { useQuery, useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createContext } from "use-context-selector";
import { api } from "../../api/api";
import { iContextProviderProps } from "../@types";
import { iRecipeContext, iRecipe, iCategoryGetResponse, iRecipeCreateResponse } from "./@types";

export const RecipeContext = createContext({} as iRecipeContext);

export const RecipeProvider = ({ children }: iContextProviderProps) => {
   const queryClient = useQueryClient();

   const navigate = useNavigate();

   const {
      isLoading: categoryListLoading,
      data: categoryList,
   } = useQuery("categoryList", async () => {
      try {
         const response = await api.get<iCategoryGetResponse>("category");
         return response.data.categories;
      } catch (error) {
         console.log(error);      
      }
   });
   
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
            throw new Error("Desculpe, ocorreu um erro e não foi possível cadastrar uma receita.")
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
         toast.error(error as string);
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
         value={{ categoryList, categoryListLoading, recipeCreate }}
      >
         {children}
      </RecipeContext.Provider>
   );
};
