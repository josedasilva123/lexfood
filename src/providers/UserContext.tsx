/* eslint-disable react-hooks/exhaustive-deps */
import { AxiosError } from "axios";
import { useEffect } from "react";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../api/api";
import { iLoginFormValues } from "../components/Form/LoginForm";
import { iRegisterFormValues } from "../components/Form/RegisterForm";
import { iProviderProps, iRequestError } from "./@types";

interface iUserProviderProps{
   children: React.ReactNode;
} 

/*
"recipeId": "637e1f5d9e648375aeed83f2",
	"title": "Hamburguer Boladão",
	"thumbnail_url": "https://alexconderexamplebucket.s3.sa-east-1.amazonaws.com/a1b95a71fa39b58672ce269cd0d6d88d"
*/  

interface iFavoriteRecipe{
   recipeId: string;
   title: string;
   thumbnail_url: string;
}

interface iRegisterResponse{
   message: string;
}

interface iLoginResponse{
   user: iUser;
   token: string;
}

interface iAutoLoginResponse{
   user: iUser;
}

interface iUser{
   _id: string;
   name: string;
   email: string;
   favoriteRecipes: iFavoriteRecipe[],
}

interface iUserContext{
   user: iUser | null;
   userLogin: (formData: iLoginFormValues, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => void;
   userRegister: (formData: iRegisterFormValues, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => void;
   userLogout: () => void;
   globalLoading: boolean;
   favoriteRecipes: iFavoriteRecipe[];
   setFavoriteRecipes: React.Dispatch<React.SetStateAction<iFavoriteRecipe[]>>;
}

/* user, userLogin, userRegister, userLogout, globalLoading, favoriteRecipes, setFavoriteRecipes */

export const UserContext = createContext({} as iUserContext);

export const UserProvider = ({ children }: iProviderProps) => {
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
               const response = await api.get<iAutoLoginResponse>("user/autologin", {
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

   async function userLogin(formData: iLoginFormValues, setLoading: React.Dispatch<React.SetStateAction<boolean>>) {
      try {
         setLoading(true);
         const response = await api.post<iLoginResponse>("user/login", formData);
         localStorage.setItem("@TOKEN", response.data.token);
         setUser(response.data.user);
         setFavoriteRecipes(response.data.user.favoriteRecipes);
         navigate("/recipes");
      } catch (error) {
         const currentError = error as AxiosError<iRequestError>
         toast.error(currentError.response?.data.error);
      } finally {
         setLoading(false);
      }
   }

   async function userRegister(formData: iRegisterFormValues, setLoading: React.Dispatch<React.SetStateAction<boolean>>) {
      try {
         setLoading(true);
         const response = await api.post<iRegisterResponse>("user", formData);
         toast.success(response.data.message);
      } catch (error) {
         const currentError = error as AxiosError<iRequestError>
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
