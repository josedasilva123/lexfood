/* eslint-disable react-hooks/exhaustive-deps */
import Header from "../../../components/Header";
import Loading from "../../../components/Loading";
import { iRecipe } from "../../../providers/RecipeContext/@types";
import { StyledContainer } from "../../../styles/grid";
import { StyledParagraph, StyledTitle } from "../../../styles/typography";
import { StyledSinglePage } from "./style";
import RecipeSingleHeader from "../../../components/RecipeSingle/RecipeSingleHeader";
import { useContext } from "react";
import { RecipeSinglePageContext } from "../../../providers/RecipeContext/RecipeSinglePageContext/RecipeSinglePageContext";
import ReviewCreateForm from "../../../components/Form/ReviewCreateForm";
import { UserContext } from "../../../providers/UserContext/UserContext";
import ReviewList from "../../../components/ReviewList";

const RecipeSinglePage = () => {
   const { user } = useContext(UserContext);
   const { recipe, recipeLoading } = useContext(RecipeSinglePageContext);

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
                        <div>
                           <StyledTitle tag="h2" fontSize="three">Avaliações:</StyledTitle>
                           <ReviewList />
                           {!recipe?.reviews.some(review => review.userId === user?.id ) && <ReviewCreateForm />}
                        </div>
                     </div>                     
                  </section>
               </StyledContainer>
            </main>
         )}
      </StyledSinglePage>
   );
};

export default RecipeSinglePage;
