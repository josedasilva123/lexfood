import { iUserLoginFormValues } from "../../components/Form/LoginForm/@types";
import { iUserRegisterFormValues } from "../../components/Form/RegisterForm/@types";

export interface iUserAutoLoginResponse {
   user: iUser;
}

export interface iUserLoginResponse {
   user: iUser;
   token: string;
}

export interface iFavoriteRecipe {
   recipeId: string;
   title: string;
   thumbnail_url: string;
}

export interface iUser {
   id: string;
   name: string;
   email: string;
   favoriteRecipes: iFavoriteRecipe[];
}

export interface iUserContext {
   user: iUser | null;
   userLogin: (formData: iUserLoginFormValues, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => void;
   userRegister: (formData: iUserRegisterFormValues, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => void;
   userLogout: () => void;
   globalLoading: boolean;
}
