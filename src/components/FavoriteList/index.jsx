import React from "react";
import FavoriteCard from "./FavoriteCard";

const FavoriteList = ({ favoriteList, removeRecipeFromFavoriteList, addReviewOnFavoriteRecipe }) => {
   return (
      <ul>
         {favoriteList.map((recipe) => (
            <FavoriteCard 
                key={recipe._id} 
                recipe={recipe} 
                addReviewOnFavoriteRecipe={addReviewOnFavoriteRecipe}
                removeRecipeFromFavoriteList={removeRecipeFromFavoriteList} 
            />
         ))}
      </ul>
   );
};

export default FavoriteList;
