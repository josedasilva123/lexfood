/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { api } from "../../../api/api";
import Header from "../../../components/Header";
import Loading from "../../../components/Loading";
import { iRecipe } from "../../../providers/RecipeContext/@types";
import { StyledContainer } from "../../../styles/grid";
import { StyledParagraph } from "../../../styles/typography";
import { StyledSinglePage } from "./style";
import RecipeSingleHeader from "../../../components/RecipeSingle/RecipeSingleHeader";

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
      <StyledSinglePage>
         <Header />
         {recipeLoading ? (
            <Loading />
         ) : (
            <main>
               <StyledContainer containerWidth={800}>
                  <section className="recipeBox">
                     <RecipeSingleHeader recipe={recipe as iRecipe} />
                     <img src={recipe?.thumbnail_url} alt={recipe?.title} className="thumbnail" />
                     <div className="contentBox">
                        <StyledParagraph>{recipe?.content}</StyledParagraph>
                     </div>
                  </section>
               </StyledContainer>
            </main>
         )}
      </StyledSinglePage>
   );
};

export default RecipeSinglePage;
