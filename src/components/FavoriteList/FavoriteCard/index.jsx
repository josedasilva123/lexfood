import React from "react";

const FavoriteCard = ({ recipe, removeRecipeFromFavoriteList, addReviewOnFavoriteRecipe}) => {
   return (
      <li>
         <h3>{recipe.title}</h3>
         {recipe.review && <span>{recipe.review}</span>}
         <button onClick={() => addReviewOnFavoriteRecipe(recipe._id, 4)}>4</button>
         <button onClick={() => addReviewOnFavoriteRecipe(recipe._id, 5)}>5</button>
         <button onClick={() => removeRecipeFromFavoriteList(recipe._id)}>Remover</button>
      </li>
   );
};

export default FavoriteCard;
