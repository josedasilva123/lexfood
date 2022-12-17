import React, {useState} from "react";
import FavoriteCard from "./FavoriteCard";
import { StyledFavoriteList, StyledFavoriteListUL } from "./style";
import { MdClose } from "react-icons/md";
import { StyledParagraph, StyledTitle } from "../../styles/typography";
import { useContext } from "react";
import { FavoriteContext } from "../../providers/FavoriteContext/FavoriteContext";
import { UserContext } from "../../providers/UserContext/UserContext";

const FavoriteList = () => {
   const [isClosing, setClosing] = useState(false);

   const { favoriteRecipes } = useContext(UserContext);
   const { setFavoriteModal } = useContext(FavoriteContext);

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
               {favoriteRecipes.length > 0 ? favoriteRecipes.map((recipe) => (
                  <FavoriteCard
                     key={recipe.recipeId}
                     recipe={recipe}
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
