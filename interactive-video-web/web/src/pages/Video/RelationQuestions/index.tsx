import React, {useCallback, useEffect, useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Box, Button, Container, MenuItem, TextField,} from '@material-ui/core';
import {useForm} from "react-hook-form";
import {useSnackbar} from 'notistack'
import * as yup from '../../../yup';
import VideosModel from "../../../models/VideosModel";
import httpVideosApi from "../../../services/httpVideosApi";
import httpQuestionsApi from "../../../services/httpQuestionsApi";
import QuestionsModel from "../../../models/QuestionsModel";
import Grid from "@material-ui/core/Grid";
import Table from "../../../components/Table";
import {MUIDataTableColumn} from "mui-datatables";

const validationSchema = yup.object().shape({
    aparecer_em: yup.string()
        .label("Aparecer em")
        .required(),
})

interface FormVideoProps {
    id: number,
    setId: Function
}

const RelationQuestion: React.FC<FormVideoProps> = (props) => {
    const columnsDefinition: MUIDataTableColumn[] = [
        {
            name: 'descricao_pergunta',
            label: 'Pergunta',
        },
        {
            name: 'aparecer_em',
            label: 'Aparecer em'
        }
    ]

    const classes = useStyles();
    const snackbar = useSnackbar();
    const {
        register,
        handleSubmit,
        errors,
    } = useForm({
        validationSchema,
    });

    const [video, setVideo] = useState<VideosModel>();
    const [videoRelatedQuestions, setVideoRelatedQuestions] = useState<VideosModel>();
    const [questions, setQuestions] = useState<QuestionsModel[]>([]);

    const [defaultQuestion, setDefaultQuestion] = useState<number>();

    const fetchVideoRelated = async () => {
        const videoResult = await httpVideosApi().getRelatedQuestions(props.id)

        setVideoRelatedQuestions(videoResult.data.data)
    }

    const fetchData = async () => {
        const questionsResult = await httpQuestionsApi().all()

        setQuestions(questionsResult)

        await fetchVideoRelated();
    }

    const fetchDataMemoizedCallback = useCallback( () => {
        fetchData();
    },[fetchData]);

    useEffect(() => {
        fetchDataMemoizedCallback();
    }, []);

    useEffect(() => {
        if (props.id) {
            const findVideo = async (id: number) : Promise<VideosModel> => {
                return await httpVideosApi().findBy(id)
            }

            findVideo(props.id)
                .then(video => {
                    setVideo(video)
                });
        }
    }, [props.id])


    async function onSubmit(formData: Record<string, any>, event: any) {
        if (!defaultQuestion) {
            snackbar.enqueueSnackbar('Selecione uma pergunta', {
                variant: 'error'
            });
            return;
        }

        await httpVideosApi()
            .relateQuestion(props.id, {id_perguntas: defaultQuestion, aparecer_em: formData.aparecer_em})
            .then((response) => {
                snackbar.enqueueSnackbar('Video relacionado com sucesso', {
                    variant: 'success'
                });

                fetchVideoRelated();

                return response.data.data;
            })
            .catch((error) => {
                if (error.response) {
                    snackbar.enqueueSnackbar(error.response.data.message, {
                        variant: 'error'
                    });
                }
            })
    }

    return (
        <Container>
            <form className={classes.marginTop} onSubmit={handleSubmit(onSubmit)}>
                <Grid container>
                    <Grid xs={12} sm={4} item={true}>
                        <TextField
                            className={classes.inputInline}
                            fullWidth
                            name="video"
                            id="mall"
                            value={video?.titulo_video}
                            variant="outlined"
                            disabled={true}
                            label="Video"
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                    </Grid>
                    <Grid xs={12} sm={4} item={true}>
                        <TextField
                            className={classes.inputInline}
                            select
                            fullWidth
                            name="perguntas"
                            id="perguntas"
                            value={defaultQuestion}
                            onChange={(e: any) => setDefaultQuestion(e.target.value)}
                            variant="outlined"
                            label="Perguntas"
                            error={errors.perguntas !== undefined}
                            helperText={errors.perguntas && errors.perguntas.message}
                            InputLabelProps={{
                                shrink: true
                            }}
                        >
                            <MenuItem
                                value=''
                                disabled={true}
                            >
                                <em>
                                    Selecione uma pergunta
                                </em>
                            </MenuItem>
                            {questions && questions.map((question: QuestionsModel) => {
                                return <MenuItem
                                            key={question.id_perguntas}
                                            value={question.id_perguntas}
                                        >
                                    {question.descricao_pergunta}
                                </MenuItem>
                            })}

                        </TextField>
                    </Grid>
                    <Grid xs={12} sm={4} item={true}>
                        <TextField
                            id="time"
                            name={'aparecer_em'}
                            className={classes.inputInline}
                            fullWidth
                            inputRef={register}
                            label="Aparecer em"
                            type="time"
                            variant="outlined"
                            defaultValue="00:03"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            error={errors.aparecer_em !== undefined}
                            helperText={errors.aparecer_em && errors.aparecer_em.message}
                        />
                    </Grid>
                </Grid>

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
                data={videoRelatedQuestions?.perguntas as QuestionsModel[]}
                title=""
            />
        </Container>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        inputInline: {
            paddingRight: theme.spacing(2),
        },
        marginTop: {
            marginTop: theme.spacing(2),
        },
        buttonPadding: {
            paddingBottom: theme.spacing(2),
            paddingTop: theme.spacing(2)
        }
    }),
);


export default RelationQuestion;