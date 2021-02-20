import { LocaleObject, setLocale } from 'yup'

const ptBR: LocaleObject = {
    mixed: {
        required: '${path} é requerido',
        notType: 'Tipo inválido'
    },
    string: {
        max: '${path} precisa ter no máximo ${max} caracteres',
        length: 'O ${path} deve ter exastos ${length} caracteres'
    },
    number: {
        integer: '${path} deve ser um número',
        min: '${path} precisa ter no mínimo ${min} caracteres'
    }
}

setLocale(ptBR)

export * from 'yup';