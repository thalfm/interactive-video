import React, {useEffect, useState} from 'react';
import {Box, Button, Checkbox, Container, FormControlLabel, Switch, TextField} from '@material-ui/core';
import {useForm} from "react-hook-form";
import {useSnackbar} from 'notistack'
import * as yup from '../../../../yup';
import QuestionsModel from "../../../../models/QuestionsModel";
import httpQuestionsApi from "../../../../services/httpQuestionsApi";

const validationSchema = yup.object().shape({
    descricao_pergunta: yup.string()
        .label("Nome")
        .required()
})

interface FormQuestionProps {
    id: number,
    setId: Function
}

const FormQuestion: React.FC<FormQuestionProps> = (props) => {
    const snackbar = useSnackbar();
    const [idQuestion, setIdQuestion] = useState(0);
    const [active, setActive] = useState(true);

    useEffect(() => {
        if (props.id) {
            const findQuestion = async (id: number) : Promise<QuestionsModel> => {
                return await httpQuestionsApi().findBy(id)
            }

            findQuestion(props.id)
                .then(course => {
                    setIdQuestion(props.id)
                    reset(course)
                    setActive(course.ativo)
                });
        }
    }, [])

    const { 
            register, 
            handleSubmit, 
            errors,
            reset
        } = useForm({
        validationSchema
    });

    async function onSubmit(data: Record<string, any>, event: any) {
        data.id = idQuestion
        data.ativo = active ? 1 : 0

        const question = await httpQuestionsApi()
            .save(data)
            .then((response) => {
                snackbar.enqueueSnackbar('Pergunta salvo com sucesso', {
                    variant: 'success'
                });
                return response.data.data;
            })
            .catch((error) => {
                if (error.response) {
                    snackbar.enqueueSnackbar(error.response.data.message, {
                        variant: 'error'
                    });
                }
            })

        if (question != undefined && question.id_perguntas > 0) {
            props.setId(question.id_perguntas);
        }
    }

    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    name="descricao_pergunta"
                    label="Descrição"
                    variant="outlined"
                    multiline
                    fullWidth
                    rows={4}
                    inputRef={register}
                    error={errors.descricao_pergunta !== undefined}
                    helperText={errors.descricao_pergunta && errors.descricao_pergunta.message}
                    margin={"normal"}
                    InputLabelProps={{
                        shrink: true,
                      }}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            name="ativo"
                            color="primary"   
                            onChange={() => setActive(!active)}
                            checked={active}
                        />
                    }
                    label="Ativo"
                />
                <Box dir={"rtl"}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                    >Salvar</Button>
                </Box>
            </form>
        </Container >
    );
}

export default FormQuestion;