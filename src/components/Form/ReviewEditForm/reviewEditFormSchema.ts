import * as yup from "yup"

export const reviewCreateEditSchema = yup.object().shape({
    content: yup.string().required('O conteúdo é obrigatório.').min(20, 'O conteúdo precisa conter pelo menos 20 caracteres'),
    score: yup.string().required('Selecionar uma pontuação é obrigatório.')
})