import * as Yup from 'yup';

const empresaValidator = Yup.object().shape({
    razao_social: Yup.string()
        .required('Campo obrigatório'),

    cnpj: Yup.string()
        .required('Campo obrigatório'),
    endereco: Yup.string()
        .required('Campo obrigatório'),
    telefone: Yup.string()
        .required('Campo obrigatório'),
})

export default empresaValidator