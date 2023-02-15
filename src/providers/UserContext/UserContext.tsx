/* eslint-disable react-hooks/exhaustive-deps */
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createContext, useContextSelector } from "use-context-selector";
import { api } from "../../api/api";
import { iUserLoginFormValues } from "../../components/Form/LoginForm/@types";
import { iUserRegisterFormValues } from "../../components/Form/RegisterForm/@types";
import { iContextProviderProps, iDefaultErrorResponse } from "../@types";
import { DarkModeContext } from "../DarkModeContext/DarkModeContext";
import { iUserContext, iUserAutoLoginResponse, iUserLoginResponse } from "./@types";

export const UserContext = createContext({} as iUserContext);

export const UserProvider = ({ children }: iContextProviderProps) => {
   const queryClient = useQueryClient();
   const setDarkMode = useContextSelector(DarkModeContext, context => context.setDarkMode);
   const [cachedRoute, setCachedRoute] = useState("");
   const [isLoginIn, setIsLoginIn] = useState(false);

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
               setIsLoginIn(true);
               return response.data.user;
            } catch (error) {
               console.log(error);
            }
         }
      },
      onError: () => {
         navigate("/");
      },
      initialData: null,
      retry: 0,
   });

   useEffect(() => {
      if (user && isLoginIn) {
         navigate(cachedRoute ? cachedRoute : "/recipes");
         setIsLoginIn(false);
      }
   }, [user]);

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
            setIsLoginIn(true);
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
         await queryClient.setQueryData("user", data?.user);
         localStorage.setItem("@TOKEN", data?.token as string);
      },
   });

   const userLogin = (formData: iUserLoginFormValues, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
      userLoginMutation.mutate({ formData, setLoading });
   };

   const userRegister = async (formData: iUserRegisterFormValues, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
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
   };

   const userLogout = async () => {
      setCachedRoute("");
      setDarkMode(false);
      await queryClient.setQueryData("user", null);      
      localStorage.removeItem("@TOKEN");
      navigate("/");
   };

   return (
      <UserContext.Provider value={{ user, userLogin, userRegister, userLogout, globalLoading, cachedRoute, setCachedRoute }}>
         {children}
      </UserContext.Provider>
   );
};
