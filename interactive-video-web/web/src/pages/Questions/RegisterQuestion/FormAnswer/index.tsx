import React, {useState, useEffect} from 'react';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import {
    Button,
    TextField,
    Checkbox,
    FormControlLabel,
    Container,
    Box,
    IconButton, Switch
} from '@material-ui/core';
import Table from '../../../../components/Table';
import {useForm} from "react-hook-form";
import {useSnackbar} from 'notistack'
import * as yup from '../../../../yup';
import {MUIDataTableColumn} from 'mui-datatables';
import {BadgeNo, BadgeYes} from "../../../../components/Badge";
import {Edit, Delete} from '@material-ui/icons';
import httpAnswersApi from "../../../../services/httpAnswersApi";
import AnswersModel from "../../../../models/AnswersModel";

const validationSchema = yup.object().shape({
    descricao_resposta: yup.string()
        .label("Descrição")
        .required(),
})

interface FormAnswerProps {
    id: number,
    setId: Function
}

const FormAnswer: React.FC<FormAnswerProps> = (props) => {
    const columnsDefinition: MUIDataTableColumn[] = [
        {
            name: 'descricao_resposta',
            label: 'Descrição'
        },
        {
            name: 'correta',
            label: 'Correta',
            options: {
                customBodyRender(value: boolean, tableMeta, updateValue) {
                    return value ? <BadgeYes/> : <BadgeNo/>
                }
            }
        },
        {
            name: 'ativo',
            label: 'Ativo?',
            options: {
                customBodyRender(value: boolean, tableMeta, updateValue) {
                    return value ? <BadgeYes/> : <BadgeNo/>
                }
            }
        },
        {
            name: 'id_respostas',
            label: 'Opções',
            options: {
                customBodyRender(value, tableMeta, updateValue) {

                    return (
                        <>
                            <IconButton onClick={() => handleEdit(tableMeta.rowData)}>
                                <Edit/>
                            </IconButton>
                            <IconButton onClick={() => handleDelete(value)}>
                                <Delete/>
                            </IconButton>
                        </>
                    )

                }
            }
        }
    ]
    const classes = useStyles();
    const snackbar = useSnackbar();
    const [respostas, setRespostas] = useState<AnswersModel[]>([]);
    const [id, setId] = useState(0);
    const [active, setActive] = useState(true);
    const [correct, setCorrect] = useState(false);

    const {register, handleSubmit, errors, reset} = useForm({
        validationSchema
    });

    async function onSubmit(data: Record<string, any>, event: any) {
        data.id = id
        data.ativo = active

        await httpAnswersApi().save(props.id, data)
            .then((response) => {
                snackbar.enqueueSnackbar('Resposta cadastrada com sucesso', {
                    variant: 'success'
                });

                reset({});

                const dataFiltered = respostas.filter((answer: AnswersModel) => answer.id_respostas !== response.data.data.id_respostas);

                setRespostas([
                    ...dataFiltered, ...[response.data.data]
                ])
            })

    }

    const fetchData = async () => {
        const answers = await httpAnswersApi().all(props.id);
        setRespostas(answers)
    }

    useEffect(() => {
        fetchData();
    }, [])

    const handleEdit = async (value: any) => {
        const answer = await httpAnswersApi().findBy(props.id, value[3])
        setId(value[3])
        setActive(answer.ativo)
        setCorrect(answer.correta)
        reset(answer)
    }

    const handleDelete = async (value: number) => {
        await httpAnswersApi().destroy(props.id, value)
        fetchData()
    }


    return (

        <Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    name="descricao_resposta"
                    label="Descrição"
                    variant="outlined"
                    multiline
                    fullWidth
                    rows={4}
                    inputRef={register}
                    error={errors.descricao_resposta !== undefined}
                    helperText={errors.descricao_resposta && errors.descricao_resposta.message}
                    margin={"normal"}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={correct}
                            onChange={() => setCorrect(!correct)}
                            inputRef={register}
                            name="correta"
                            color="primary"
                        />
                    }
                    label="Correta"
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
                <Box dir={"rtl"} className={classes.buttonPadding}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                    >Salvar</Button>
                </Box>
            </form>

            <Table
                columns={columnsDefinition}
                data={respostas}
                title=""
            />
        </Container>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        inputInline: {
            paddingRight: theme.spacing(2),
        },
        buttonPadding: {
            paddingBottom: theme.spacing(2),
        }
    }),
);

export default FormAnswer;