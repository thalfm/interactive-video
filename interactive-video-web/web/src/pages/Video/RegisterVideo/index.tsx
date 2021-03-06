import React, {useEffect, useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Box, Button, Checkbox, Container, FormControlLabel, TextField,} from '@material-ui/core';
import {useForm} from "react-hook-form";
import {useSnackbar} from 'notistack'
import * as yup from '../../../yup';
import UploadFile from "../../../components/UploadFile";
import FileList from "../../../components/FileList";
import VideosModel from "../../../models/VideosModel";
import httpVideosApi from "../../../services/httpVideosApi";
import httpCoursesApi from "../../../services/httpCoursesApi";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        inputInline: {
            paddingRight: theme.spacing(2),
        },
        marginTop: {
            marginTop: theme.spacing(2),
        }
    }),
);

const validationSchema = yup.object().shape({
    titulo_video: yup.string()
        .label("Título")
        .required()
})

interface File {
    id: number,
    preview: string,
    name: string,
    url: string
}

interface FormVideoProps {
    id: number,
    setId: Function
}

const RegisterVideo: React.FC<FormVideoProps> = (props) => {

    const classes = useStyles();
    const snackbar = useSnackbar();
    const {
        register,
        handleSubmit,
        errors,
        reset
    } = useForm({
        validationSchema,
    });

    const [files, setFiles] = useState<File[]>();
    const [idVideo, setIdVideo] = useState(0);
    const [active, setActive] = useState(true);

    useEffect(() => {
        if (props.id) {
            const findVideo = async (id: number) : Promise<VideosModel> => {
                return await httpVideosApi().findBy(id)
            }

            findVideo(props.id)
                .then(video => {
                    setIdVideo(props.id)
                    reset(video)
                    setActive(video.ativo)
                    setFiles([{
                        id: 1,
                        preview: video.nome_video,
                        name: 'image',
                        url: ''
                    }])
                });
        }
    }, [])


    async function onSubmit(formData: Record<string, any>, event: any) {
        formData.id = idVideo
        formData.image = files;
        formData.ativo = active ? 1 : 0

        const video = await httpVideosApi()
            .save(formData)
            .then((response) => {
                snackbar.enqueueSnackbar('Video salvo com sucesso', {
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

        if (video != undefined && video.id_videos > 0) {
            props.setId(video.id_videos);
        }
    }

    const onUploadFiles = (files: any) => {
        const uploadedFiles = files.map((file: File) => ({
            file,
            name: file.name,
            preview: URL.createObjectURL(file),
            url: null
        }));
        setFiles(uploadedFiles);
    }

    const onDeleteFile = async (name: string) => {
        if (files === undefined) {
            return;
        }
        const newFiles = files.filter(file => file.name !== name)
        setFiles(newFiles);
    };

    return (
        <Container>

            <form className={classes.marginTop} onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    name="titulo_video"
                    label="Título"
                    variant="outlined"
                    fullWidth
                    margin={"normal"}
                    inputRef={register}
                    error={errors.titulo_video !== undefined}
                    helperText={errors.titulo_video && errors.titulo_video.message}
                    InputLabelProps={{
                        shrink: true
                    }}
                />

                <UploadFile onUpload={onUploadFiles}/>
                {files !== undefined && !!files.length && (
                    <FileList files={files} onDelete={onDeleteFile}/>
                )}

                <FormControlLabel
                    control={
                        <Checkbox
                            name="is_active"
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
        </Container>
    );
}

export default RegisterVideo;