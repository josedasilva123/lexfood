import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { api } from "../../../api/api";
import Breadcrumbs from "../../../components/Breadcrumbs";
import Header from "../../../components/Header";
import Loading from "../../../components/Loading";
import { iRecipe } from "../../../providers/RecipeContext/@types";
import { StyledContainer } from "../../../styles/grid";

interface iRecipeGetResponse {
   recipe: iRecipe;
}

const RecipeSinglePage = () => {
   const { recipeId } = useParams();
   const { data: recipe, isLoading: recipeLoading } = useQuery({
      queryKey: ["recipe"],
      queryFn: async () => {
         try {
            const token = localStorage.getItem("@TOKEN");
            const response = await api.get<iRecipeGetResponse>(`recipe/${recipeId}`, {
               headers: {
                  auth: token,
               },
            });
            return response.data.recipe;
         } catch (error) {
            console.log(error);
         }
      },
   });
   return (
      <div>
         <Header />
         {recipeLoading ? (
            <Loading />
         ) : (
            <StyledContainer containerWidth={800}>
              <Breadcrumbs breadcrumbs={[{ label: 'Teste', url: '#' }]} currentPage={recipe?.title as string} />
               {recipeId}
               {recipe?.title}
            </StyledContainer>
         )}
      </div>
   );
};

export default RecipeSinglePage;
