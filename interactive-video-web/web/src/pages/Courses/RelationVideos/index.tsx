import React, { useCallback, useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Button, Container, MenuItem, TextField } from '@material-ui/core';
import {useForm} from "react-hook-form";
import {useSnackbar} from 'notistack'
import * as yup from '../../../yup';
import VideosModel from "../../../models/VideosModel";
import httpCoursesApi from "../../../services/httpCoursesApi";
import httpVideosApi from "../../../services/httpVideosApi";
import Grid from "@material-ui/core/Grid";
import Table from "../../../components/Table";
import { MUIDataTableColumn } from "mui-datatables";
import CoursesModel from "../../../models/CoursesModel";

interface FormCoursesProps {
    id: number,
    setId: Function
}

const RelationVideos: React.FC<FormCoursesProps> = (props) => {
    const columnsDefinition: MUIDataTableColumn[] = [
        {
            name: 'id_videos',
            label: 'ID Video',
        },
        {
            name: 'titulo_video',
            label: 'Título'
        }
    ]

    const classes = useStyles();
    const snackbar = useSnackbar();
    const {
        handleSubmit,
        errors,
    } = useForm();

    const [videos, setVideos] = useState<VideosModel[]>();
    const [coursesRelatedVideos, setCoursesRelatedVideoss] = useState<CoursesModel>();
    const [course, setCourse] = useState<CoursesModel>();

    const [defaultVideos, setDefaultVideos] = useState<number>();

    const fetchVideos = async () => {
        const videoResult = await httpVideosApi().all();

        setVideos(videoResult);

        await fetchVideosRelated();
    }

    const fetchVideosRelated = async () => {
        const videoResult = await httpCoursesApi().getRelatedQVideos(props.id)

        setCoursesRelatedVideoss(videoResult.data.data);
    }

    const fetchDataMemoizedCallback = useCallback( () => {
        fetchVideos();
    },[fetchVideos]);

    useEffect(() => {
        fetchDataMemoizedCallback();
    }, []);

    useEffect(() => {
        if (props.id) {
            const findCourse = async (id: number) : Promise<CoursesModel> => {
                return await httpCoursesApi().findBy(id)
            }

            findCourse(props.id)
                .then(course => {
                    setCourse(course)
                });
        }
    }, [props.id])


    async function onSubmit(formData: Record<string, any>, event: any) {
        if (!defaultVideos) {
            snackbar.enqueueSnackbar('Selecione uma pergunta', {
                variant: 'error'
            });
            return;
        }

        await httpCoursesApi()
            .relateVideos(props.id, {id_videos: defaultVideos})
            .then((response) => {
                snackbar.enqueueSnackbar('Video relacionado com sucesso', {
                    variant: 'success'
                });

                fetchVideosRelated();

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
                    <Grid xs={12} sm={6} item={true}>
                        <TextField
                            className={classes.inputInline}
                            fullWidth
                            name="curso"
                            id="curso"
                            value={course?.nome_curso}
                            variant="outlined"
                            disabled={true}
                            label="Curso"
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                    </Grid>
                    <Grid xs={12} sm={6} item={true}>
                        <TextField
                            className={classes.inputInline}
                            select
                            fullWidth
                            value={defaultVideos}
                            onChange={(e: any) => setDefaultVideos(e.target.value)}
                            variant="outlined"
                            label="Videos"
                            error={errors.videos !== undefined}
                            helperText={errors.videos && errors.videos.message}
                            InputLabelProps={{
                                shrink: true
                            }}
                        >
                            <MenuItem
                                value=''
                                disabled={true}
                            >
                                <em>
                                    Selecione um video
                                </em>
                            </MenuItem>
                            {videos && videos.map((video) => {
                                return <MenuItem
                                            key={video.id_videos}
                                            value={video.id_videos}
                                        >
                                    {video.titulo_video}
                                </MenuItem>
                            })}

                        </TextField>
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
                columns={ columnsDefinition }
                data={ coursesRelatedVideos?.videos as VideosModel[] }
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


export default RelationVideos;