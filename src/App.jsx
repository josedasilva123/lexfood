import LoginPage from "./pages/LoginPage";
import RecipePage from "./pages/RecipePage";
import { useState, useEffect } from "react";
import { categoryData, recipeData } from "./data/data";
import { StyledTitle } from "./styles/typography";
import { ThemeProvider } from "styled-components";
import { darkTheme, mainTheme } from "./styles/theme";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FavoriteList from "./components/FavoriteList";
import RoutesComponent from "./routes";
import { api } from "./api/api";
import { useNavigate } from "react-router-dom";

function App() {
   const localStorageFavorites = localStorage.getItem("@FAVORITE_LIST");

   const navigate = useNavigate();

   const [user, setUser] = useState(null);

   const [categoryList, setCategoryList] = useState(categoryData);
   const [recipeList, setRecipeList] = useState([]);

   const [favoriteList, setFavoriteList] = useState(localStorageFavorites ? JSON.parse(localStorageFavorites) : []);
   const [filter, setFilter] = useState("todos");
   const [search, setSearch] = useState("");
   // const [count, setCount] = useState(recipeList.length);
   const [darkMode, setDarkMode] = useState(false);
   const [favoriteModal, setFavoriteModal] = useState(false);

   const filteredRecipeList = recipeList.filter(
      (recipe) =>
         (filter === "todos" ? true : recipe.category === filter) &&
         (!search ? true : recipe.title.toLowerCase().includes(search.toLowerCase()))
   );

   useEffect(() => {
      localStorage.setItem("@FAVORITE_LIST", JSON.stringify(favoriteList));
   }, [favoriteList]);

   function addRecipeToFavoriteList(recipe) {
      if (!favoriteList.some((favoriteRecipe) => favoriteRecipe._id === recipe._id)) {
         setFavoriteList([...favoriteList, recipe]);
         setFavoriteModal(true);
         toast.success("Receita favoritada com sucesso!");
      } else {
         toast.error("Essa receita já está favoritada.");
      }
   }

   function removeRecipeFromFavoriteList(recipeId) {
      const newList = favoriteList.filter((recipe) => recipe._id !== recipeId);
      setFavoriteList(newList);
      toast.warn("Receita desfavoritada com sucesso!");
   }

   function addReviewOnFavoriteRecipe(recipeId, review) {
      //Utilizar o map para alterar um item específico de uma lista
      const newList = favoriteList.map((recipe) => {
         if (recipe._id === recipeId) {
            return { ...recipe, review: review };
         } else {
            return recipe;
         }
      });
      setFavoriteList(newList);
   }

   /*
   function addRecipe(recipeData) {
      const newRecipeData = { ...recipeData, id: count };
      setCount(count + 1);
      setRecipeList([...recipeList, newRecipeData]);
   }

   function removeRecipe(recipeId) {
      const newList = recipeList.filter((recipe) => recipe.id !== recipeId);
      setRecipeList(newList);
   }
   */

   async function userLogin(formData, setLoading){
      try {
         setLoading(true);
         const response = await api.post('user/login', formData);
         localStorage.setItem('@TOKEN', response.data.token);
         setUser(response.data.user);
         navigate('/recipes');
      } catch (error) {
         toast.error(error.response.data.error);
      } finally {
         setLoading(false);
      }
   } 

   function userLogout(){
      localStorage.removeItem('@TOKEN');
      setUser(null);
      navigate('/'); 
   }

   return (
      <ThemeProvider theme={darkMode ? darkTheme : mainTheme}>
         <div className="App">
            {favoriteModal && (
               <FavoriteList
                  favoriteList={favoriteList}
                  removeRecipeFromFavoriteList={removeRecipeFromFavoriteList}
                  addReviewOnFavoriteRecipe={addReviewOnFavoriteRecipe}
                  setFavoriteModal={setFavoriteModal}
               />
            )}
            <button onClick={() => console.log(user)}>Debug</button>
            <button onClick={() => setDarkMode(!darkMode)}>Alternar tema</button>
            <button onClick={() => setFavoriteModal(true)}>Favoritos</button>
            <RoutesComponent
               recipeList={filteredRecipeList}
               categoryList={categoryList}
               setFilter={setFilter}
               setRecipeList={setRecipeList}
               addRecipeToFavoriteList={addRecipeToFavoriteList}
               search={search}
               setSearch={setSearch}
               user={user}
               userLogin={userLogin}
               userLogout={userLogout}
            />           
         </div>

         <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
         />
      </ThemeProvider>
   );
}

export default App;

/*
return (
      <ThemeProvider theme={darkMode ? darkTheme : mainTheme}>
         <div className="App">
            <button onClick={() => setDarkMode(!darkMode)}>Alternar tema</button>
            <button onClick={() => setFavoriteModal(true)}>Favoritos</button>
            {login ? (
               <>
                  {favoriteModal && (
                     <FavoriteList
                        favoriteList={favoriteList}
                        removeRecipeFromFavoriteList={removeRecipeFromFavoriteList}
                        addReviewOnFavoriteRecipe={addReviewOnFavoriteRecipe}
                        setFavoriteModal={setFavoriteModal}
                     />
                  )}
                  <RecipePage
                     recipeList={filteredRecipeList}
                     categoryList={categoryList}
                     setFilter={setFilter}
                     setLogin={setLogin}
                     setRecipeList={setRecipeList}
                     addRecipeToFavoriteList={addRecipeToFavoriteList}
                     search={search}
                     setSearch={setSearch}
                  />
               </>
            ) : (
               <LoginPage setLogin={setLogin} />
            )}
         </div>

         <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
         />
      </ThemeProvider>
   );
*/
