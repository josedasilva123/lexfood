import * as yup from "yup";

export const recipeCreateSchema = yup.object({}).shape({
   title: yup.string().required("O título é obrigatório."),
   content: yup.string().required("O conteúdo é obrigatório").min(15, "O conteúdo precisa conter pelo menos 15 caracteres"),
   file: yup
      .mixed()
      .test("isFile", "O arquivo é obrigatório", (files: File[]) => {
         if(files[0]){
            return true;
         } else {
            return false;
         }
      })
      .test("fileSize", "O arquivo não pode ser superior a 2 MB", (files: File[]) => {
         if (files[0]) {
            return files[0].size <= 2 * 1000 * 1000;
         } else {
            return true;
         }
      })
      .test("fileType", "O arquivo precisa ser um JPEG(JPG / JPEG) ou PNG.", (files: File[]) => {
         if (files[0]) {
            return files[0].type === "image/png" || files[0].type === "image/jpeg";
         } else {
            return true;
         }
      }),
   category: yup.string().required("Escolher uma categoria é obrigatório"),
});
