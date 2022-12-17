/* eslint-disable react-hooks/exhaustive-deps */
import { AxiosError } from "axios";
import { useEffect } from "react";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../api/api";
import { iUserLoginFormValues } from "../../components/Form/LoginForm/@types";
import { iUserRegisterFormValues } from "../../components/Form/RegisterForm/@types";
import { iContextProviderProps, iDefaultErrorResponse } from "../@types";
import { iUserContext, iUser, iFavoriteRecipe, iUserAutoLoginResponse, iUserLoginResponse } from "./@types";

export const UserContext = createContext({} as iUserContext);

export const UserProvider = ({ children }: iContextProviderProps) => {
   const [globalLoading, setGlobalLoading] = useState(false);
   const [user, setUser] = useState<iUser | null>(null);
   const [favoriteRecipes, setFavoriteRecipes] = useState<iFavoriteRecipe[]>([]);

   const navigate = useNavigate();

   useEffect(() => {
      const token = localStorage.getItem("@TOKEN");

      (async () => {
         if (token) {
            try {
               setGlobalLoading(true);
               const response = await api.get<iUserAutoLoginResponse>("user/autologin", {
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

   async function userLogin(formData: iUserLoginFormValues, setLoading: React.Dispatch<React.SetStateAction<boolean>>) {
      try {
         setLoading(true);
         const response = await api.post<iUserLoginResponse>("user/login", formData);
         localStorage.setItem("@TOKEN", response.data.token);
         setUser(response.data.user);
         setFavoriteRecipes(response.data.user.favoriteRecipes);
         navigate("/recipes");
      } catch (error) {
         const currentError = error as AxiosError<iDefaultErrorResponse>;
         toast.error(currentError.response?.data.error);
      } finally {
         setLoading(false);
      }
   }

   async function userRegister(formData: iUserRegisterFormValues, setLoading: React.Dispatch<React.SetStateAction<boolean>>) {
      try {
         setLoading(true);
         const response = await api.post("user", formData);
         toast.success(response.data.message);
      } catch (error) {
         const currentError = error as AxiosError<iDefaultErrorResponse>;
         toast.error(currentError.response?.data.error);
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
