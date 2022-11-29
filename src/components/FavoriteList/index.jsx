import React, {useState} from "react";
import FavoriteCard from "./FavoriteCard";
import { StyledFavoriteList, StyledFavoriteListUL } from "./style";
import { MdClose } from "react-icons/md";
import { StyledParagraph, StyledTitle } from "../../styles/typography";

const FavoriteList = ({ favoriteList, removeRecipeFromFavoriteList, addReviewOnFavoriteRecipe, setFavoriteModal }) => {
   const [isClosing, setClosing] = useState(false);

   function closeModal(){
      setClosing(true);
      setTimeout(() => {
         setFavoriteModal(false);
         setClosing(false);
      }, 600)     
   }
   
   return (
      <StyledFavoriteList isClosing={isClosing}>
         <div>
            <button onClick={() => closeModal()} disabled={isClosing}>
               <MdClose size={21} />
            </button>
            <StyledTitle tag="h2" fontSize="two" fontWeight={700}> 
               Favoritos
            </StyledTitle>
            <StyledFavoriteListUL>
               {favoriteList.length > 0 ? favoriteList.map((recipe) => (
                  <FavoriteCard
                     key={recipe._id}
                     recipe={recipe}
                     addReviewOnFavoriteRecipe={addReviewOnFavoriteRecipe}
                     removeRecipeFromFavoriteList={removeRecipeFromFavoriteList}
                  />
               )) : (
                  <StyledParagraph>Adicione um favorito</StyledParagraph>
               )}
            </StyledFavoriteListUL>
         </div>
      </StyledFavoriteList>
   );
};

export default FavoriteList;
