/* eslint-disable react-hooks/exhaustive-deps */
import { AxiosError } from "axios";
import { createContext } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../api/api";
import { iUserLoginFormValues } from "../../components/Form/LoginForm/@types";
import { iUserRegisterFormValues } from "../../components/Form/RegisterForm/@types";
import { iContextProviderProps, iDefaultErrorResponse } from "../@types";
import { iUserContext, iUserAutoLoginResponse, iUserLoginResponse } from "./@types";

export const UserContext = createContext({} as iUserContext);

export const UserProvider = ({ children }: iContextProviderProps) => {
   const queryClient = useQueryClient();

      /*
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
               //setFavoriteRecipes(response.data.user.favoriteRecipes);
               navigate("/recipes");
            } catch (error) {
               console.log(error);
            } finally {
               setGlobalLoading(false);
            }
         }
      })();
   }, []);
   */

   const {
      isLoading: globalLoading,
      error,
      data: user,
   } = useQuery({
      queryKey: ["user"],
      queryFn: async () => {
         const token = localStorage.getItem("@TOKEN");

         if (token) {
            try {
               const response = await api.get<iUserAutoLoginResponse>("user/autologin", {
                  headers: {
                     auth: token,
                  },
               });
               return response.data.user;
            } catch (error) {
               console.log(error);
            }
         }
      },
      onSuccess: () => {
         navigate("/recipes");
      },
      onError: () => {
         navigate("/");
      },
      initialData: null,
      retry: 0,
   });

   const navigate = useNavigate();

   const userLoginMutation = useMutation({
      mutationFn: async ({
         formData,
         setLoading,
      }: {
         formData: iUserLoginFormValues;
         setLoading: React.Dispatch<React.SetStateAction<boolean>>;
      }) => {
         try {
            setLoading(true);
            const response = await api.post<iUserLoginResponse>("user/login", formData);
            return response.data;
         } catch (error) {
            console.log(error);
            const currentError = error as AxiosError<iDefaultErrorResponse>;
            toast.error(currentError.response?.data.error);
         } finally {
            setLoading(false);
         }
      },
      onSuccess: async (data) => {  
         await queryClient.setQueryData('user', data?.user);       
         localStorage.setItem("@TOKEN", data?.token as string);
         navigate('/recipes');         
      },
   });

   const userLogin = (formData: iUserLoginFormValues, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
      userLoginMutation.mutate({ formData, setLoading });
   };

   const userRegister = async(formData: iUserRegisterFormValues, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
      try {
         setLoading(true);
         const response = await api.post("user", formData);
         toast.success(response.data.message);
         navigate("/");
      } catch (error) {
         const currentError = error as AxiosError<iDefaultErrorResponse>;
         toast.error(currentError.response?.data.error);
      } finally {
         setLoading(false);
      }
   }

   const userLogout = async () => {
      await queryClient.setQueryData('user', null);     
      localStorage.removeItem("@TOKEN");
      navigate("/");
       
   }

   return <UserContext.Provider value={{ user, userLogin, userRegister, userLogout, globalLoading }}>{children}</UserContext.Provider>;
};
