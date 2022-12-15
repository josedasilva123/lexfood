/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../api/api";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
   const [globalLoading, setGlobalLoading] = useState(false);
   const [user, setUser] = useState(null);
   const [favoriteRecipes, setFavoriteRecipes] = useState([]);

   const navigate = useNavigate();

   useEffect(() => {
      const token = localStorage.getItem("@TOKEN");

      (async () => {
         if (token) {
            try {
               setGlobalLoading(true);
               const response = await api.get("user/autologin", {
                  headers: {
                     auth: token,
                  },
               });
               setUser(response.data.user);
               setFavoriteRecipes(response.data.user.favoriteRecipes);
               navigate("/recipes");
            } catch (error) {
               console.log(error);
            } finally {
               setGlobalLoading(false);
            }
         }
      })();
   }, []);

   async function userLogin(formData, setLoading) {
      try {
         setLoading(true);
         const response = await api.post("user/login", formData);
         localStorage.setItem("@TOKEN", response.data.token);
         setUser(response.data.user);
         setFavoriteRecipes(response.data.user.favoriteRecipes);
         navigate("/recipes");
      } catch (error) {
         toast.error(error.response.data.error);
      } finally {
         setLoading(false);
      }
   }

   async function userRegister(formData, setLoading) {
      try {
         setLoading(true);
         const response = await api.post("user", formData);
         toast.success(response.data.message);
      } catch (error) {
         toast.error(error.response.data.error);
      } finally {
         setLoading(false);
      }
   }

   function userLogout() {
      localStorage.removeItem("@TOKEN");
      setUser(null);
      navigate("/");
   }

   return (
      <UserContext.Provider value={{ user, userLogin, userRegister, userLogout, globalLoading, favoriteRecipes, setFavoriteRecipes }}>
         {children}
      </UserContext.Provider>
   );
};
